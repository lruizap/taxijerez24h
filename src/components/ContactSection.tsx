import { useState, FormEvent } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useScrollReveal<HTMLDivElement>();
  const infoRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLFormElement>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm";

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{t("contact_title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("contact_subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div ref={infoRef} className="reveal-left space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">{t("contact_label_phone")}</p>
                <a href="tel:+34600000000" className="text-muted-foreground text-sm hover:text-primary transition-colors">+34 600 000 000</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">{t("contact_label_email")}</p>
                <a href="mailto:info@taxijerez.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">info@taxijerez.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">{t("contact_label_location")}</p>
                <p className="text-muted-foreground text-sm">Jerez de la Frontera, Cádiz</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="reveal-right lg:col-span-2 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" required placeholder={t("contact_name")} className={inputClass} />
              <input type="tel" required placeholder={t("contact_phone")} className={inputClass} />
              <input type="email" placeholder={t("contact_email")} className={inputClass} />
              <input type="datetime-local" required className={inputClass} />
              <input type="text" required placeholder={t("contact_origin")} className={inputClass} />
              <input type="text" required placeholder={t("contact_destination")} className={inputClass} />
              <input type="number" min="1" max="9" required placeholder={t("contact_passengers")} className={inputClass} />
              <select required className={inputClass}>
                <option value="">{t("contact_vehicle")}</option>
                <option value="standard">{t("contact_vehicle_standard")}</option>
                <option value="7">{t("contact_vehicle_7")}</option>
                <option value="9">{t("contact_vehicle_9")}</option>
                <option value="adapted">{t("contact_vehicle_adapted")}</option>
              </select>
            </div>
            <textarea rows={3} placeholder={t("contact_message")} className={inputClass} />
            <button
              type="submit"
              disabled={submitted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-bold hover:brightness-110 hover:shadow-lg transition-all disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {submitted ? "✓" : t("contact_send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
