import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)" }}
            >
              <svg
                className="w-3.5 h-3.5 text-white"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <div>
              <span className="text-[14px] font-bold text-slate-900">InvoiceQuick</span>
              <span className="ml-2 text-[12px] text-slate-400">
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: "/terms",        label: "Terms of Service" },
              { href: "/privacy",      label: "Privacy Policy"   },
              { href: "/how-it-works", label: "Help Center"      },
              { href: "/about",        label: "Contact Us"       },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[12.5px] text-slate-500 hover:text-indigo-600 font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

        </div>
      </div>
    </footer>
  );
}
