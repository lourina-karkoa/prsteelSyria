import { Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { contact } from "@/lib/content";

export function FloatingWhatsApp() {
  const { t, lang, dir } = useI18n();

  const text = encodeURIComponent(
    lang === "ar"
      ? "مرحباً، أود الحصول على استشارة حول الأطراف الصناعية."
      : lang === "en"
      ? "Hello, I would like a consultation about prosthetics."
      : "Merhaba, protez hakkında danışmanlık almak istiyorum."
  );

  return (
    <a
      href={`https://wa.me/${contact.whatsapp}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      className={`fixed bottom-6 z-50 ${
        dir === "rtl" ? "left-6" : "right-6"
      }`}
      aria-label={t("common.whatsapp")}
    >
      <div className="relative flex items-center justify-center">

        {/* glow */}
        <span className="absolute h-20 w-20 rounded-full 
          bg-green-400/30 blur-xl animate-pulse" />

        <span className="absolute h-16 w-16 rounded-full 
          bg-green-500/30 blur-lg animate-pulse delay-200" />

        
          {/* صورة واتساب */}
          <img
            src="https://leg.luxmedprotez.com/wp-content/uploads/2025/04/whattsapp-icon-chat-icon.png"
            alt="whatsapp"
            className="h-13 w-13 object-contain"
          />

          {/* أيقونة الاتصال فوقها */}
         
        </div>

      
    </a>
  );
}