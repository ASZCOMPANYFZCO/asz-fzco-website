import dynamic from "next/dynamic";
import { Header, Footer } from "@/components/layout";

// Lazy load non-critical components — they aren't needed for initial paint
const WhatsAppButton = dynamic(
  () => import("@/components/layout/WhatsAppButton").then((m) => m.WhatsAppButton)
);
const CookieConsent = dynamic(
  () => import("@/components/layout/CookieConsent").then((m) => m.CookieConsent)
);

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
