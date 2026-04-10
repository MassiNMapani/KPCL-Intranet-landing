import { useEffect, useState } from "react";

type HeroSlide = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
};

type PageHeroProps = {
  title: string;
  description: string;
  aside?: string;
  slides?: readonly HeroSlide[];
  showPanel?: boolean;
  panelImageSrc?: string;
};

export const PageHero = ({
  title,
  description,
  aside,
  slides = [],
  showPanel = false,
  panelImageSrc,
}: PageHeroProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const hasCarousel = slides.length > 0;

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [slides]);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section className={`hero${hasCarousel ? " hero-with-carousel" : ""}`}>
      <div className="hero-content">
        <p className="eyebrow">Kanona Workspace</p>
        <h2>{title}</h2>
        <p className="hero-copy">{description}</p>
        {aside ? <p className="hero-note">{aside}</p> : null}
      </div>
      {hasCarousel ? (
        <div className="hero-carousel" aria-label="Homepage highlights">
          <div className="hero-carousel-track">
            {slides.map((slide, index) => (
              <article
                key={slide.src}
                className={`hero-slide${index === activeSlide ? " hero-slide-active" : ""}`}
                aria-hidden={index === activeSlide ? undefined : true}
              >
                <img src={slide.src} alt={slide.alt} />
                <div className="hero-slide-overlay">
                  <p className="hero-slide-eyebrow">{slide.eyebrow}</p>
                  <h3>{slide.title}</h3>
                </div>
              </article>
            ))}
          </div>
          <div className="hero-carousel-controls">
            <div className="hero-carousel-buttons">
              <button type="button" className="hero-carousel-button" onClick={showPreviousSlide}>
                Prev
              </button>
              <button type="button" className="hero-carousel-button" onClick={showNextSlide}>
                Next
              </button>
            </div>
            <div className="hero-carousel-dots" aria-label="Select hero image">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  className={`hero-carousel-dot${index === activeSlide ? " hero-carousel-dot-active" : ""}`}
                  aria-label={`Show slide ${index + 1}: ${slide.title}`}
                  aria-pressed={index === activeSlide}
                  onClick={() => {
                    setActiveSlide(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : aside || showPanel ? (
        <div
          className="hero-panel"
          style={
            panelImageSrc
              ? {
                  backgroundImage: `linear-gradient(180deg, rgba(58, 32, 24, 0.08), rgba(58, 32, 24, 0.86)), url("${panelImageSrc}")`,
                }
              : undefined
          }
        >
          {aside}
        </div>
      ) : null}
    </section>
  );
};
