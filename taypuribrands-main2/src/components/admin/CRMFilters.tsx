import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";
import { Search } from "lucide-react";

type CRMStatus = Database["public"]["Enums"]["crm_status"];

interface CRMFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  responsavelFilter: string;
  setResponsavelFilter: (value: string) => void;
  responsaveis: string[];
}

const statusOptions: { value: string; label: string }[] = [
  { value: "all", label: "Todos os Status" },
  { value: "novo", label: "Novo" },
  { value: "contato_inicial", label: "Contato Inicial" },
  { value: "call_agendada", label: "Call Agendada" },
  { value: "call_realizada", label: "Call Realizada" },
  { value: "segunda_call", label: "Segunda Call" },
  { value: "negado", label: "Negado" },
  { value: "fechado", label: "Fechado" },
];

export const CRMFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  responsavelFilter,
  setResponsavelFilter,
  responsaveis,
}: CRMFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-analog-cream/50 w-4 h-4" />
        <Input
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-analog-cream/50"
        />
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="bg-white/5 border-white/10 text-white">
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={responsavelFilter} onValueChange={setResponsavelFilter}>
        <SelectTrigger className="bg-white/5 border-white/10 text-white">
          <SelectValue placeholder="Filtrar por responsável" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Responsáveis</SelectItem>
          {responsaveis.map((responsavel) => (
            <SelectItem key={responsavel} value={responsavel}>
              {responsavel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
