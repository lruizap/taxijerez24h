import { useState } from "react";
import { useLanguage, langNames, Lang } from "@/i18n/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

const langs: Lang[] = ["es", "en", "de", "fr", "zh"];

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { key: "nav_home", href: "#home" },
    { key: "nav_services", href: "#services" },
    { key: "nav_fleet", href: "#fleet" },
    { key: "nav_prices", href: "#prices" },
    { key: "nav_contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="flex items-center gap-2" onClick={() => scrollTo("#home")}>
          <img src="/images/logo-jerez.png" alt="Taxi Jerez" className="h-10 w-auto" />
          <span className="font-heading font-bold text-lg text-primary hidden sm:block">Taxi Jerez</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button key={l.key} onClick={() => scrollTo(l.href)} className="font-medium text-sm text-foreground/80 hover:text-primary transition-colors">
              {t(l.key)}
            </button>
          ))}

          {/* Language */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors">
              <Globe className="w-4 h-4" />
              {langNames[lang]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card rounded-lg shadow-lg border py-1 min-w-[120px]">
                {langs.map((l) => (
                  <button key={l} onClick={() => { setLang(l); setLangOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${l === lang ? "text-primary font-semibold" : "text-foreground/80"}`}>
                    {langNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="p-2 text-foreground/80">
              <Globe className="w-5 h-5" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card rounded-lg shadow-lg border py-1 min-w-[120px] z-50">
                {langs.map((l) => (
                  <button key={l} onClick={() => { setLang(l); setLangOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${l === lang ? "text-primary font-semibold" : "text-foreground/80"}`}>
                    {langNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setOpen(!open)} className="p-2 text-foreground/80">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t">
          {links.map((l) => (
            <button key={l.key} onClick={() => scrollTo(l.href)} className="block w-full text-left px-6 py-3 text-sm font-medium text-foreground/80 hover:bg-muted transition-colors">
              {t(l.key)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
