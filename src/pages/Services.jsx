import React from "react";
import { Link } from "react-router-dom";
import { services, servicesHeroImage } from "../data/content.js";
import BackButton from "../components/BackButton.jsx";
import StaffSection from "../components/StaffSection.jsx";
import ServicesIcons from "../components/ServicesIcons.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Services() {
  return (
    <div>
      <section
        className="relative min-h-[85vh] flex flex-col justify-center items-center text-center pt-32"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,20,18,0.55) 0%, rgba(15,15,13,0.65) 60%, rgba(10,10,9,0.85) 100%), url(" +
            servicesHeroImage +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="eyebrow !text-goldBright mb-4">Let's Work Together</span>
        <h1 className="text-white text-5xl md:text-7xl leading-tight max-w-4xl font-normal px-6">
          Experience Luxury <span className="italic font-light text-goldBright">Housekeeping</span> Services
        </h1>
        <p className="text-white/80 max-w-xl mt-6 px-6">
          From partner hotels and corporate offices to hospitals, malls and premium residential
          properties, Aveline Stays delivers exceptional housekeeping with professionalism,
          reliability and unmatched attention to detail.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Link to="/collaborate" className="btn-outline">Get Free Quote →</Link>
          <a href="tel:+919000000000" className="btn-outline">📞 Call Now</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16">
          {[["150+", "Happy Clients"], ["400+", "Professional Staff"], ["99%", "Client Satisfaction"], ["24×7", "Support"]].map(
            ([num, label]) => (
              <div key={label}>
                <p className="text-gold font-serif text-3xl">{num}</p>
                <p className="text-white/70 text-sm">{label}</p>
              </div>
            )
          )}
        </div>
      </section>

      <ServicesIcons />

      <section className="section">
        <div className="wrap">
          <BackButton />
          <span className="eyebrow">Our Services</span>
          <h2 className="text-3xl md:text-4xl mt-3 mb-12 max-w-xl">Every service, held to the same standard</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="card p-6 h-full">
                  <h3 className="font-serif text-lg mb-2">{s.title}</h3>
                  <p className="text-muted text-sm">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StaffSection />

      <section className="section bg-cream">
        <div className="wrap card p-12 text-center bg-white">
          <h2 className="text-3xl mb-4">Want housekeeping for your property?</h2>
          <p className="text-muted max-w-lg mx-auto mb-8">
            Tell us about your hotel, office, hospital or residential property and we'll put together a plan and a quote.
          </p>
          <Link to="/collaborate" className="btn-primary">Request a Quote</Link>
        </div>
      </section>
    </div>
  );
}
