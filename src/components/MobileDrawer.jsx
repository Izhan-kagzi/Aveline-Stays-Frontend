import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import logoDark from "../assets/logo.svg";

/**
 * Rendered via a portal straight into document.body — NOT nested inside the
 * <header>. This matters: the header gets a `backdrop-blur` class once the
 * page is scrolled, and `backdrop-filter` on an ancestor makes some mobile
 * browsers (notably iOS Safari) treat that ancestor as the containing block
 * for `position: fixed` descendants instead of the viewport. That collapsed
 * this drawer down to the header's own (short) height whenever it was opened
 * after scrolling. Portaling to <body> sidesteps the whole issue.
 */
export default function MobileDrawer({ open, onClose, links, auth, onAccountClick, onLogout }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return createPortal(
    <div
      className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`absolute left-0 top-0 bottom-0 w-[82%] max-w-sm bg-white shadow-2xl flex flex-col p-8 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <img src={logoDark} alt="Aveline Stays" className="h-9 w-auto" />
          <button onClick={onClose} aria-label="Close menu" className="text-2xl text-ink/60">×</button>
        </div>
        <div className="flex flex-col gap-5 overflow-y-auto">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={onClose} className="text-xl font-serif text-ink">
              {l.label}
            </Link>
          ))}
          <button onClick={() => { onClose(); onAccountClick(); }} className="text-xl font-serif text-gold text-left mt-2">
            {auth ? "My Account" : "Login"}
          </button>
          {auth && (
            <button onClick={() => { onClose(); onLogout(); }} className="text-sm text-muted text-left">
              Sign out
            </button>
          )}
        </div>
        <Link to="/hotels" onClick={onClose} className="btn-primary justify-center mt-auto">
          Book Now
        </Link>
      </div>
    </div>,
    document.body
  );
}
