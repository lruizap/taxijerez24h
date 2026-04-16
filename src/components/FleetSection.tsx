import { useLanguage } from "@/i18n/LanguageContext";
import { Car, Users, Bus, Accessibility } from "lucide-react";
import fleetImg from "@/assets/fleet.jpg";

const FleetSection = () => {
  const { t } = useLanguage();

  const vehicles = [
    { icon: Car, title: "fleet_normal", desc: "fleet_normal_desc" },
    { icon: Users, title: "fleet_7", desc: "fleet_7_desc" },
    { icon: Bus, title: "fleet_9", desc: "fleet_9_desc" },
    { icon: Accessibility, title: "fleet_adapted", desc: "fleet_adapted_desc" },
  ];

  return (
    <section id="fleet" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{t("fleet_title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("fleet_subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={fleetImg} alt="Taxi fleet Jerez" className="w-full h-auto object-cover" loading="lazy" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {vehicles.map((v) => (
              <div key={v.title} className="bg-card rounded-xl p-5 border shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-3">
                  <v.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{t(v.title)}</h3>
                <p className="text-muted-foreground text-xs">{t(v.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
