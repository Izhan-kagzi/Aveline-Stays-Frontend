import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiMail } from "react-icons/fi";
import Logo from "./Logo";

const cols = [
  { title: "Explore", links: [["Stays", "/stays"], ["AI Itinerary", "/itinerary"], ["Journal", "/journal"], ["Saved stays", "/favorites"]] },
  { title: "Company", links: [["About", "/about"], ["Partner with us", "/collaborate"], ["Contact", "/contact"], ["My bookings", "/my-bookings"]] },
  { title: "Support", links: [["FAQs", "/faqs"], ["Privacy policy", "/privacy"], ["Terms & conditions", "/terms"]] },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-forest-800 text-ivory">
      <div className="grain absolute inset-0" />
      <div className="container-x relative py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm leading-relaxed text-ivory/65">Handpicked boutique hotels, villas and retreats — each one chosen for character, comfort and the stories it lets you tell.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex max-w-sm overflow-hidden rounded-full border border-white/15 bg-white/5 p-1.5">
              <FiMail className="ml-4 mt-3.5 shrink-0 text-ivory/50" />
              <input type="email" required placeholder="Your email for stay notes" className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-ivory/40" />
              <button className="btn-brass !px-5 !py-2.5">Join</button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="eyebrow mb-5">{c.title}</p>
                <ul className="space-y-3">
                  {c.links.map(([label, to]) => <li key={to}><Link to={to} className="text-sm text-ivory/70 transition hover:text-brass-light">{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-ivory/50">
          <p>© {new Date().getFullYear()} Aveline Stays. All rights reserved.</p>
          <div className="flex gap-3">
            {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => <a key={i} href="#" aria-label="Social" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-brass hover:text-brass"><Icon /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
