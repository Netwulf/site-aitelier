import { Link } from "react-router-dom";

export const EstudosEntry = () => {
  return (
    <div className="py-16">
      <p className="text-xl text-ancestral-white mb-8">
        Interessado em entrar na Escola?
      </p>

      <p className="text-text-secondary mb-8">
        Mantenha-se informado sobre próximas turmas e laboratórios.
      </p>

      <Link
        to="/contato?from=escola"
        className="inline-block px-8 py-4
                   border border-ancestral-white text-ancestral-white
                   hover:bg-ancestral-white hover:text-ancestral-black
                   transition-all duration-300
                   font-mono-v2 text-sm tracking-wide"
      >
        [Entrar na lista de espera]
      </Link>
    </div>
  );
};

export default EstudosEntry;
