import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Plane, MapPin, Route, Accessibility, Users, Bus } from "lucide-react";

const ServicesSection = () => {
  const { t } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();

  const services = [
    { icon: Plane, title: "srv_airport", desc: "srv_airport_desc" },
    { icon: MapPin, title: "srv_city", desc: "srv_city_desc" },
    { icon: Route, title: "srv_intercity", desc: "srv_intercity_desc" },
    { icon: Accessibility, title: "srv_adapted", desc: "srv_adapted_desc" },
    { icon: Users, title: "srv_7seats", desc: "srv_7seats_desc" },
    { icon: Bus, title: "srv_9seats", desc: "srv_9seats_desc" },
  ];

  return (
    <section id="services" className="section-padding bg-section-alt">
      <div className="container mx-auto">
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{t("services_title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("services_subtitle")}</p>
        </div>
        <div ref={gridRef} className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-delay-${(i % 3) + 1} is-visible bg-card rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border group`}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{t(s.title)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(s.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
