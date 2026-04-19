import { Link, useLocation } from "wouter";
import { Globe, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { useI18n } from "@/lib/i18n";
const logoUrl = `${import.meta.env.BASE_URL}logo.png`;

export function Navbar() {
  const { t, lang, setLang, dir } = useI18n();
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/centers/coast", label: t("nav.coastCenter") },
    { href: "/centers/aleppo", label: t("nav.aleppoCenter") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl">
      <div className="px-5 md:px-10 lg:px-[60px] flex h-18 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-full shadow-lg flex justify-end items-center dark:shadow-md  dark:border-1 dark:shadow-amber-50">
            <img src={logoUrl} alt={t("common.brand")} className="ps-[7px]" />
          </div>

          <span className="hidden max-w-52 text-sm font-black leading-tight sm:inline-block">{t("common.brand")}</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => {
            const isActive = location === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-bold transition ${isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {link.label}

                {/* underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0"
                    }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border p-1 sm:flex">
            {(["ar", "en", "tr"] as const).map((code) => (
              <button key={code} onClick={() => setLang(code)} className={`rounded-full px-3 py-1.5 text-xs font-black transition ${lang === code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 sm:hidden">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={dir === "rtl" ? "start" : "end"}>
              <DropdownMenuItem onClick={() => setLang("ar")}>العربية</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("tr")}>Türkçe</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Theme</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={dir === "rtl" ? "right" : "left"}>
              <div className="mt-10 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-black transition hover:text-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
