import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";

type CRMStatus = Database["public"]["Enums"]["crm_status"];

interface Application {
  crm_status: CRMStatus | null;
  id: string;
}

interface CRMMetricsProps {
  applications: Application[];
}

export const CRMMetrics = ({ applications }: CRMMetricsProps) => {
  const total = applications.length;
  const novos = applications.filter(app => app.crm_status === 'novo').length;
  const emProcesso = applications.filter(app => 
    ['contato_inicial', 'call_agendada', 'call_realizada', 'segunda_call'].includes(app.crm_status || '')
  ).length;
  const fechados = applications.filter(app => app.crm_status === 'fechado').length;
  const negados = applications.filter(app => app.crm_status === 'negado').length;
  const taxaConversao = total > 0 ? ((fechados / total) * 100).toFixed(1) : '0';

  const metrics = [
    { title: "Total", value: total, className: "border-white/10" },
    { title: "Novos", value: novos, className: "border-algorithm-green/30" },
    { title: "Em Processo", value: emProcesso, className: "border-analog-cream/30" },
    { title: "Fechados", value: fechados, className: "border-algorithm-green" },
    { title: "Negados", value: negados, className: "border-red-500/30" },
    { title: "Taxa Conversão", value: `${taxaConversao}%`, className: "border-algorithm-green/50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {metrics.map((metric) => (
        <Card key={metric.title} className={`bg-white/5 ${metric.className}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-analog-cream">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black text-white">{metric.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
