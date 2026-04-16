import { useLanguage } from "@/i18n/LanguageContext";
import whatsappSvg from "@/assets/whatsapp.svg";

const WhatsAppButton = () => {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/34600000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp_tooltip")}
      title={t("whatsapp_tooltip")}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 animate-float"
    >
      <img src={whatsappSvg} alt="WhatsApp" className="w-7 h-7 invert" />
    </a>
  );
};

export default WhatsAppButton;
