import { corsHeaders } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = "Taxi Jerez 24h <info@taxijerez24h.com>";
const TO_EMAIL = "frantrujillano@taxijerez24h.com";

interface BookingPayload {
  name: string;
  phone: string;
  email?: string;
  datetime: string;
  origin: string;
  destination: string;
  passengers: string;
  vehicle: string;
  luggage?: string;
  message?: string;
  language?: string;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validate = (
  b: unknown,
): { ok: true; data: BookingPayload } | { ok: false; error: string } => {
  if (!b || typeof b !== "object") {
    return { ok: false, error: "Invalid body" };
  }

  const body = b as Record<string, unknown>;

  const required = [
    "name",
    "phone",
    "datetime",
    "origin",
    "destination",
    "passengers",
    "vehicle",
  ];

  for (const field of required) {
    const value = body[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      return { ok: false, error: `Missing field: ${field}` };
    }
    if (value.length > 500) {
      return { ok: false, error: `Field too long: ${field}` };
    }
  }

  if (
    body.email !== undefined &&
    body.email !== "" &&
    (typeof body.email !== "string" ||
      body.email.length > 255 ||
      !isValidEmail(body.email))
  ) {
    return { ok: false, error: "Invalid email" };
  }

  if (
    body.luggage !== undefined &&
    body.luggage !== "" &&
    (typeof body.luggage !== "string" || body.luggage.length > 500)
  ) {
    return { ok: false, error: "Invalid luggage" };
  }

  if (
    body.message !== undefined &&
    body.message !== "" &&
    (typeof body.message !== "string" || body.message.length > 2000)
  ) {
    return { ok: false, error: "Message too long" };
  }

  if (
    body.language !== undefined &&
    body.language !== "" &&
    typeof body.language !== "string"
  ) {
    return { ok: false, error: "Invalid language" };
  }

  return { ok: true, data: body as unknown as BookingPayload };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const body = await req.json();
    const result = validate(body);

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    const d = result.data;

    const safe = {
      name: escapeHtml(d.name),
      phone: escapeHtml(d.phone),
      email: d.email ? escapeHtml(d.email) : "—",
      datetime: escapeHtml(d.datetime),
      origin: escapeHtml(d.origin),
      destination: escapeHtml(d.destination),
      passengers: escapeHtml(d.passengers),
      vehicle: escapeHtml(d.vehicle),
      luggage: d.luggage ? escapeHtml(d.luggage) : "—",
      message: d.message ? escapeHtml(d.message) : "—",
      language: d.language ? escapeHtml(d.language) : "es",
    };

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#fff;color:#1a1a1a">
        <div style="background:#1e40af;color:#fff;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="margin:0;font-size:22px">🚕 Nueva reserva — Taxi Jerez 24h</h1>
        </div>

        <div style="border:1px solid #e5e7eb;border-top:0;padding:24px;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr>
              <td style="padding:8px 0;color:#6b7280;width:140px"><strong>Nombre</strong></td>
              <td>${safe.name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Teléfono</strong></td>
              <td><a href="tel:${safe.phone}">${safe.phone}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Email</strong></td>
              <td>${safe.email}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Fecha y hora</strong></td>
              <td>${safe.datetime}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Origen</strong></td>
              <td>${safe.origin}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Destino</strong></td>
              <td>${safe.destination}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Pasajeros</strong></td>
              <td>${safe.passengers}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Vehículo</strong></td>
              <td>${safe.vehicle}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top"><strong>Bultos</strong></td>
              <td style="white-space:pre-wrap">${safe.luggage}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top"><strong>Mensaje</strong></td>
              <td style="white-space:pre-wrap">${safe.message}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Idioma web</strong></td>
              <td>${safe.language}</td>
            </tr>
          </table>

          <p style="margin-top:24px;font-size:12px;color:#9ca3af">
            Enviado desde el formulario web de taxijerez24h.com
          </p>
        </div>
      </div>
    `;

    const resendPayload: Record<string, unknown> = {
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `🚕 Nueva reserva de ${d.name} — ${d.datetime}`,
      html,
    };

    if (d.email && isValidEmail(d.email)) {
      resendPayload.reply_to = d.email;
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(resendPayload),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend error:", resendRes.status, resendData);
      return new Response(
        JSON.stringify({
          error: "Failed to send email",
          detail: resendData,
        }),
        {
          status: 502,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        id: resendData.id,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    console.error("send-booking-email error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";

    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
