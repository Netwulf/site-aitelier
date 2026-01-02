import { Link } from "react-router-dom";

export const StudioEntry = () => {
  const qualifications = [
    "Entende que marca não é logo",
    "Quer revelar, não inventar",
    "Valoriza processo tanto quanto resultado",
    "Está pronto para ser dirigido",
  ];

  return (
    <div className="py-16">
      <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-8">
        ENTRAR NO STUDIO
      </h2>

      <div className="max-w-2xl">
        <p className="text-xl text-ancestral-white mb-8">
          Não trabalhamos com qualquer projeto.
        </p>

        <p className="text-lg text-text-secondary mb-6">Trabalhamos com quem:</p>

        <ul className="space-y-3 mb-12">
          {qualifications.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-ancestral-white"
            >
              <span className="text-ancestral-amber">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-xl text-ancestral-white mb-8">
          Se isso ressoa, vamos conversar.
        </p>

        <Link
          to="/contato?from=studio"
          className="inline-block px-8 py-4
                     border border-ancestral-white text-ancestral-white
                     hover:bg-ancestral-white hover:text-ancestral-black
                     transition-all duration-300
                     font-mono-v2 text-sm tracking-wide"
        >
          [Iniciar conversa]
        </Link>

        <p className="mt-8 text-sm text-text-muted">
          Nota: respondemos em até 48h.
          <br />
          Nem toda conversa vira projeto.
          <br />
          E está tudo bem.
        </p>
      </div>
    </div>
  );
};

export default StudioEntry;
