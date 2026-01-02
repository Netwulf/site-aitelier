import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Preciso saber de IA/tech?",
      answer: "Não. Se você sabe usar ChatGPT básico, já é suficiente. Eu mostro exatamente o que fazer."
    },
    {
      question: "Funciona pro meu nicho?",
      answer: "Sim. Arquétipos e Jornada do Herói são universais. A estrutura funciona pra qualquer área, a aplicação é personalizada."
    },
    {
      question: "Preciso ter audiência grande?",
      answer: "Não. Pode estar começando ou ter 50k seguidores. O que importa é clareza — aí você cresce com conversão, não só engajamento vazio."
    },
    {
      question: "E se eu não puder no ao vivo?",
      answer: "O workshop é ao vivo e a presença faz toda a diferença. Se não puder participar nos dois dias, espere a próxima turma."
    },
    {
      question: "Quanto tempo leva pra implementar depois?",
      answer: "Você sai do workshop com landing page pronta e story brand estruturada. Implementar no dia-a-dia: 2-4 semanas."
    }
  ];

  return (
    <section className="relative py-16 md:py-20 px-4 section-light">
      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-neutral-0">FAQ RÁPIDO</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="border-2 border-neutral-0 p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-neutral-300 last:border-0">
                <AccordionTrigger className="text-left text-neutral-0 hover:text-olive transition-colors py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-500 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
