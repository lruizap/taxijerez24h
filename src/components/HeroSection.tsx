import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <img src="/images/logo-jerez.png" alt="Taxi Jerez 24H" className="w-28 h-auto mx-auto mb-8 drop-shadow-2xl rounded-2xl" />
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 leading-tight">
            {t("hero_title")}
          </h1>
          <p className="text-primary-foreground/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-heading font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              {t("hero_cta")}
            </a>
            <a href="#prices" onClick={(e) => { e.preventDefault(); document.querySelector("#prices")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-heading font-bold text-lg hover:bg-primary-foreground/10 transition-all">
              {t("hero_cta2")}
            </a>
          </div>
        </div>

        {/* Floating badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 text-primary-foreground/70 text-sm">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary" /> 24/7</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary" /> WiFi</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary" /> GPS</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
