import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Search, Building2, Plane, Calculator, AlertCircle } from "lucide-react";

type Route = { destination: string; price: string };

const cityRoutes: Route[] = [
  { destination: "Cádiz", price: "60 €" },
  { destination: "Sevilla", price: "150 €" },
  { destination: "Málaga", price: "300 €" },
  { destination: "El Puerto Sta. María", price: "30 €" },
  { destination: "Costa del Puerto Sta. María", price: "35 €" },
  { destination: "Rota", price: "50 €" },
  { destination: "Chipiona", price: "50 €" },
  { destination: "Sanlúcar", price: "50 €" },
  { destination: "Arcos", price: "50 €" },
  { destination: "Chiclana", price: "60 €" },
  { destination: "San Fernando", price: "60 €" },
  { destination: "Sancti Petri", price: "80 €" },
  { destination: "Conil", price: "90 €" },
  { destination: "Algeciras", price: "130 €" },
  { destination: "Zahara de los Atunes", price: "140 €" },
  { destination: "Sotogrande", price: "145 €" },
  { destination: "Tarifa", price: "170 €" },
];

const airportRoutes: Route[] = [
  { destination: "Cádiz", price: "75 €" },
  { destination: "Sevilla", price: "160 €" },
  { destination: "Málaga", price: "320 €" },
  { destination: "El Puerto Sta. María", price: "55 €" },
  { destination: "Costa del Puerto Sta. María", price: "60 €" },
  { destination: "Costa Ballena", price: "75 €" },
  { destination: "Rota", price: "75 €" },
  { destination: "Chipiona", price: "75 €" },
  { destination: "Sanlúcar", price: "70 €" },
  { destination: "Arcos", price: "70 €" },
  { destination: "San Fernando", price: "75 €" },
  { destination: "Sancti Petri", price: "110 €" },
  { destination: "Conil", price: "120 €" },
  { destination: "Algeciras", price: "150 €" },
  { destination: "Sotogrande", price: "165 €" },
  { destination: "Zahara de los Atunes", price: "180 €" },
  { destination: "Tarifa", price: "190 €" },
];

const PricesSection = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"city" | "airport">("city");
  const [query, setQuery] = useState("");
  const [km, setKm] = useState("");
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardRef = useScrollReveal<HTMLDivElement>();
  const calcRef = useScrollReveal<HTMLDivElement>();
  const noticeRef = useScrollReveal<HTMLDivElement>();

  const estimatedPrice = useMemo(() => {
    const n = parseFloat(km.replace(",", "."));
    if (!n || n <= 0) return null;
    return (n * 2 * 0.82).toFixed(2);
  }, [km]);

  const list = tab === "city" ? cityRoutes : airportRoutes;
  const filtered = useMemo(() => {
    const parsePrice = (p: string) => parseInt(p.replace(/[^\d]/g, ""), 10) || 0;
    return [...list]
      .filter((r) => r.destination.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  }, [list, query]);

  return (
    <section id="prices" className="section-padding bg-section-alt">
      <div className="container mx-auto">
        <div ref={headerRef} className="reveal text-center mb-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{t("prices_title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("prices_subtitle")}</p>
        </div>

        {/* Disclaimer (below title) */}
        <div ref={noticeRef} className="reveal max-w-3xl mx-auto mb-8">
          <div className="flex gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/30">
            <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-semibold text-sm text-foreground mb-1">{t("prices_disclaimer_title")}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("prices_disclaimer")}</p>
            </div>
          </div>
        </div>

        {/* Calculator (above prices list) */}
        <div ref={calcRef} id="calculator" className="reveal max-w-3xl mx-auto mb-10 scroll-mt-24">
          <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/85 px-6 py-4 flex items-center gap-3 text-primary-foreground">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg leading-tight">{t("calc_title")}</h3>
                <p className="text-xs text-primary-foreground/80">{t("calc_subtitle")}</p>
              </div>
            </div>
            <div className="p-6">
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                {t("calc_label_km")}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                    placeholder={t("calc_placeholder")}
                    className="w-full pl-4 pr-14 py-3 bg-background border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">km</span>
                </div>
                <div className="flex-1 sm:flex-initial sm:min-w-[200px] flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-secondary/10 border border-secondary/30">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("calc_result")}</span>
                  <span className="font-heading font-extrabold text-2xl text-secondary tabular-nums">
                    {estimatedPrice ? `${estimatedPrice} €` : "—"}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{t("calc_note")}</p>
            </div>
          </div>
        </div>

        <div ref={cardRef} className="reveal-scale max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-4 p-1.5 bg-card border rounded-xl shadow-sm">
            <button
              onClick={() => setTab("city")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-heading font-semibold text-sm transition-all ${
                tab === "city"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t("prices_cat_city")}</span>
              <span className="sm:hidden">Jerez</span>
            </button>
            <button
              onClick={() => setTab("airport")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-heading font-semibold text-sm transition-all ${
                tab === "airport"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Plane className="w-4 h-4" />
              <span className="hidden sm:inline">{t("prices_cat_airport")}</span>
              <span className="sm:hidden">Aeropuerto</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("prices_search")}
              className="w-full pl-10 pr-4 py-3 bg-card border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Table */}
          <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
            <div className="grid grid-cols-[1fr_auto] bg-primary text-primary-foreground">
              <div className="px-6 py-3.5 font-heading font-semibold text-sm">{t("prices_route")}</div>
              <div className="px-6 py-3.5 font-heading font-semibold text-sm text-right">{t("prices_price")}</div>
            </div>
            <div className="max-h-[460px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-6 py-10 text-center text-muted-foreground text-sm">{t("prices_no_results")}</div>
              ) : (
                filtered.map((r, i) => (
                  <div
                    key={`${tab}-${r.destination}`}
                    className={`grid grid-cols-[1fr_auto] ${i % 2 === 0 ? "bg-card" : "bg-muted/30"} hover:bg-primary/5 transition-colors`}
                  >
                    <div className="px-6 py-3.5 text-sm text-foreground">{r.destination}</div>
                    <div className="px-6 py-3.5 text-sm font-bold text-secondary text-right tabular-nums">{r.price}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-muted-foreground font-medium">{t("prices_not_listed")}</p>
      </div>
    </section>
  );
};

export default PricesSection;
