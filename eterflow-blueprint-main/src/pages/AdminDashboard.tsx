import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-algorithm-green font-bold text-xl">Carregando aplicações...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-algorithm-green">APLICAÇÕES</h1>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6">
          {applications.length === 0 ? (
            <div className="text-center text-analog-cream py-12">
              Nenhuma aplicação encontrada
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-algorithm-green mb-1">NOME</p>
                    <p className="text-white">{app.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-algorithm-green mb-1">EMAIL</p>
                    <p className="text-white">{app.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-algorithm-green mb-1">WHATSAPP</p>
                    <p className="text-white">{app.whatsapp}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-algorithm-green mb-1">INSTAGRAM</p>
                    <p className="text-white">{app.instagram || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-algorithm-green mb-1">NEGÓCIO</p>
                    <p className="text-white">{app.negocio || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-algorithm-green mb-1">CARGO</p>
                    <p className="text-white">{app.cargo || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-algorithm-green mb-1">FATURAMENTO</p>
                    <p className="text-white">{app.faturamento || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-algorithm-green mb-1">STATUS</p>
                    <p className="text-white">{app.status || 'pending'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-bold text-algorithm-green mb-1">DESAFIO PRINCIPAL</p>
                    <p className="text-white">{app.desafio_principal || '-'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-bold text-algorithm-green mb-1">DATA DE CRIAÇÃO</p>
                    <p className="text-analog-cream text-sm">
                      {new Date(app.created_at).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
