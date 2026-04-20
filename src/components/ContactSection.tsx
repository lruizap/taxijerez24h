import { useState, FormEvent } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Nombre requerido").max(100),
  phone: z.string().trim().min(6, "Teléfono inválido").max(30),
  email: z.string().trim().email("Email inválido").max(255).optional().or(z.literal("")),
  datetime: z.string().min(1, "Fecha requerida"),
  origin: z.string().trim().min(1, "Origen requerido").max(200),
  destination: z.string().trim().min(1, "Destino requerido").max(200),
  passengers: z.string().min(1, "Pasajeros requeridos"),
  vehicle: z.string().min(1, "Vehículo requerido"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const ContactSection = () => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const headerRef = useScrollReveal<HTMLDivElement>();
  const infoRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLFormElement>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      datetime: String(fd.get("datetime") || ""),
      origin: String(fd.get("origin") || ""),
      destination: String(fd.get("destination") || ""),
      passengers: String(fd.get("passengers") || ""),
      vehicle: String(fd.get("vehicle") || ""),
      message: String(fd.get("message") || ""),
      language: lang,
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-booking-email", {
        body: parsed.data,
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(t("contact_success") || "¡Reserva enviada! Te contactaremos pronto.");
      form.reset();
    } catch (err) {
      console.error("send-booking-email failed", err);
      toast.error(
        t("contact_error") ||
          "No se pudo enviar la reserva. Inténtalo de nuevo o llámanos al +34 691 31 27 82."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm";

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
                <a
                  href="tel:+34691312782"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  <span className="flex flex-col leading-tight">
                    <span>+34 691 31 27 82</span>
                    <span>+34 666 99 04 24</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">{t("contact_label_email")}</p>
                <a href="mailto:frantrujillano@taxijerez24h.com" className="text-muted-foreground text-sm hover:text-primary transition-colors break-all">
                  frantrujillano@taxijerez24h.com
                </a>
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
              <input name="name" type="text" required maxLength={100} placeholder={t("contact_name")} className={inputClass} />
              <input name="phone" type="tel" required maxLength={30} placeholder={t("contact_phone")} className={inputClass} />
              <input name="email" type="email" maxLength={255} placeholder={t("contact_email")} className={inputClass} />
              <input name="datetime" type="datetime-local" required className={inputClass} />
              <input name="origin" type="text" required maxLength={200} placeholder={t("contact_origin")} className={inputClass} />
              <input name="destination" type="text" required maxLength={200} placeholder={t("contact_destination")} className={inputClass} />
              <input name="passengers" type="number" min="1" max="9" required placeholder={t("contact_passengers")} className={inputClass} />
              <select name="vehicle" required className={inputClass} defaultValue="">
                <option value="" disabled>{t("contact_vehicle")}</option>
                <option value="standard">{t("contact_vehicle_standard")}</option>
                <option value="7">{t("contact_vehicle_7")}</option>
                <option value="9">{t("contact_vehicle_9")}</option>
                <option value="adapted">{t("contact_vehicle_adapted")}</option>
              </select>
            </div>
            <textarea name="message" rows={3} maxLength={2000} placeholder={t("contact_message")} className={inputClass} />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-bold hover:brightness-110 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? (t("contact_sending") || "Enviando...") : t("contact_send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
