import { useLanguage } from "@/i18n/LanguageContext";

const prices = [
  ["Jerez - Cádiz", "60 €"],
  ["Aeropuerto Jerez - Cádiz", "75 €"],
  ["Jerez - Sevilla", "150 €"],
  ["Aeropuerto Jerez - Sevilla", "160 €"],
  ["Jerez - Málaga", "300 €"],
  ["Aeropuerto Jerez - Málaga", "320 €"],
  ["Jerez - El Puerto Sta. María", "30 €"],
  ["Aeropuerto Jerez - El Puerto Sta. María", "55 €"],
  ["Jerez - Rota", "50 €"],
  ["Aeropuerto Jerez - Rota", "75 €"],
  ["Jerez - Chipiona", "50 €"],
  ["Aeropuerto Jerez - Chipiona", "75 €"],
  ["Jerez - Chiclana", "60 €"],
  ["Jerez - Sancti Petri", "80 €"],
  ["Aeropuerto Jerez - Sancti Petri", "110 €"],
  ["Jerez - Conil", "90 €"],
  ["Aeropuerto Jerez - Conil", "120 €"],
  ["Jerez - San Fernando", "60 €"],
  ["Aeropuerto Jerez - San Fernando", "75 €"],
  ["Jerez - Tarifa", "170 €"],
  ["Aeropuerto Jerez - Tarifa", "190 €"],
  ["Jerez - Algeciras", "130 €"],
  ["Aeropuerto Jerez - Algeciras", "150 €"],
  ["Jerez - Sotogrande", "145 €"],
  ["Aeropuerto Jerez - Sotogrande", "165 €"],
  ["Jerez - Arcos", "50 €"],
  ["Aeropuerto Jerez - Arcos", "70 €"],
  ["Jerez - Sanlúcar", "50 €"],
  ["Aeropuerto Jerez - Sanlúcar", "70 €"],
  ["Jerez - Zahara de los Atunes", "140 €"],
  ["Aeropuerto Jerez - Zahara de los Atunes", "180 €"],
  ["Aeropuerto Jerez - Costa Ballena", "75 €"],
  ["Jerez - Costa del Puerto Sta. María", "35 €"],
  ["Aeropuerto Jerez - Costa del Puerto Sta. María", "60 €"],
];

const PricesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="prices" className="section-padding bg-section-alt">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{t("prices_title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("prices_subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-sm border overflow-hidden">
          <div className="grid grid-cols-[1fr_auto] bg-primary text-primary-foreground">
            <div className="px-6 py-3 font-heading font-semibold text-sm">{t("prices_route")}</div>
            <div className="px-6 py-3 font-heading font-semibold text-sm text-right">{t("prices_price")}</div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {prices.map(([route, price], i) => (
              <div key={i} className={`grid grid-cols-[1fr_auto] ${i % 2 === 0 ? "bg-card" : "bg-muted/30"} hover:bg-primary/5 transition-colors`}>
                <div className="px-6 py-3 text-sm text-foreground">{route}</div>
                <div className="px-6 py-3 text-sm font-semibold text-secondary text-right">{price}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-8 text-muted-foreground font-medium">
          {t("prices_not_listed")}
        </p>
      </div>
    </section>
  );
};

export default PricesSection;
