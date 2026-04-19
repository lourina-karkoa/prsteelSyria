import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultationFields } from "@/lib/formFields";
import logoF from '../assets/logo.png'
import {
  Users,
  Clock,
  GraduationCap,
  Globe,
  Activity,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  HeartPulseIcon,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  MessageCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import {
  contact,
  content,
  devices,
  operationConditions,
  osseoCases,
  prostheticPosts,
  therapyMethods,
} from "@/lib/content";
import FormField from "./ui/inputWatsup";
import TitleCommon from "./ui/TitleCommon";
const logoUrl = `${import.meta.env.BASE_URL}prosthetics-logo.jpg`;

const consultationSchema = z.object({
  age: z.string().min(1),
  weight: z.string().min(1),
  limbType: z.string().min(1),
  city: z.string().min(1),
  phone: z.string().min(6),
  center: z.string().min(1),
});

type ConsultationValues = z.infer<typeof consultationSchema>;

export function SEO({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.title = title;
    const setMeta = (selector: string, attr: string, value: string) => {
      let element = document.head.querySelector(
        selector,
      ) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        if (selector.includes("property="))
          element.setAttribute("property", attr);
        else element.setAttribute("name", attr);
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };
    setMeta('meta[name="description"]', "description", description);
    setMeta('meta[property="og:title"]', "og:title", title);
    setMeta('meta[property="og:description"]', "og:description", description);
  }, [title, description]);
  return null;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl md:text-3xl font-black tracking-tight lg:text-[42px]">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-sm md:text-base lg:text-lg mt-4 leading-8 text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function WhatsAppButton({
  values,
  className = "",
}: {
  values?: Partial<ConsultationValues>;
  className?: string;
}) {
  const { lang, t } = useI18n();
  const message = buildWhatsAppMessage(lang, values);
  return (
    <a
      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary md:text-base text-sm
         px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition
          hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/40 ${className}`}
    >
      <Phone className="h-4 w-4" />
      {t("common.whatsapp")}
    </a>
  );
}

function buildWhatsAppMessage(
  lang: Language,
  values?: Partial<ConsultationValues>,
) {
  const base = {
    ar: "مرحباً، أود الحصول على استشارة للأطراف الصناعية.",
    en: "Hello, I would like to request a prosthetics consultation.",
    tr: "Merhaba, protez danışmanlığı almak istiyorum.",
  }[lang];
  if (!values) return base;
  const labels = {
    ar: ["العمر", "الوزن", "نوع الطرف", "المدينة", "رقم الهاتف", "المركز"],
    en: ["Age", "Weight", "Limb type", "City", "Phone", "Center"],
    tr: ["Yaş", "Kilo", "Protez türü", "Şehir", "Telefon", "Merkez"],
  }[lang];
  return [
    base,
    `${labels[0]}: ${values.age ?? ""}`,
    `${labels[1]}: ${values.weight ?? ""}`,
    `${labels[2]}: ${values.limbType ?? ""}`,
    `${labels[3]}: ${values.city ?? ""}`,
    `${labels[4]}: ${values.phone ?? ""}`,
    `${labels[5]}: ${values.center ?? ""}`,
  ].join("\n");
}

export function HeroSection() {
  const { lang, t } = useI18n();
  const c = content[lang];

  return (
    <section className="relative h-[calc(100vh-72px)] medical-grid flex items-center justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(156,203,59,.24),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(15,23,42,.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(156,203,59,.18),transparent_32%)]" />

      <div className="px-5 md:px-10 lg:px-[60px] m-auto md:m-0 relative flex flex-col justify-center items-center gap-4 md:grid items-stretch md:gap-12 grid-cols-2">
        {/* LEFT */}
        <motion.div
          className="flex flex-col items-center md:items-start justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <TitleCommon
            badge={c.home.badge}
            title={t("hero.title")}
            description={c.home.heroNote}
            icon={<HeartPulse className="h-4 w-4 text-primary" />}
          />

          <div className="mt-3 md:mt-6 lg:mt-8 flex flex-wrap gap-4 ">
            <WhatsAppButton />
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full"
        >
          <div className="absolute rounded-[3rem] bg-primary/20 blur-3xl" />

          <div
            className="relative md:w-[100%] mx-auto aspect-[6/4] w-[80%] md:aspect-[10/10] lg:aspect-[12/9]   
          max-w-full overflow-hidden rounded-[2.5rem] border shadow-2xl"
          >
            {/* الصورة */}
            <img
              src={logoF}
              alt="prosthetic"
              className="w-full h-full object-contain transition duration-700 hover:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            {/* glow */}
            <div className="absolute inset-0 bg-[#9CCB3B]/10 blur-2xl opacity-40" />

            {/* النص */}
            <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 text-black dark:text-white max-w-sm md:max-w-md">
              <p className="text-xs md:text-sm lg:text-base opacity-80">
                {t("hero.journey")}
              </p>

              <h3 className="text-base md:text-lg lg:text-xl opacity-90 xl:text-2xl font-black leading-tight">
                {t("hero.recoveryTitle")}
              </h3>

              <p className="mt-1 md:mt-2 text-xs md:text-sm lg:text-base opacity-80">
                {t("hero.recoveryDesc")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  const { lang } = useI18n();
  const c = content[lang];

  const logos = Array(4).fill(c.partners).flat();

  return (
    <section className="pt-1 px-5 md:px-10 lg:px-[60px]">
      <div className="overflow-hidden w-full mx-auto rounded-xl px-4 py-1 bg-muted/50  dark:bg-white/[0.2] dark:invert dark:brightness-75 ">
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: lang === "ar" ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {logos.map((logo, i) => (
            <img key={i} src={logo} className="w-[80px] shrink-0" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ConsultationSection() {
  const { lang, t } = useI18n();
  const c = content[lang];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
  });

  const onSubmit = (values: ConsultationValues) => {
    window.open(
      `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
        buildWhatsAppMessage(lang, values),
      )}`,
      "_blank",
    );
  };

  const inputClass = `h-10 lg:h-12 w-full rounded-xl border bg-background
    text-sm lg:text-base
     px-4 pr-8 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20`;

  return (
    <section
      id="consultation"
      className="p-6 md:p-10 lg:p-[60px] relative overflow-hidden"
    >
      <div className="absolute inset-y-20 start-0 w-1/3 rounded-e-full bg-primary/10 blur-3xl" />

      <div className=" relative grid gap-4 md:gap-10 items-stretch md:grid-cols-[.85fr_1.15fr]">
        {/* LEFT */}
        <div className="flex flex-col justify-between h-full">
          <TitleCommon
            badge={c.home.formTitle}
            title={t("form.title")}
            description={c.home.formSubtitle}
            icon={<MessageCircle className="h-4 w-4 text-primary" />}
          />

          <div className="mt-4 lg:mt-8 rounded-3xl border bg-card p-2 lg:p-6 shadow-sm">
            <ShieldCheck className="mb-2 lg:mb-4 size-6 lg:size-9 text-primary" />
            <p className="text-sm lg:text-base text-muted-foreground">
              {t("form.subtitle")}
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between rounded-[2rem] border bg-card p-6 lg:p-8 shadow-2xl "
        >
          <div className="grid gap-3 lg:gap-5 grid-cols-2">
            {consultationFields.map((field) => (
              <FormField
                key={field.name}
                label={t(field.labelKey)}
                error={errors[field.name]}
              >
                {field.type === "input" && (
                  <input
                    className={inputClass}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                  />
                )}

                {field.type === "select" && (
                  <div className="relative">
                    <select
                      className={`${inputClass} appearance-none`}
                      {...register(field.name)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t("form.choose")}
                      </option>

                      {/* نوع الطرف */}
                      {field.name === "limbType" &&
                        c.tabs.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}

                      {/* المراكز */}
                      {field.name === "center" &&
                        [c.centers.coast.name, c.centers.aleppo.name].map(
                          (opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ),
                        )}
                    </select>

                    {/* السهم */}
                    <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ▼
                    </span>
                  </div>
                )}
              </FormField>
            ))}
          </div>

          <Button
            type="submit"
            className="mt-4 lg:mt-8 h-10 lg:h-13 w-full rounded-full bg-primary text-base font-black text-primary-foreground hover:bg-primary/90"
          >
            {t("form.submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
const icons = [Users, Clock, GraduationCap, Globe];
export function TrustSection() {
  const { lang } = useI18n();
  const c = content[lang];

  return (
    <section className="relative overflow-hidden bg-[#F8FAF8] dark:bg-[#0B1726] dark:text-white pb-3 md:pb-5 lg:pb-[30px] pt-6 md:pt-10 lg:pt-[60px]">
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

      {/* Glow */}
      <div className="absolute -top-24 -start-24 w-72 h-72 bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -end-24 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.14] 
  [background-image:radial-gradient(circle,#9CCB3B_1px,transparent_1px)] 
  [background-size:22px_22px]"
      />

      <div className="px-5 md:px-10 lg:px-[60px] relative z-10">
        {/* العنوان */}
        <SectionHeading title={c.home.trustTitle} />

        {/* الكاردات */}
        <div className="grid gap-4 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {c.stats.map((stat, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-white/10 
                   shadow-[0_5px_10px_rgba(0,0,0,0.08)]
                   bg-white/[0.04] backdrop-blur-md
                   px-6 py-5 text-center 
                   hover:scale-105 transition"
              >
                {/* أيقونة ديناميك */}
                <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />

                {/* النص */}
                <p className="font-bold text-base md:text-lg lg:text-xl">{stat}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProstheticTypesSection() {
  const { lang } = useI18n();
  const c = content[lang];
  return (
    <section className="pb-6 md:pb-10 lg:pb-[60px] pt-3 md:pt-5 lg:pt-[30px] bg-background">
      <div className="px-5 md:px-10 lg:px-[60px]">
        <SectionHeading title={c.home.prostheticsTitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
          {c.prostheticTypes.map(([title, description], index) => (
            <motion.div
              key={title}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-[2rem] border bg-card shadow-sm"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/25 via-muted to-slate-900/10 p-2 md:p-3 lg:p-6">
                <div className="grid h-full place-items-center rounded-[1.5rem] border border-white/40 bg-white/40 backdrop-blur dark:bg-slate-950/40">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
              </div>
              <div className="p-2 md:p-3 lg:p-6">
                <p className="text-sm font-bold text-primary">0{index + 1}</p>
                <h3 className="text-base md:text-lg lg:text-xl mt-1 lg:mt-2 font-black">{title}</h3>
                <p className="mt-1 lg:mt-3 lg:leading-7 text-sm md:text-base text-muted-foreground">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const { lang } = useI18n();
  const c = content[lang];

  const testimonials = [
    {
      name: "أحمد",
      text: "تجربة رائعة والخدمة كانت احترافية جداً.",
    },
    {
      name: "سارة",
      text: "الفريق ساعدني أرجع لحياتي الطبيعية بثقة.",
    },
    {
      name: "محمد",
      text: "أفضل مركز تعاملت معه من حيث التنظيم والمتابعة.",
    },
    {
      name: "لينا",
      text: "الخدمة ممتازة والنتائج فاقت توقعاتي.",
    },
  ];

  return (
    <section className="py-6 md:py-10 lg:py-[60px] bg-muted/50">
      <div className="px-5 md:px-10 lg:px-[60px]">
        {/* العنوان */}
        <SectionHeading
          title={c.home.testimonialsTitle}
          subtitle={c.home.subtitle}
        />

        {/* الكروت */}
        <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-4 md:mt-6 lg:mt-10">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-black/5 
                         bg-white/70 dark:bg-muted backdrop-blur-md
                         p-3 md:p-4 lg:p-6 
                         shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                         hover:-translate-y-1 
                         hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                         transition flex flex-col justify-between"
            >
              {/* TOP */}
              <div>
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="h-10 w-10 rounded-full bg-primary/10 
                    flex items-center justify-center font-bold text-primary"
                  >
                    {item.name[0]}
                  </div>

                  {/* Name + Stars */}
                  <div>
                    <p className="text-sm lg:text-base  font-bold text-foreground">{item.name}</p>

                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <p className="mt-4 text-xs md:text-sm leading-6 text-muted-foreground">
                  "{item.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CentersSection() {
  const { lang, t } = useI18n();
  const c = content[lang];
  const centers = [
    {
      key: "coast",
      href: "/centers/coast",
      icon: Building2,
      item: {
        name: c.centers.coast.name,
        intro: c.centers.coast.intro,
        services: ["الأطراف الصناعية", "العلاج الفيزيائي", "أجهزة التقويم"],
      },
    },
    {
      key: "aleppo",
      href: "/centers/aleppo",
      icon: Building2,
      item: {
        name: c.centers.aleppo.name,
        intro: c.centers.aleppo.intro,
        services: [
          "الأطراف الصناعية",
          "الاندماج العظمي",
          "العلاج الفيزيائي",
          "أجهزة التقويم",
        ],
      },
    },
    {
      key: "whatsapp",
      href: `https://wa.me/${contact.whatsapp}`,
      icon: MessageCircle,
      item: {
        name:
          lang === "ar"
            ? "استشارة أولية"
            : lang === "en"
              ? "Initial Consultation"
              : "İlk Danışmanlık",
        intro:
          lang === "ar"
            ? "تواصل مباشر مع فريقنا عبر واتساب لتحديد أفضل مركز وخطوة علاجية."
            : lang === "en"
              ? "Contact our team directly via WhatsApp to choose the right center and next step."
              : "Doğru merkez ve sonraki adım için WhatsApp üzerinden bizimle iletişime geçin.",
        services: ["متابعة عبر واتساب"],
      },
    },
  ];
  return (
    <section className="py-6 md:py-10 lg:py-[60px] bg-background">
      <div className="px-5 md:px-10 lg:px-[60px]">
        <SectionHeading title={c.home.centersTitle} />
        <div className="grid gap-4 lg:gap-16 sm:grid-cols-3">
          {centers.map(({ key, href, item, icon: Icon }) => {
            const isWhatsapp = key === "whatsapp";

            return (
              <div
                key={key}
                onClick={() => {
                  if (isWhatsapp) {
                    window.open(`https://wa.me/${contact.whatsapp}`, "_blank");
                  } else {
                    window.location.href = href;
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-xl border 
                   bg-card border-black/5 dark:border-white/10
                   shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                   hover:-translate-y-2 
                   hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                   transition flex flex-col"
              >
                {/* TOP */}
                <div className="aspect-video p-2 md:p-3">
                  <div className="flex h-full items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-2 md:p-3 flex flex-col justify-between flex-1">
                  {/* فوق */}
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl mt-1 lg:mt-2 font-bold">{item.name}</h3>

                    <p className="mt-1 lg:mt-3 text-sm leading-[16px] md:text-base text-muted-foreground">
                      {item.intro}
                    </p>

                    {/* الخدمات */}
                    {!isWhatsapp && (
                      <div className="mt-[6px] lg:mt-2 lg:space-y-[2px]">
                        {item.services.map((s, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="size-3 md:size-4 text-primary" />
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* تحت */}
                  <div className="mt-2 flex items-end justify-start gap-2 text-primary font-bold">
                    <span>
                      {isWhatsapp
                        ? lang === "ar"
                          ? "متابعة عبر واتساب"
                          : lang === "en"
                            ? "Continue on WhatsApp"
                            : "WhatsApp ile devam et"
                        : t("common.viewCenter")}
                    </span>

                    {lang === "ar" ? (
                      <ArrowLeft className="size-3 md:size-4" />
                    ) : (
                      <ArrowRight className="size-3 md:size-4" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SliderControls({
  active,
  total,
  setActive,
}: {
  active: number;
  total: number;
  setActive: (value: number) => void;
}) {
  const { lang, t } = useI18n();
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => setActive((active - 1 + total) % total)}
        aria-label={t("common.previous")}
      >
        {lang === "ar" ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => setActive(index)}
          className={`h-3 rounded-full transition-all ${active === index ? "w-9 bg-primary" : "w-3 bg-muted-foreground/30"}`}
          aria-label={`Slide ${index + 1}`}
        />
      ))}
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => setActive((active + 1) % total)}
        aria-label={t("common.next")}
      >
        {lang === "ar" ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

export function CenterPage({ centerKey }: { centerKey: "coast" | "aleppo" }) {
  const { lang } = useI18n();
  const c = content[lang];
  const center = c.centers[centerKey];
  return (
    <div>
      <SEO title={c.seo[centerKey]} description={c.seo.description} />
      <section className=" relative overflow-hidden medical-grid">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              {center.address}
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">
              {center.name}
            </h1>
            <p className="mt-6 text-xl leading-9 text-muted-foreground">
              {center.intro}
            </p>
            <div className="mt-8">
              <WhatsAppButton />
            </div>
          </div>
          <div className="rounded-[2.5rem] border bg-card p-6 shadow-2xl">
            <div className="grid min-h-96 place-items-center rounded-[2rem] bg-gradient-to-br from-primary/25 via-muted to-background">
              <Stethoscope className="h-24 w-24 text-primary" />
            </div>
          </div>
        </div>
      </section>
      <ServicesSection />
      <ProstheticsTabs />
      <TherapySlider />
      <DeviceSlider />
      {centerKey === "aleppo" ? <OsseointegrationSection /> : null}
    </div>
  );
}

function ServicesSection() {
  const { lang } = useI18n();
  const c = content[lang];
  return (
    <section className="section-screen bg-muted/50">
      <div className="container">
        <SectionHeading
          title={
            lang === "ar"
              ? "خدمات المركز"
              : lang === "en"
                ? "Center services"
                : "Merkez hizmetleri"
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {c.services.map(([title, description], index) => (
            <div
              key={title}
              className="rounded-[2rem] border bg-card p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              {[Activity, HeartPulse, ShieldCheck].map((Icon, i) =>
                i === index ? (
                  <Icon key={i} className="mb-6 h-12 w-12 text-primary" />
                ) : null,
              )}
              <h3 className="text-2xl font-black">{title}</h3>
              <p className="mt-4 leading-8 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProstheticsTabs() {
  const { lang, t } = useI18n();
  const c = content[lang];
  const [activeTab, setActiveTab] = useState(0);
  const [pages, setPages] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });
  const [loading, setLoading] = useState(false);
  const posts = prostheticPosts.filter((post) => post.tab === activeTab);
  const page = pages[activeTab] ?? 0;
  const pageCount = Math.ceil(posts.length / 10);
  const visible = posts.slice(page * 10, page * 10 + 10);
  const changePage = (nextPage: number) => {
    setLoading(true);
    setPages((current) => ({ ...current, [activeTab]: nextPage }));
    window.setTimeout(() => setLoading(false), 220);
  };
  return (
    <section className="min-h-screen bg-background py-24">
      <div className="container">
        <SectionHeading
          title={
            lang === "ar"
              ? "أنواع الأطراف المتوفرة"
              : lang === "en"
                ? "Available prosthetic types"
                : "Mevcut protez türleri"
          }
        />
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {c.tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(index);
                setPages((current) => ({ ...current, [index]: 0 }));
              }}
              className={`rounded-full px-6 py-3 font-bold transition ${activeTab === index ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "border bg-card text-muted-foreground hover:border-primary hover:text-primary"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${page}-${loading}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-5"
          >
            {loading
              ? Array.from({ length: 10 }, (_, index) => (
                <div
                  key={index}
                  className="h-72 animate-pulse rounded-3xl bg-muted"
                />
              ))
              : visible.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-muted p-4">
                    <div className="grid h-full place-items-center rounded-2xl bg-background/70">
                      <Activity className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black">{post.title[lang]}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {post.description[lang]}
                    </p>
                    <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between gap-2">
                        <dt>{c.labels.manufacturer}</dt>
                        <dd className="font-bold text-foreground">
                          {post.manufacturer}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt>{c.labels.weight}</dt>
                        <dd>{post.weight}</dd>
                      </div>
                    </dl>
                    <Button
                      size="sm"
                      className="mt-4 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {t("common.details")}
                    </Button>
                  </div>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 0}
            onClick={() => changePage(Math.max(0, page - 1))}
          >
            {t("common.previous")}
          </Button>
          {Array.from({ length: pageCount }, (_, index) => (
            <Button
              key={index}
              variant={index === page ? "default" : "outline"}
              className={
                index === page
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }
              onClick={() => changePage(index)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            disabled={page === pageCount - 1}
            onClick={() => changePage(Math.min(pageCount - 1, page + 1))}
          >
            {t("common.next")}
          </Button>
        </div>
      </div>
    </section>
  );
}

function TherapySlider() {
  const { lang } = useI18n();
  const c = content[lang];
  const [active, setActive] = useState(0);
  const item = therapyMethods[active];
  useEffect(() => {
    const id = window.setInterval(
      () => setActive((current) => (current + 1) % therapyMethods.length),
      5000,
    );
    return () => window.clearInterval(id);
  }, []);
  return (
    <section className="section-screen bg-muted/50">
      <div className="container max-w-5xl">
        <SectionHeading title={c.therapyTitle} />
        <div className="rounded-[2.5rem] border bg-card p-6 shadow-xl md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              className="grid gap-8 md:grid-cols-[.85fr_1.15fr]"
            >
              <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary/25 via-muted to-background p-5">
                <div className="grid h-full place-items-center rounded-2xl bg-background/70">
                  <HeartPulse className="h-16 w-16 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black">{item.title[lang]}</h3>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  {item.description[lang]}
                </p>
                <InfoBlock label={c.labels.why} value={item.why[lang]} />
                <InfoBlock
                  label={c.labels.duration}
                  value={item.duration[lang]}
                />
              </div>
            </motion.div>
          </AnimatePresence>
          <SliderControls
            active={active}
            total={therapyMethods.length}
            setActive={setActive}
          />
        </div>
      </div>
    </section>
  );
}

function DeviceSlider() {
  const { lang } = useI18n();
  const c = content[lang];
  const [active, setActive] = useState(0);
  const item = devices[active];
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight")
        setActive((current) => (current + 1) % devices.length);
      if (event.key === "ArrowLeft")
        setActive((current) => (current - 1 + devices.length) % devices.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  return (
    <section className="h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid h-full lg:grid-cols-2"
        >
          <div className="relative h-72 bg-gradient-to-br from-primary/30 via-slate-200 to-slate-950/30 p-8 lg:h-full dark:via-slate-800">
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="grid h-full place-items-center rounded-[2rem] border border-white/30 bg-white/35 backdrop-blur dark:bg-slate-950/35"
            >
              <Stethoscope className="h-28 w-28 text-primary" />
            </motion.div>
          </div>
          <div className="flex items-center p-8 md:p-16">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
                {c.devicesTitle}
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                {item.title[lang]}
              </h2>
              <p className="mt-6 text-xl leading-9 text-muted-foreground">
                {item.description[lang]}
              </p>
              <div className="mt-8 grid gap-3">
                {item.benefits[lang].map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 rounded-2xl border bg-card p-4"
                  >
                    <Check className="h-5 w-5 text-primary" />
                    <span className="font-bold">{benefit}</span>
                  </div>
                ))}
              </div>
              <SliderControls
                active={active}
                total={devices.length}
                setActive={setActive}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5 rounded-2xl border bg-background p-4">
      <p className="font-black text-primary">{label}</p>
      <p className="mt-2 leading-7 text-muted-foreground">{value}</p>
    </div>
  );
}

function OsseointegrationSection() {
  const { lang } = useI18n();
  const c = content[lang];
  const [active, setActive] = useState(0);
  const item = osseoCases[active];
  return (
    <>
      <section className="h-screen overflow-hidden bg-slate-950 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid h-full lg:grid-cols-2"
          >
            <div className="relative h-72 bg-gradient-to-br from-primary/40 to-slate-900 p-8 lg:h-full">
              <div className="grid h-full place-items-center rounded-[2rem] border border-white/10 bg-white/10">
                <Sparkles className="h-28 w-28 text-primary" />
              </div>
            </div>
            <div className="flex items-center p-8 md:p-16">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
                  {c.osseoTitle}
                </p>
                <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                  {item.title[lang]}
                </h2>
                <p className="mt-6 text-lg leading-9 text-white/75">
                  {item.description[lang]}
                </p>
                <div className="mt-8 grid gap-3">
                  <InfoDark
                    label={c.labels.whenPossible}
                    value={item.whenPossible[lang]}
                  />
                  <InfoDark
                    label={c.labels.conditions}
                    value={item.conditions[lang]}
                  />
                  <InfoDark
                    label={c.labels.notPossible}
                    value={item.notPossible[lang]}
                  />
                  <InfoDark label={c.labels.safety} value={item.safety[lang]} />
                </div>
                <SliderControls
                  active={active}
                  total={osseoCases.length}
                  setActive={setActive}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      <section className="section-screen bg-muted/50">
        <div className="container">
          <SectionHeading
            title={c.operationRulesTitle}
            subtitle={c.osseoSubtitle}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <RuleCard
              title={c.conditionsTitle}
              items={operationConditions.good[lang]}
              positive
            />
            <RuleCard
              title={c.contraindicationsTitle}
              items={operationConditions.bad[lang]}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoDark({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="font-black text-primary">{label}</p>
      <p className="mt-2 leading-7 text-white/75">{value}</p>
    </div>
  );
}

function RuleCard({
  title,
  items,
  positive = false,
}: {
  title: string;
  items: string[];
  positive?: boolean;
}) {
  return (
    <div className="rounded-[2rem] border bg-card p-8 shadow-xl">
      <h3
        className={`text-2xl font-black ${positive ? "text-primary" : "text-destructive"}`}
      >
        {title}
      </h3>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl border bg-background p-4"
          >
            {positive ? (
              <Check className="h-5 w-5 text-primary" />
            ) : (
              <X className="h-5 w-5 text-destructive" />
            )}
            <span className="font-bold">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutContent() {
  const { lang } = useI18n();
  const c = content[lang];
  return (
    <div>
      <SEO title={c.seo.about} description={c.seo.description} />
      <section className="section-screen medical-grid">
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_.8fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              {c.about.title}
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">
              {c.about.title}
            </h1>
            <p className="mt-6 text-xl leading-9 text-muted-foreground">
              {c.about.description}
            </p>
          </div>
          <div className="rounded-[2.5rem] border bg-card p-8 shadow-2xl">
            <img
              src={logoUrl}
              alt="Logo"
              className="mx-auto h-64 object-contain"
            />
          </div>
        </div>
      </section>
      <section className="section-screen bg-muted/50">
        <div className="container grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border bg-card p-8 shadow-sm">
            <h2 className="text-3xl font-black text-primary">
              {c.about.mission}
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {c.about.missionText}
            </p>
          </div>
          <div className="rounded-[2rem] border bg-card p-8 shadow-sm">
            <h2 className="text-3xl font-black text-primary">
              {c.about.vision}
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {c.about.visionText}
            </p>
          </div>
          <div className="rounded-[2rem] border bg-card p-8 shadow-sm lg:col-span-2">
            <h2 className="text-3xl font-black">{c.about.why}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {c.about.points.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border bg-background p-5"
                >
                  <Check className="mb-3 h-6 w-6 text-primary" />
                  <p className="font-bold">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PartnersSection />
    </div>
  );
}

export function ContactContent() {
  const { lang, t } = useI18n();
  const c = content[lang];
  return (
    <div>
      <SEO title={c.seo.contact} description={c.seo.description} />
      <section className="section-screen medical-grid">
        <div className="container">
          <SectionHeading
            title={c.contactPage.title}
            subtitle={c.contactPage.subtitle}
          />
          <div className="grid gap-6 md:grid-cols-3">
            <ContactCard
              icon={<Phone className="h-8 w-8 text-primary" />}
              title={c.contactPage.phone}
              items={contact.phones}
            />
            <ContactCard
              icon={<MapPin className="h-8 w-8 text-primary" />}
              title={c.contactPage.locations}
              items={[c.centers.coast.address, c.centers.aleppo.address]}
            />
            <ContactCard
              icon={<Activity className="h-8 w-8 text-primary" />}
              title={c.contactPage.hours}
              items={[contact.hours, contact.email]}
            />
          </div>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton className="px-8" />
          </div>
        </div>
      </section>
      <section className="section-screen bg-muted/50">
        <div className="container grid gap-6 md:grid-cols-2">
          {[c.centers.coast, c.centers.aleppo].map((center, index) => (
            <a
              key={center.name}
              href={index === 0 ? contact.maps.coast : contact.maps.aleppo}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[2rem] border bg-card p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <MapPin className="mb-6 h-10 w-10 text-primary" />
              <h3 className="text-3xl font-black">{center.name}</h3>
              <p className="mt-3 text-muted-foreground">{center.address}</p>
              <span className="mt-6 inline-flex font-bold text-primary">
                Google Maps
              </span>
            </a>
          ))}
          <div className="rounded-[2rem] border bg-card p-8 shadow-sm md:col-span-2">
            <h3 className="text-2xl font-black">{c.contactPage.social}</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Facebook", "Instagram", "Telegram"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-full border px-5 py-3 font-bold transition hover:border-primary hover:text-primary"
                >
                  {item}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {t("common.allRights")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[2rem] border bg-card p-8 shadow-sm">
      {icon}
      <h3 className="mt-5 text-2xl font-black">{title}</h3>
      <div className="mt-4 space-y-2 text-muted-foreground">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export function HomeContent() {
  const { lang } = useI18n();
  const c = content[lang];
  return (
    <div>
      <SEO title={c.seo.home} description={c.seo.description} />
      <HeroSection />
      <PartnersSection />
      <ConsultationSection />
      <TrustSection />
      <ProstheticTypesSection />
      <TestimonialsSection />
      <CentersSection />
    </div>
  );
}
