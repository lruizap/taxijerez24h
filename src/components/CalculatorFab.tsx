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
      title={t("calc_title")}
      className={`fixed right-6 z-40 group transition-all duration-300 bottom-24 sm:bottom-6 sm:right-[5.5rem]
        w-14 h-14 sm:w-auto sm:h-auto sm:py-3 sm:pl-4 sm:pr-5
        flex items-center justify-center sm:gap-2
        rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110
        ${visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
    >
      <Calculator className="w-6 h-6 sm:w-5 sm:h-5" />
      <span className="font-heading font-semibold text-sm hidden sm:inline">{t("calc_title")}</span>
    </button>
  );
};

export default CalculatorFab;
