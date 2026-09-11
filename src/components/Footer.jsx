import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Clock3,
} from "lucide-react";

import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-teal text-[#f1f1ee] border-t border-[#f1f1ee]">

      {/* Main Footer */}
      <div className="wrap px-6 md:px-10 pt-16 md:pt-20 pb-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={logo}
              alt="Aveline Stays"
              className="h-10 w-auto mb-6"
            />

            <p className="text-sm leading-7 text-[#f1f1ee] max-w-xs">
              Quietly extraordinary stays, verified housekeeping, and a
              team that answers the phone.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-8 bg-[#c8a96b]" />

              <span className="text-[9px] uppercase tracking-[0.25em] text-[#a78950]">
                Stay beautifully
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.25em] text-[#a78950] font-medium mb-6">
              Explore
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/hotels"
                  className="group inline-flex items-center gap-2 text-sm text-[#f1f1ee] hover:text-[#f1f1ee] transition-colors duration-300"
                >
                  Find Stays
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 text-sm text-[#f1f1ee] hover:text-[#f1f1ee] transition-colors duration-300"
                >
                  Services
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/blogs"
                  className="group inline-flex items-center gap-2 text-sm text-[#f1f1ee] hover:text-[#f1f1ee]transition-colors duration-300"
                >
                  Journal
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/testimonials"
                  className="group inline-flex items-center gap-2 text-sm text-[#f1f1ee] hover:text-[#f1f1ee] transition-colors duration-300"
                >
                  Guest Stories
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.25em] text-[#a78950] font-medium mb-6">
              Company
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/hotel-partners"
                  className="group inline-flex items-center gap-2 text-sm text-[#f1f1ee] hover:text-[#f1f1ee] transition-colors duration-300"
                >
                  Hotel Partners
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/collaborate"
                  className="group inline-flex items-center gap-2 text-sm text-[#f1f1ee] hover:text-[#f1f1ee] transition-colors duration-300"
                >
                  Partner With Us
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/faqs"
                  className="group inline-flex items-center gap-2 text-sm text-[#f1f1ee] hover:text-[#f1f1ee] transition-colors duration-300"
                >
                  FAQs
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  />
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="group inline-flex items-center gap-2 text-sm text-[#f1f1ee] hover:text-[#f1f1ee] transition-colors duration-300"
                >
                  Privacy Policy
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.4}
                    className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.25em] text-[#a78950] font-medium mb-6">
              Reach Us
            </h4>

            <ul className="space-y-4">

              <li>
                <a
                  href="mailto:hello@avelinestays.com"
                  className="flex items-start gap-3 group"
                >
                  <Mail
                    size={15}
                    strokeWidth={1.3}
                    className="mt-0.5 text-[#a78950] shrink-0"
                  />

                  <span className="text-sm text-[#f1f1ee] group-hover:text-[#f1f1ee]  transition-colors duration-300">
                    hello@avelinestays.com
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919000000000"
                  className="flex items-start gap-3 group"
                >
                  <Phone
                    size={15}
                    strokeWidth={1.3}
                    className="mt-0.5 text-[#a78950] shrink-0"
                  />

                  <span className="text-sm text-[#f1f1ee] group-hover:text-[#f1f1ee] transition-colors duration-300">
                    +91 90000 00000
                  </span>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3">
                  <Clock3
                    size={15}
                    strokeWidth={1.3}
                    className="mt-0.5 text-[#a78950] shrink-0"
                  />

                  <span className="text-sm text-[#f1f1ee]">
                    Mon–Sun, 24×7 support
                  </span>
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#15191c]/10">
        <div className="wrap px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <span className="text-[9px] uppercase tracking-[0.2em] text-[#f1f1ee]">
            © {new Date().getFullYear()} Aveline Stays. All rights reserved.
          </span>

          <Link
            to="https://www.instagram.com/izhan__kagzi/"
            className="group inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#f1f1ee] hover:text-[#a78950] transition-colors duration-300"
          >
            Design & Developed By Izhan Kagzi

            <ArrowUpRight
              size={12}
              strokeWidth={1.4}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </Link>

        </div>
      </div>

    </footer>
  );
}
