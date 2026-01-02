import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApplicationTable } from '@/components/admin/ApplicationTable';
import { CRMMetrics } from '@/components/admin/CRMMetrics';
import { CRMFilters } from '@/components/admin/CRMFilters';
import { Database } from '@/integrations/supabase/types';

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

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [responsavelFilter, setResponsavelFilter] = useState('all');
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar aplicações',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const responsaveis = useMemo(() => {
    const uniqueResponsaveis = new Set(
      applications
        .map(app => app.contacted_by)
        .filter((name): name is string => name !== null)
    );
    return Array.from(uniqueResponsaveis);
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = 
        app.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || app.crm_status === statusFilter;
      
      const matchesResponsavel = 
        responsavelFilter === 'all' || app.contacted_by === responsavelFilter;

      return matchesSearch && matchesStatus && matchesResponsavel;
    });
  }, [applications, searchTerm, statusFilter, responsavelFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-algorithm-green font-bold text-xl">Carregando aplicações...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-algorithm-green">CRM - APLICAÇÕES</h1>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <CRMMetrics applications={applications} />

        <CRMFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          responsavelFilter={responsavelFilter}
          setResponsavelFilter={setResponsavelFilter}
          responsaveis={responsaveis}
        />

        {filteredApplications.length === 0 ? (
          <div className="text-center text-analog-cream py-12 bg-white/5 border border-white/10 rounded-lg">
            Nenhuma aplicação encontrada
          </div>
        ) : (
          <ApplicationTable
            applications={filteredApplications}
            onUpdate={fetchApplications}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
