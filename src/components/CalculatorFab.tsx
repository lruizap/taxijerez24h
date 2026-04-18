import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const CalculatorFab = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToCalc = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      onClick={goToCalc}
      aria-label={t("calc_title")}
      className={`fixed bottom-6 left-6 z-40 group flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <Calculator className="w-5 h-5" />
      <span className="font-heading font-semibold text-sm hidden sm:inline">{t("calc_title")}</span>
    </button>
  );
};

export default CalculatorFab;
