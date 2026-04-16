import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Landmark, Wine, Award } from "lucide-react";
import jerezImg from "@/assets/jerez-plaza.jpg";

const AboutSection = () => {
  const { t } = useLanguage();
  const imgRef = useScrollReveal<HTMLDivElement>();
  const textRef = useScrollReveal<HTMLDivElement>();

  const badges = [
    { icon: Landmark, label: "about_badge_1" },
    { icon: Wine, label: "about_badge_2" },
    { icon: Award, label: "about_badge_3" },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={imgRef} className="reveal-left relative">
            <div className="rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={jerezImg}
                alt="Plaza de la Asunción, Jerez de la Frontera"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-secondary/20 -z-10 hidden md:block" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-primary/15 -z-10 hidden md:block" />
          </div>

          <div ref={textRef} className="reveal-right">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
              {t("about_title")}
            </h2>
            <p className="text-secondary font-heading font-semibold text-lg mb-5">
              {t("about_subtitle")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("about_text")}
            </p>
            <div className="flex flex-wrap gap-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border shadow-sm text-sm font-medium text-foreground hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <b.icon className="w-4 h-4 text-primary" />
                  {t(b.label)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
