import { useEffect, useState } from "react";
import { useLanguage, langNames, Lang } from "@/i18n/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

const langs: Lang[] = ["es", "en", "de", "fr", "zh"];

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-500 ease-out ${
        scrolled ? "pt-2 sm:pt-3" : "pt-3 sm:pt-5"
      } ${mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <nav
        className={`mx-auto flex items-center justify-between rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl transition-all duration-500 ease-out ${
          scrolled
            ? "max-w-5xl h-14 px-4 shadow-xl shadow-primary/10"
            : "max-w-6xl h-16 px-5 shadow-lg shadow-primary/5"
        }`}
      >
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
        >
          <div className="relative">
            <img
              src="/images/logo-jerez.png"
              alt="Taxi Jerez 24H"
              className={`w-auto rounded-lg transition-all duration-500 group-hover:scale-110 ${scrolled ? "h-9" : "h-10"}`}
            />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading font-bold text-sm text-primary">Taxi Jerez 24H</span>
            <span className="text-[10px] text-muted-foreground -mt-0.5">Jerez de la Frontera · 24 horas</span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => scrollTo(l.href)}
              className="relative px-3 py-2 font-medium text-sm text-foreground/80 hover:text-primary transition-colors group"
            >
              {t(l.key)}
              <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}

          {/* Language */}
          <div className="relative ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-muted/60 hover:bg-muted text-sm font-medium text-foreground/80 hover:text-primary transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs uppercase">{lang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card rounded-xl shadow-xl border py-1.5 min-w-[140px] animate-in fade-in slide-in-from-top-2 duration-200">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      l === lang ? "text-primary font-semibold" : "text-foreground/80"
                    }`}
                  >
                    {langNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 rounded-full hover:bg-muted text-foreground/80 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card rounded-xl shadow-xl border py-1.5 min-w-[140px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      l === lang ? "text-primary font-semibold" : "text-foreground/80"
                    }`}
                  >
                    {langNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full hover:bg-muted text-foreground/80 transition-colors"
            aria-label="Menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                  open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <X
                className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                  open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-6xl bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-xl py-2">
          {links.map((l, i) => (
            <button
              key={l.key}
              onClick={() => scrollTo(l.href)}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
              className={`block w-full text-left px-6 py-3 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-primary transition-all ${
                open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
            >
              {t(l.key)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
