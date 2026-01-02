import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";

type CRMStatus = Database["public"]["Enums"]["crm_status"];

const statusConfig: Record<CRMStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  novo: { label: "Novo", variant: "outline" },
  contato_inicial: { label: "Contato Inicial", variant: "secondary" },
  call_agendada: { label: "Call Agendada", variant: "default" },
  call_realizada: { label: "Call Realizada", variant: "default" },
  segunda_call: { label: "Segunda Call", variant: "default" },
  negado: { label: "Negado", variant: "destructive" },
  fechado: { label: "Fechado", variant: "default" },
};

interface StatusBadgeProps {
  status: CRMStatus | null;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (!status) return <Badge variant="outline">Pendente</Badge>;
  
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant}
      className={status === 'fechado' ? 'bg-algorithm-green text-black hover:bg-algorithm-green/90' : ''}
    >
      {config.label}
    </Badge>
  );
};
