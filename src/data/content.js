import htl1 from "../assets/htl-1.svg";
import htl2 from "../assets/htl-2.svg";
import htl3 from "../assets/htl-3.svg";
import htl4 from "../assets/htl-4.svg";
import htl5 from "../assets/gallery/gallery-room-2.jpg";
import htl6 from "../assets/gallery/gallery-room-1.jpg";
import blog1 from "../assets/blog-1.svg";
import blog2 from "../assets/blog-2.svg";
import blog3 from "../assets/blog-3.svg";
import heroHousekeeping from "../assets/hero-housekeeping.png";

import receptionPhoto from "../assets/hotel-photos/reception-1.jpg";
import lobbyCheckin from "../assets/hotel-photos/lobby-checkin.jpg";
import lobbyReception from "../assets/hotel-photos/lobby-reception.jpg";
import roomWarm from "../assets/hotel-photos/room-warm.jpg";
import roomNightView from "../assets/hotel-photos/room-night-view.jpg";
import corridorWarm from "../assets/hotel-photos/corridor-warm.jpg";
import corridorGold from "../assets/hotel-photos/corridor-gold.jpg";
import bathroomTub from "../assets/hotel-photos/bathroom-tub.jpg";
import exteriorNight from "../assets/hotel-photos/exterior-night.jpg";
import exteriorPoolDusk from "../assets/hotel-photos/exterior-pool-dusk.jpg";
import exteriorLumina from "../assets/hotel-photos/exterior-lumina.jpg";
import lobbyBar from "../assets/hotel-photos/lobby-bar.jpg";
import exteriorVantella from "../assets/hotel-photos/exterior-vantella.jpg";

export const hotelImageMap = {
  "htl-1": htl1,
  "htl-2": htl2,
  "htl-3": htl3,
  "htl-4": htl4,
  "htl-5": htl5,
  "htl-6": htl6,
  "htl-7": exteriorVantella,
  "htl-8": exteriorLumina,
  "htl-9": exteriorNight,
};

// A few extra photos per hotel for the gallery strip on the hotel detail page.
// Falls back to just hotelImageMap's single cover when a hotel has no entry here.
export const hotelGalleryMap = {
  "htl-1": [htl1, roomWarm, corridorWarm],
  "htl-2": [htl2, exteriorPoolDusk, lobbyBar],
  "htl-3": [htl3, corridorGold, bathroomTub],
  "htl-4": [htl4, lobbyCheckin, roomNightView],
  "htl-5": [htl5, exteriorNight, receptionPhoto],
  "htl-6": [htl6, lobbyReception, corridorWarm],
  "htl-7": [exteriorVantella, lobbyBar, bathroomTub, corridorGold],
  "htl-8": [exteriorLumina, lobbyReception, roomNightView, corridorWarm],
  "htl-9": [exteriorNight, receptionPhoto, roomWarm, lobbyCheckin],
};

export const blogImageMap = {
  "blog-1": blog1,
  "blog-2": blog2,
  "blog-3": blog3,
};

export const servicesHeroImage = heroHousekeeping;

export const services = [
  {
    title: "Luxury Housekeeping",
    desc: "Daily and turnover housekeeping for partner hotels, corporate offices, hospitals, malls and premium residences — trained staff, consistent standards, every time.",
  },
  {
    title: "Verified Hotel Stays",
    desc: "Every property on Aveline Stays passes an in-person inspection before it's listed, and again twice a year after that.",
  },
  {
    title: "Concierge Booking",
    desc: "Real people on the other end of your booking — from room upgrades to late checkout, we handle the back-and-forth for you.",
  },
  {
    title: "Deep Cleaning & Turnover",
    desc: "Fast, thorough turnover cleaning between guests, with a documented checklist so every stay starts spotless.",
  },
  {
    title: "Corporate & Institutional Housekeeping",
    desc: "Ongoing housekeeping contracts for offices, hospitals and malls, staffed and supervised by Aveline's own teams.",
  },
  {
    title: "Loyalty & Rewards",
    desc: "A tiered loyalty ladder built on nights stayed, not money spent — perks unlock as you travel with us more often.",
  },
];

export const faqs = [
  {
    q: "How does Aveline Stays choose its partner hotels?",
    a: "Every property goes through a 12-point in-person inspection covering cleanliness, safety, water and power reliability, and guest-facing service, before it's approved and listed.",
  },
  {
    q: "Can I cancel or modify a booking?",
    a: "Yes — most bookings can be modified or cancelled free of charge up to 48 hours before check-in from your account's Booking History page. Non-refundable rates are marked clearly at checkout.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major credit and debit cards, PayPal, and UPI. All payments are processed securely at checkout.",
  },
  {
    q: "How do I join the loyalty programme?",
    a: "Every account is automatically enrolled. Your tier is based on nights stayed with Aveline partner hotels and updates automatically after each stay.",
  },
  {
    q: "How can my hotel list on Aveline Stays?",
    a: "Visit the Hotel Partners page and submit a collaboration request. Our partnerships team reviews every submission and schedules a property walkthrough within a few business days.",
  },
  {
    q: "Is my payment and personal information secure?",
    a: "Yes. Payment details are processed through encrypted, PCI-compliant channels and are never stored on our servers in plain text. See our Privacy Policy for full details.",
  },
];

export const testimonials = [
  {
    name: "Priya Nair",
    room: "Shoreline Bay Resort",
    text: "The housekeeping consistency is what sold me — every single stay felt as fresh as the first. Booking and check-in took minutes.",
    stars: 5,
  },
  {
    name: "Arjun Mehta",
    room: "Northgate Business Suites",
    text: "Booked for a work trip and the concierge team rearranged my room to a quieter floor within the hour. Small thing, but it mattered.",
    stars: 5,
  },
  {
    name: "Sara Fernandes",
    room: "The Pine Villa Retreat",
    text: "Exactly as photographed, which is rarer than it should be. The loyalty tier system is a nice touch too.",
    stars: 4,
  },
];

export const hotelPartnerLogos = [
  "Shoreline Bay Resort",
  "The Pine Villa Retreat",
  "Aveline Garden Residency",
  "Northgate Business Suites",
  "Lakeview Heritage Inn",
  "Harbourline Grand",
];

export const amenityOptions = [
  "Free Wi-Fi",
  "Breakfast Included",
  "Pool",
  "Spa",
  "Pet Friendly",
  "Beachfront",
  "Bar",
  "Gym",
  "Business Lounge",
  "Airport Shuttle",
  "Heritage Property",
  "Rooftop Cafe",
];

export const roomTypeOptions = [
  "Standard",
  "Classic",
  "Deluxe",
  "Suite",
  "Villa",
  "Sea View",
  "Penthouse",
  "Executive",
];
