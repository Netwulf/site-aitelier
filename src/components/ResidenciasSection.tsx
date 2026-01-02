export const ResidenciasSection = () => {
  return (
    <div className="py-8">
      <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-8">
        RESIDÊNCIAS
      </h2>

      <div className="max-w-2xl space-y-6">
        <p className="text-xl text-ancestral-white">
          Períodos intensivos no atelier.
          <br />
          Para quem quer ir fundo.
        </p>

        <p className="text-text-secondary">
          Presencial ou remoto.
          <br />
          Seleção por projeto.
        </p>

        <p
          className="text-text-muted text-sm border-l-2
                      border-text-muted/40 pl-4"
        >
          Uma residência não é curso.
          <br />É tempo dedicado a uma obra
          <br />
          com o atelier como contexto.
        </p>

        <p className="text-sm text-ancestral-amber font-mono-v2 mt-8">
          [Em breve: calendário 2025]
        </p>
      </div>
    </div>
  );
};

export default ResidenciasSection;
