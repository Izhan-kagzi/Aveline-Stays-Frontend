import React from "react";
import BackButton from "../components/BackButton.jsx";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect the information you provide directly — name, email, phone number, and payment details at checkout — along with booking history and preferences you save to your account, such as wishlisted hotels.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to process bookings, run loyalty rewards, send booking confirmations and deal notifications you've opted into, and improve the properties and services we recommend to you.",
  },
  {
    title: "Payment Information",
    body: "Card, PayPal, and UPI details are processed through encrypted, PCI-compliant payment channels. Aveline Stays does not store full card numbers on its own servers.",
  },
  {
    title: "Sharing With Hotel Partners",
    body: "We share only the booking details a partner hotel needs to honour your reservation — name, dates, room type, and guest count. Partner hotels do not receive your payment details.",
  },
  {
    title: "Cookies & Notifications",
    body: "We use cookies to keep you signed in and remember search filters. You can opt out of push notifications for deals and offers at any time from your account settings.",
  },
  {
    title: "Your Rights",
    body: "You can view, update, or delete your account information at any time from your profile, or by contacting privacy@avelinestays.com.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="pt-28 pb-24 px-6 md:px-10">
      <div className="wrap max-w-3xl">
        <BackButton />
        <span className="eyebrow">Legal</span>
        <h1 className="text-3xl md:text-4xl mt-3 mb-4">Privacy Policy</h1>
        <p className="text-muted mb-10">Last updated: July 2026</p>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-xl mb-2">{s.title}</h2>
              <p className="text-ink/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
