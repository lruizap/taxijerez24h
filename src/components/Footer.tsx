import { useLanguage } from "@/i18n/LanguageContext";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-primary-foreground overflow-hidden">
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10 text-center">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-3 mb-4">
              <img src="/images/logo-jerez.png" alt="Taxi Jerez 24H" className="h-14 w-auto rounded-lg bg-background/95 p-1" />
              <div>
                <p className="font-heading font-extrabold text-lg">Taxi Jerez 24H</p>
                <p className="text-primary-foreground/70 text-xs">Jerez de la Frontera</p>
              </div>
            </div>
            <p className="text-primary-foreground/75 text-sm leading-relaxed max-w-xs">
              {t("footer_available")}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> 24/7
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/90 text-xs font-semibold">
                WiFi
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/90 text-xs font-semibold">
                GPS
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-secondary mb-4">
              {t("nav_contact")}
            </h3>
            <ul className="space-y-3 text-sm inline-flex flex-col items-start">
              <li>
                <a href="tel:+34691312782" className="flex items-center gap-3 text-primary-foreground/85 hover:text-secondary transition-colors group">
                  <span className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  +34 691 31 27 82
                </a>
              </li>
              <li>
                <a href="mailto:frantrujillano@taxijerez24h.com" className="flex items-center gap-3 text-primary-foreground/85 hover:text-secondary transition-colors group break-all">
                  <span className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  frantrujillano@taxijerez24h.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/85">
                <span className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                Jerez de la Frontera, Cádiz
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/85">
                <span className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                24h · 365 días
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-secondary mb-4">
              {t("nav_services")}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { key: "nav_services", href: "#services" },
                { key: "nav_fleet", href: "#fleet" },
                { key: "nav_prices", href: "#prices" },
                { key: "nav_contact", href: "#contact" },
              ].map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary group-hover:w-3 transition-all" />
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-primary-foreground/15 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-primary-foreground/60 text-xs">
            © {new Date().getFullYear()} Taxi Jerez 24H. {t("footer_rights")}
          </p>
          <p className="text-primary-foreground/60 text-xs">
            Jerez de la Frontera · Cádiz · España
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
