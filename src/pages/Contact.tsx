import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, MapPin, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  useSmoothScroll();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Integrate with backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Mensagem enviada!");
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-brutal-black cursor-brutal relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="organic-glow" style={{ top: "40%", right: "20%" }} />
        <div className="mesh-gradient-2" />
      </div>

      <Navigation />

      <main className="pt-24">
        <section className="relative py-24 md:py-32 px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container mx-auto max-w-5xl"
          >
            {/* Header */}
            <motion.div variants={fadeInUpSimple} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="code-text text-sm text-matrix-green terminal-flicker">
                  CONTACT
                </span>
                <div className="h-px bg-concrete-border flex-1" />
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brutal-white uppercase tracking-tighter leading-none">
                Vamos
                <br />
                Conversar
              </h1>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div variants={fadeInUpSimple} className="space-y-12">
                <p className="poetic-text text-xl text-brutal-white/80 leading-relaxed">
                  Trabalhamos com projetos selecionados. Se você tem densidade interna e
                  quer transformar isso em presença pública, vamos conversar.
                </p>

                <div className="space-y-6">
                  <a
                    href="mailto:taypuri@aitelier.com.br"
                    className="flex items-center gap-4 text-brutal-white hover:text-matrix-green transition-colors group"
                  >
                    <div className="w-12 h-12 border-2 border-concrete-border group-hover:border-matrix-green flex items-center justify-center transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="code-text text-xs text-concrete mb-1">EMAIL</p>
                      <p className="text-lg">taypuri@aitelier.com.br</p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/aitelier.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-brutal-white hover:text-matrix-green transition-colors group"
                  >
                    <div className="w-12 h-12 border-2 border-concrete-border group-hover:border-matrix-green flex items-center justify-center transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="code-text text-xs text-concrete mb-1">INSTAGRAM</p>
                      <p className="text-lg">@aitelier.studio</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 text-brutal-white/60">
                    <div className="w-12 h-12 border-2 border-concrete-border flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="code-text text-xs text-concrete mb-1">BASES</p>
                      <p className="text-lg">Florianópolis · Curitiba · Brasília · São José dos Campos</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div variants={fadeInUpSimple}>
                {isSuccess ? (
                  <div className="glass p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-matrix-green mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-brutal-white uppercase tracking-tight mb-2">
                      Mensagem Enviada
                    </h3>
                    <p className="text-concrete mb-8">Retornaremos em até 24 horas.</p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn-ghost"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="code-text text-xs text-concrete mb-2 block">
                        NOME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-4 bg-concrete border-2 border-concrete-border text-brutal-white placeholder:text-concrete focus:border-matrix-green focus:outline-none transition-colors disabled:opacity-50"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="code-text text-xs text-concrete mb-2 block">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-4 bg-concrete border-2 border-concrete-border text-brutal-white placeholder:text-concrete focus:border-matrix-green focus:outline-none transition-colors disabled:opacity-50"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="code-text text-xs text-concrete mb-2 block">
                        MENSAGEM
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-4 bg-concrete border-2 border-concrete-border text-brutal-white placeholder:text-concrete focus:border-matrix-green focus:outline-none transition-colors resize-none disabled:opacity-50"
                        placeholder="Conte um pouco sobre você e o que busca..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensagem
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="code-text text-xs text-concrete text-center">
                      [RESPONSE_TIME: &lt;24H]
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Subtle grid */}
          <div className="brutal-grid absolute inset-0 opacity-5" />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
