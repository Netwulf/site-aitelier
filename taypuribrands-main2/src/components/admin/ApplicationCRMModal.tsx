import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type CRMStatus = Database["public"]["Enums"]["crm_status"];

interface Application {
  id: string;
  nome: string;
  email: string;
  crm_status: CRMStatus | null;
  contacted_by: string | null;
  call_scheduled_at: string | null;
  crm_notes: string | null;
}

interface ApplicationCRMModalProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export const ApplicationCRMModal = ({
  application,
  open,
  onOpenChange,
  onUpdate,
}: ApplicationCRMModalProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<CRMStatus | "">(application?.crm_status || "novo");
  const [contactedBy, setContactedBy] = useState(application?.contacted_by || "");
  const [callDate, setCallDate] = useState<Date | undefined>(
    application?.call_scheduled_at ? new Date(application.call_scheduled_at) : undefined
  );
  const [notes, setNotes] = useState(application?.crm_notes || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!application) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("applications")
        .update({
          crm_status: status as CRMStatus,
          contacted_by: contactedBy || null,
          call_scheduled_at: callDate ? callDate.toISOString() : null,
          crm_notes: notes || null,
        })
        .eq("id", application.id);

      if (error) throw error;

      toast({
        title: "CRM atualizado",
        description: "As informações foram salvas com sucesso.",
      });

      onUpdate();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-algorithm-green">
            Editar CRM - {application.nome}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-analog-cream font-bold">
              Status do CRM
            </Label>
            <Select value={status} onValueChange={(value) => setStatus(value as CRMStatus)}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="contato_inicial">Contato Inicial</SelectItem>
                <SelectItem value="call_agendada">Call Agendada</SelectItem>
                <SelectItem value="call_realizada">Call Realizada</SelectItem>
                <SelectItem value="segunda_call">Segunda Call</SelectItem>
                <SelectItem value="negado">Negado</SelectItem>
                <SelectItem value="fechado">Fechado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contacted_by" className="text-analog-cream font-bold">
              Responsável pelo Contato
            </Label>
            <Input
              id="contacted_by"
              value={contactedBy}
              onChange={(e) => setContactedBy(e.target.value)}
              placeholder="Nome do responsável"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-analog-cream font-bold">
              Data/Hora da Call Agendada
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                    !callDate && "text-analog-cream/50"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {callDate ? format(callDate, "PPP HH:mm") : "Selecionar data e hora"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black border-white/10">
                <Calendar
                  mode="single"
                  selected={callDate}
                  onSelect={setCallDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-analog-cream font-bold">
              Notas do CRM
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione observações, histórico de conversas, próximos passos..."
              rows={5}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/10 text-white hover:bg-white/10"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-algorithm-green text-black hover:bg-algorithm-green/90 font-bold"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
