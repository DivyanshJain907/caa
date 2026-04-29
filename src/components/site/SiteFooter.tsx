import Link from "next/link";
import { importantLinks, navItems } from "@/lib/site-data";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/60 bg-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold text-navy-900">
            Ajit Agarwal & Associates
          </div>
          <p className="text-sm text-slate-600">
            A trusted chartered accountant firm delivering tax, audit, and
            advisory excellence with clarity, speed, and discretion.
          </p>
          <div className="text-sm text-slate-600">
            Amar Complex, HC-49, Ram Ganga Vihar Phase 2, Moradabad, Uttar
            Pradesh 244001
          </div>
          <div className="text-sm text-slate-600">Phone: 098371 50633</div>
          <div className="text-sm text-slate-600">Email: info@aaca.in</div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">
            Quick Links
          </span>
          <div className="flex flex-col gap-2 text-sm text-slate-600">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-navy-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">
            Important Portals
          </span>
          <div className="flex flex-col gap-2 text-sm text-slate-600">
            {importantLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-navy-900"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/60 py-4">
        <div className="text-center text-xs text-slate-500 mb-2">
          Copyright 2026 Ajit Agarwal & Associates. All rights reserved.
        </div>
        <div className="text-center text-xs text-slate-500">
          Developed by{" "}
          <a
            href="https://thejainagency.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-900 hover:text-gold transition font-semibold"
          >
            The Jain Agency
          </a>
        </div>
      </div>
    </footer>
  );
}
