import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { ApplicationCRMModal } from "./ApplicationCRMModal";
import { Edit, Eye, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Database } from "@/integrations/supabase/types";

type CRMStatus = Database["public"]["Enums"]["crm_status"];

interface Application {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  instagram: string | null;
  negocio: string | null;
  cargo: string | null;
  faturamento: string | null;
  desafio_principal: string | null;
  motivacao: string | null;
  momento_negocio: string | null;
  investimento_disponivel: string | null;
  status: string | null;
  created_at: string;
  submitted_at: string | null;
  crm_status: CRMStatus | null;
  contacted_by: string | null;
  call_scheduled_at: string | null;
  crm_notes: string | null;
  updated_by: string | null;
}

interface ApplicationTableProps {
  applications: Application[];
  onUpdate: () => void;
}

export const ApplicationTable = ({ applications, onUpdate }: ApplicationTableProps) => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [crmModalOpen, setCrmModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleEditCRM = (app: Application) => {
    setSelectedApp(app);
    setCrmModalOpen(true);
  };

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setDetailsModalOpen(true);
  };

  return (
    <>
      <div className="border border-white/10 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-algorithm-green font-bold">Nome</TableHead>
              <TableHead className="text-algorithm-green font-bold">Email</TableHead>
              <TableHead className="text-algorithm-green font-bold">WhatsApp</TableHead>
              <TableHead className="text-algorithm-green font-bold">Status CRM</TableHead>
              <TableHead className="text-algorithm-green font-bold">Responsável</TableHead>
              <TableHead className="text-algorithm-green font-bold">Call Agendada</TableHead>
              <TableHead className="text-algorithm-green font-bold text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow
                key={app.id}
                className="border-white/10 hover:bg-white/5 transition-colors"
              >
                <TableCell className="font-medium text-white">{app.nome}</TableCell>
                <TableCell className="text-analog-cream">{app.email}</TableCell>
                <TableCell className="text-analog-cream">{app.whatsapp}</TableCell>
                <TableCell>
                  <StatusBadge status={app.crm_status} />
                </TableCell>
                <TableCell className="text-analog-cream">
                  {app.contacted_by ? (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {app.contacted_by}
                    </div>
                  ) : (
                    <span className="text-analog-cream/50">-</span>
                  )}
                </TableCell>
                <TableCell className="text-analog-cream">
                  {app.call_scheduled_at ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(app.call_scheduled_at), "dd/MM/yyyy HH:mm", {
                        locale: ptBR,
                      })}
                    </div>
                  ) : (
                    <span className="text-analog-cream/50">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCRM(app)}
                      className="border-algorithm-green/30 text-algorithm-green hover:bg-algorithm-green/10"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar CRM
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(app)}
                      className="border-white/10 text-white hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detalhes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ApplicationCRMModal
        application={selectedApp}
        open={crmModalOpen}
        onOpenChange={setCrmModalOpen}
        onUpdate={onUpdate}
      />

      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="bg-black border-white/10 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-algorithm-green">
              Detalhes da Aplicação
            </DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-sm font-bold text-algorithm-green mb-1">NOME</p>
                <p className="text-white">{selectedApp.nome}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-algorithm-green mb-1">EMAIL</p>
                <p className="text-white">{selectedApp.email}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-algorithm-green mb-1">WHATSAPP</p>
                <p className="text-white">{selectedApp.whatsapp}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-algorithm-green mb-1">INSTAGRAM</p>
                <p className="text-white">{selectedApp.instagram || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-algorithm-green mb-1">NEGÓCIO</p>
                <p className="text-white">{selectedApp.negocio || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-algorithm-green mb-1">CARGO</p>
                <p className="text-white">{selectedApp.cargo || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-algorithm-green mb-1">FATURAMENTO</p>
                <p className="text-white">{selectedApp.faturamento || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-algorithm-green mb-1">INVESTIMENTO</p>
                <p className="text-white">{selectedApp.investimento_disponivel || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-bold text-algorithm-green mb-1">DESAFIO PRINCIPAL</p>
                <p className="text-white">{selectedApp.desafio_principal || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-bold text-algorithm-green mb-1">MOTIVAÇÃO</p>
                <p className="text-white">{selectedApp.motivacao || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-bold text-algorithm-green mb-1">MOMENTO DO NEGÓCIO</p>
                <p className="text-white">{selectedApp.momento_negocio || '-'}</p>
              </div>
              {selectedApp.crm_notes && (
                <div className="md:col-span-2">
                  <p className="text-sm font-bold text-algorithm-green mb-1">NOTAS DO CRM</p>
                  <p className="text-white whitespace-pre-wrap">{selectedApp.crm_notes}</p>
                </div>
              )}
              <div className="md:col-span-2">
                <p className="text-sm font-bold text-algorithm-green mb-1">DATA DE SUBMISSÃO</p>
                <p className="text-analog-cream text-sm">
                  {new Date(selectedApp.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
