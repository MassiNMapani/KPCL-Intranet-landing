type PageHeroProps = {
  title: string;
  description: string;
  aside?: string;
};

export const PageHero = ({ title, description, aside }: PageHeroProps) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">KPCL Workspace</p>
        <h2>{title}</h2>
        <p className="hero-copy">{description}</p>
      </div>
      {aside ? <div className="hero-panel">{aside}</div> : null}
    </section>
  );
};
