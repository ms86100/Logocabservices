# Capacitor conversion plan

The frontend is static-exported, uses a browser-only Supabase Edge Function client, and keeps booking models and validation outside the UI. It is ready to be wrapped once the web deployment is stable.

1. Install Capacitor packages: `npm install @capacitor/core @capacitor/cli` and run `npx cap init "LOGO CAB SERVICES" com.example.logocab --web-dir out`.
2. Build the static site with `npm run build`, then add the native projects using `npx cap add ios` and `npx cap add android`.
3. Run `npx cap sync` after every web build. Replace `public/icons/app-icon.svg` with required Android/iOS raster icon and splash-screen assets at this stage.
4. Configure native safe areas, status-bar colors, deep-link domains, and allowlist the Supabase project URL in the native platform configuration.
5. Add location permission copy and the native location plugin only when a real location feature is introduced. The current manual location inputs do not request location permissions.
6. Add push notifications through a native provider (for example FCM/APNs via a Capacitor plugin). A PWA is not a substitute for native background or push capabilities.

Keep `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the mobile build configuration. Keep Resend and service-role credentials exclusively in Supabase Edge Function secrets.
