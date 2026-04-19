import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { contact, content } from "@/lib/content";
import logoUrl from "@/assets/logo.png";
export function Footer() {
  const { t, lang } = useI18n();
  const c = content[lang];

  const sections = [
    {
      title: t("nav.contact"),
      items: [
        { icon: Phone, text: contact.phones[0] },
        { icon: Mail, text: contact.email },
        { icon: MapPin, text: c.centers.aleppo.address },
      ],
    },
    {
      title:
        lang === "ar"
          ? "خدماتنا"
          : lang === "en"
          ? "Our Services"
          : "Hizmetlerimiz",
      items: [
        { text: t("services.osseo") },
        { text: t("services.prosthetics") },
        { text: t("services.physio") },
        { text: t("services.orthotics") },
      ],
    },
    {
      title: t("common.quickLinks"),
      items: [
        { text: t("nav.about"), href: "/about" },
        { text: t("nav.coastCenter"), href: "/centers/coast" },
        { text: t("nav.aleppoCenter"), href: "/centers/aleppo" },
        { text: t("nav.contact"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t dark:bg-slate-950 py-12 dark:text-white bg-white text-black ">

      <div className="
        px-5 md:px-10 lg:px-[60px] 
        flex flex-col items-center text-center
        md:grid md:grid-cols-2 md:text-start
        lg:grid-cols-5 gap-10
      ">

        {/* LOGO */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <img src={logoUrl} className="w-11" />
            <h3 className="text-xl lg:text-2xl font-black text-primary">
              {t("common.brand")}
            </h3>
          </div>

          <p className="mt-4 max-w-md text-sm lg:text-base dark:text-white/70 text-black/70 mx-auto md:mx-0">
            {c.seo.description}
          </p>
        </div>

        {/* SECTIONS */}
        {sections.map((section, i) => (
          <div key={i} className="text-center md:text-start">

            <h3 className="mb-4 text-base lg:text-lg font-black">
              {section.title}
            </h3>

            <ul className="space-y-3 dark:text-white/70 text-black/70 md:text-xs lg:text-sm">

              {section.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 justify-center md:justify-start">

                  {/* icon */}
                  {"icon" in item && item.icon && (
  <item.icon className="h-4 w-4 text-primary" />
)}

                  {/* link or text */}
                  {"href" in item ? (
                    <Link href={item.href} className="hover:text-primary transition">
                      {item.text}
                    </Link>
                  ) : (
                    <span>{item.text}</span>
                  )}

                </li>
              ))}

            </ul>

          </div>
        ))}

      </div>

      {/* BOTTOM */}
      <div className="mt-10 border-t border-black/10 dark:border-white/10 pt-6 text-center text-sm dark:text-white/60 text-black/60">
        {t("common.allRights")} , {t("common.brand")} {new Date().getFullYear()}© .
      </div>

    </footer>
  );
}
