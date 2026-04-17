import { useLanguage } from "@/i18n/LanguageContext";
import { Phone, Clock, MapPin, Shield } from "lucide-react";
import bannerHero from "@/assets/banner-hero.png";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background banner */}
      <div className="absolute inset-0">
        <img
          src={bannerHero}
          alt="Taxi Jerez 24H - Catedral de Jerez"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-xs font-heading font-bold uppercase tracking-wider mb-6">
            <Clock className="w-3.5 h-3.5" /> Servicio 24 horas
          </span>

          <h1 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.05]">
            {t("hero_title")}
          </h1>

          <p className="text-foreground/75 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-heading font-bold text-base hover:brightness-110 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t("hero_cta")}
            </a>
            <a
              href="tel:+34691312782"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-base hover:brightness-110 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              +34 691 31 27 82
            </a>
          </div>

          {/* Feature badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
            {[
              { icon: Clock, label: "24h" },
              { icon: MapPin, label: "Todo Jerez" },
              { icon: Shield, label: "Profesional" },
              { icon: Phone, label: "Reserva fácil" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/60 shadow-sm"
              >
                <b.icon className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-xs font-heading font-semibold text-foreground truncate">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
