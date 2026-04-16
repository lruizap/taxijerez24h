import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo-jerez.png" alt="Taxi Jerez" className="h-10 w-auto" />
            <div>
              <p className="font-heading font-bold">Taxi Jerez</p>
              <p className="text-primary-foreground/70 text-xs">{t("footer_available")}</p>
            </div>
          </div>
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Taxi Jerez. {t("footer_rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
