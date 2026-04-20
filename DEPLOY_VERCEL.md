# 🚀 Despliegue en Vercel

## 1. Variables de entorno en Vercel

Ve a **Vercel Dashboard → tu proyecto → Settings → Environment Variables** y añade estas 3 variables (marca los 3 entornos: **Production**, **Preview** y **Development**):

| Nombre | Valor |
|---|---|
| `VITE_SUPABASE_PROJECT_ID` | `inadaamtmqrxvwjfouft` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYWRhYW10bXFyeHZ3amZvdWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MDIwOTYsImV4cCI6MjA5MjE3ODA5Nn0.KxEe_raQCh-iPOOOfnAHkQvzSxxA09RhUTQyL0cP-V8` |
| `VITE_SUPABASE_URL` | `https://inadaamtmqrxvwjfouft.supabase.co` |

> Estas claves son **públicas** (anon key de Supabase). Es seguro exponerlas en el frontend porque la seguridad real está en las políticas RLS del backend.

## 2. Claves privadas (NO van en Vercel)

`RESEND_API_KEY` y otras claves privadas viven en **Lovable Cloud Secrets** y solo las usa la Edge Function `send-booking-email`, que se ejecuta en infraestructura de Lovable Cloud (no en Vercel). El frontend desplegado en Vercel solo invoca la función vía Supabase client.

## 3. Pasos para desplegar

### Opción A — desde la web de Vercel
1. Importa el repo de GitHub en Vercel.
2. Framework Preset: **Vite** (autodetectado).
3. Añade las variables de entorno del paso 1.
4. Deploy.

### Opción B — con Vercel CLI
```bash
npm i -g vercel
vercel login
vercel link

# Añadir variables (te pedirá el valor por cada entorno)
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
vercel env add VITE_SUPABASE_PROJECT_ID

# Desplegar
vercel --prod
```

## 4. Después de configurar Vercel

Una vez las variables estén en Vercel, puedes **borrar el `.env` local** del repo. Para desarrollo local, copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

El `.env` ya está en `.gitignore`, así que nunca se subirá al repositorio.

## 5. Verificación

Tras el despliegue, abre la consola del navegador en tu URL de Vercel y comprueba que no hay errores de Supabase (`Missing SUPABASE_URL`, etc.). Si los hay, revisa que las variables estén bien escritas y que hayas hecho un **redeploy** después de añadirlas (Vercel no aplica cambios de env vars sin redeploy).
