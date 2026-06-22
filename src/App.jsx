import React, { useState, useEffect, useRef } from "react";
import {
  Car, Search, Phone, Mail, MapPin, Clock, Facebook, Instagram,
  MessageCircle, ChevronRight, ChevronDown, Gauge, Fuel, Calendar,
  Settings2, ShieldCheck, BadgeCheck, Handshake, FileCheck2, Wallet,
  Star, ArrowRight, Menu, X, Upload, CheckCircle2
} from "lucide-react";

const NAVY = "#0A0F0D";
const ORANGE = "#10B981";
const SILVER = "#9CA8A3";
const LIGHT = "#F4F7F5";

const cars = [
  { id: 1, make: "Toyota", model: "Corolla Altis", year: 2022, price: 6850000, mileage: 18000, fuel: "Petrol", trans: "Automatic", img: "https://images.unsplash.com/photo-1623869675184-cea38eef4ea7?q=80&w=900&auto=format&fit=crop" },
  { id: 2, make: "Honda", model: "Civic Oriel", year: 2021, price: 7250000, mileage: 31000, fuel: "Petrol", trans: "Automatic", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=900&auto=format&fit=crop" },
  { id: 3, make: "Suzuki", model: "Swift GLX", year: 2023, price: 4150000, mileage: 9000, fuel: "Petrol", trans: "Manual", img: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=900&auto=format&fit=crop" },
  { id: 4, make: "Toyota", model: "Yaris ATIV", year: 2020, price: 4650000, mileage: 42000, fuel: "Petrol", trans: "CVT", img: "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=900&auto=format&fit=crop" },
  { id: 5, make: "Kia", model: "Sportage", year: 2022, price: 9450000, mileage: 21000, fuel: "Petrol", trans: "Automatic", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=900&auto=format&fit=crop" },
  { id: 6, make: "Honda", model: "City Aspire", year: 2021, price: 5350000, mileage: 27000, fuel: "Petrol", trans: "CVT", img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=900&auto=format&fit=crop" },
  { id: 7, make: "Toyota", model: "Fortuner Sigma4", year: 2020, price: 14250000, mileage: 55000, fuel: "Diesel", trans: "Automatic", img: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=900&auto=format&fit=crop" },
  { id: 8, make: "Suzuki", model: "Alto VXL", year: 2023, price: 2950000, mileage: 6000, fuel: "Petrol", trans: "Manual", img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=900&auto=format&fit=crop" },
];

function fmtPKR(n) {
  return "PKR " + n.toLocaleString("en-PK");
}

function useCountUp(target, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame;
    const duration = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.floor(p * target));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);
  return val;
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Stat({ label, target, suffix = "" }) {
  const [ref, inView] = useInView();
  const val = useCountUp(target, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: ORANGE }}>
        {val.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-widest" style={{ color: SILVER }}>{label}</div>
    </div>
  );
}

function Button({ children, variant = "solid", onClick, className = "", icon: Icon }) {
  const base = "relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 active:scale-95 group";
  const styles =
    variant === "solid"
      ? { background: ORANGE, color: "#fff" }
      : variant === "outline"
      ? { background: "transparent", color: "#fff", border: `1px solid ${SILVER}` }
      : { background: NAVY, color: "#fff" };
  return (
    <button onClick={onClick} className={`${base} ${className} hover:-translate-y-0.5 hover:shadow-lg`} style={styles}>
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/20 skew-x-12" />
      {Icon && <Icon size={16} />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function CarCard({ car, onView }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border" style={{ borderColor: "#E2E8F0" }}>
      <div className="relative h-48 overflow-hidden">
        <img src={car.img} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold" style={{ background: ORANGE, color: "#fff" }}>{car.year}</div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg" style={{ color: NAVY }}>{car.make} {car.model}</h3>
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Gauge size={14} />{car.mileage.toLocaleString()} km</span>
          <span className="flex items-center gap-1"><Fuel size={14} />{car.fuel}</span>
          <span className="flex items-center gap-1"><Settings2 size={14} />{car.trans}</span>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "#E2E8F0" }}>
          <span className="font-extrabold" style={{ color: NAVY }}>{fmtPKR(car.price)}</span>
          <button onClick={() => onView(car)} className="text-sm font-semibold flex items-center gap-1 transition-colors" style={{ color: ORANGE }}>
            View <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "inventory", label: "Inventory" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,15,13,0.97)" : NAVY,
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => setPage("home")} className="flex items-center gap-2 text-white font-extrabold text-lg tracking-tight">
          <Car style={{ color: ORANGE }} /> LAHORE<span style={{ color: ORANGE }}>MOTORS</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className="relative text-sm font-medium py-2 text-white/85 hover:text-white transition-colors"
            >
              {l.label}
              <span
                className="absolute left-0 -bottom-0.5 h-0.5 transition-all duration-300"
                style={{ width: page === l.id ? "100%" : "0%", background: ORANGE }}
              />
            </button>
          ))}
          <Button variant="solid" onClick={() => setPage("contact")}>Sell Your Car</Button>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-4" style={{ background: "rgba(10,15,13,0.98)" }}>
          {links.map((l) => (
            <button key={l.id} onClick={() => { setPage(l.id); setOpen(false); }} className="text-left py-3 text-white/90 border-b border-white/10">
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ setPage }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  return (
    <div
      className="relative h-screen flex items-center overflow-hidden"
      style={{ background: NAVY }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
        alt="Premium car"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        style={{ transform: `scale(1.1) translate(${(mouse.x - 50) / 40}px, ${(mouse.y - 50) / 40}px)`, transition: "transform .2s ease-out" }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,15,13,0.4), ${NAVY} 95%)` }} />
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ORANGE}22, transparent 70%)`,
          left: `${mouse.x}%`, top: `${mouse.y}%`, transform: "translate(-50%,-50%)",
          transition: "left .3s ease-out, top .3s ease-out",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <p className="uppercase tracking-[0.3em] text-sm mb-4 animate-fadein" style={{ color: ORANGE }}>Lahore, Pakistan</p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white max-w-3xl leading-tight animate-fadein" style={{ animationDelay: ".1s" }}>
          Lahore's Trusted Car Buying &amp; Selling Partner
        </h1>
        <p className="mt-6 text-lg max-w-xl animate-fadein" style={{ color: SILVER, animationDelay: ".2s" }}>
          Quality vehicles, fair prices, and a hassle-free experience — from first inspection to final handshake.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-fadein" style={{ animationDelay: ".3s" }}>
          <Button onClick={() => setPage("inventory")} icon={Search}>Browse Inventory</Button>
          <Button variant="outline" onClick={() => setPage("contact")} icon={Handshake}>Sell Your Car</Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown />
      </div>
    </div>
  );
}

function Services() {
  const items = [
    { icon: Car, title: "Buy a Car", desc: "Hand-picked, inspected vehicles ready to drive away." },
    { icon: Handshake, title: "Sell Your Car", desc: "Get a fair, instant offer with no hidden deductions." },
    { icon: BadgeCheck, title: "Trade-In Service", desc: "Trade your current car toward your next one." },
    { icon: ShieldCheck, title: "Vehicle Inspection", desc: "150-point checks by certified technicians." },
    { icon: Wallet, title: "Car Financing", desc: "Flexible financing options through partner banks." },
    { icon: FileCheck2, title: "Vehicle Valuation", desc: "Accurate, market-based pricing in minutes." },
  ];
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <Reveal>
        <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: ORANGE }}>What we offer</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2" style={{ color: NAVY }}>Services built around trust</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.08}>
            <div className="p-6 rounded-xl border bg-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300" style={{ borderColor: "#E2E8F0" }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "#E6F5EE" }}>
                <it.icon style={{ color: ORANGE }} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: NAVY }}>{it.title}</h3>
              <p className="text-slate-500 text-sm mt-2">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    "Trusted Local Business", "Verified Vehicles", "Transparent Pricing",
    "Quick Documentation", "Customer-Focused Service", "Wide Selection of Cars",
  ];
  return (
    <section className="py-24 px-6" style={{ background: NAVY }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: ORANGE }}>Why choose us</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-white">Built on a decade of fair deals</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {items.map((t, i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-colors">
                <CheckCircle2 style={{ color: ORANGE }} size={20} />
                <span className="text-white/90 text-sm font-medium">{t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const sell = ["Submit Details", "Vehicle Inspection", "Receive Offer", "Instant Payment"];
  const buy = ["Browse Inventory", "Schedule Inspection", "Secure Financing", "Drive Away"];
  const Track = ({ title, steps }) => (
    <div>
      <h3 className="font-bold text-xl mb-6" style={{ color: NAVY }}>{title}</h3>
      <div className="space-y-6">
        {steps.map((s, i) => (
          <Reveal key={s} delay={i * 0.1} className="flex gap-4 items-start">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: ORANGE }}>{i + 1}</div>
              {i < steps.length - 1 && <div className="w-px h-10" style={{ background: SILVER }} />}
            </div>
            <span className="pt-1 font-medium" style={{ color: NAVY }}>{s}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <Reveal>
        <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: ORANGE }}>The process</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2" style={{ color: NAVY }}>How it works</h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-16 mt-12">
        <Track title="Selling a car" steps={sell} />
        <Track title="Buying a car" steps={buy} />
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Ahmed Raza", area: "DHA, Lahore", text: "Sold my Civic in two days, payment was instant and the price was fair." },
    { name: "Sana Tariq", area: "Johar Town", text: "The inspection report gave me total confidence before buying my Corolla." },
    { name: "Bilal Khan", area: "Gulberg", text: "Smooth paperwork, no pressure, and a great trade-in offer on my old car." },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-24 px-6" style={{ background: LIGHT }}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: ORANGE }}>From our customers</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2" style={{ color: NAVY }}>Trusted across Lahore</h2>
        <div className="mt-10 relative h-44">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="absolute inset-0 transition-all duration-700"
              style={{ opacity: idx === i ? 1 : 0, transform: idx === i ? "translateY(0)" : "translateY(10px)" }}
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={16} fill={ORANGE} stroke="none" />)}
              </div>
              <p className="text-slate-600 italic">"{r.text}"</p>
              <p className="mt-4 font-bold" style={{ color: NAVY }}>{r.name}</p>
              <p className="text-xs text-slate-400">{r.area}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className="w-2 h-2 rounded-full transition-all" style={{ background: idx === i ? ORANGE : SILVER }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ setPage }) {
  return (
    <section className="py-20 px-6 text-center" style={{ background: ORANGE }}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white max-w-2xl mx-auto">Ready to buy or sell your next car?</h2>
      <p className="text-white/90 mt-3">Talk to our Lahore team today — no obligation, no pressure.</p>
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <button onClick={() => setPage("contact")} className="px-6 py-3 rounded-md font-semibold bg-white hover:-translate-y-0.5 transition-transform" style={{ color: ORANGE }}>Contact Us</button>
        <button onClick={() => setPage("inventory")} className="px-6 py-3 rounded-md font-semibold border border-white text-white hover:bg-white/10 transition-colors">View Inventory</button>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="py-12 px-6" style={{ background: NAVY }}>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-white/70 text-sm">
        <div>
          <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-3">
            <Car style={{ color: ORANGE }} /> LAHORE<span style={{ color: ORANGE }}>MOTORS</span>
          </div>
          <p>Lahore's independent dealership for fair, transparent car buying and selling.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick links</h4>
          <div className="flex flex-col gap-2">
            {["home", "about", "inventory", "contact"].map((p) => (
              <button key={p} onClick={() => setPage(p)} className="text-left hover:text-white transition-colors capitalize">{p}</button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="flex items-center gap-2 mb-2"><MapPin size={14} /> 45-C Gulberg III, Lahore</p>
          <p className="flex items-center gap-2 mb-2"><Phone size={14} /> +92 300 1234567</p>
          <p className="flex items-center gap-2"><Mail size={14} /> info@lahoremotors.pk</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow us</h4>
          <div className="flex gap-3">
            <Facebook size={18} className="hover:text-white cursor-pointer" />
            <Instagram size={18} className="hover:text-white cursor-pointer" />
            <MessageCircle size={18} className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
      <p className="text-center text-white/40 text-xs mt-10">© 2026 Lahore Motors. All rights reserved.</p>
    </footer>
  );
}

function HomePage({ setPage, onViewCar }) {
  return (
    <>
      <Hero setPage={setPage} />
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: ORANGE }}>Hand-picked stock</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2" style={{ color: NAVY }}>Featured cars</h2>
          </div>
          <button onClick={() => setPage("inventory")} className="text-sm font-semibold flex items-center gap-1" style={{ color: ORANGE }}>
            View all inventory <ChevronRight size={16} />
          </button>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {cars.slice(0, 8).map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <CarCard car={c} onView={onViewCar} />
            </Reveal>
          ))}
        </div>
      </section>
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTASection setPage={setPage} />
    </>
  );
}

function AboutPage() {
  return (
    <div className="pt-16">
      <div className="py-20 px-6 text-center" style={{ background: NAVY }}>
        <p className="uppercase tracking-widest text-sm" style={{ color: ORANGE }}>About us</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">A decade of honest deals in Lahore</h1>
      </div>
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>Our story</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Lahore Motors began as a small family lot in Gulberg, helping neighbors buy and sell cars without the
            guesswork. Today we serve customers across Lahore, from DHA to Johar Town, with the same promise: a fair
            price, a clean inspection, and paperwork that's done right the first time.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-2xl font-bold" style={{ color: NAVY }}>Mission &amp; vision</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong style={{ color: NAVY }}>Mission:</strong> deliver honest, transparent, and reliable automotive
            services to every customer who walks through our doors.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            <strong style={{ color: NAVY }}>Vision:</strong> to become one of Lahore's most trusted independent car
            dealerships.
          </p>
        </Reveal>
      </section>
      <section className="py-16 px-6" style={{ background: NAVY }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat label="Cars sold" target={3200} suffix="+" />
          <Stat label="Cars purchased" target={2800} suffix="+" />
          <Stat label="Happy customers" target={5400} suffix="+" />
          <Stat label="Years of experience" target={11} />
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <h2 className="text-2xl font-bold text-center" style={{ color: NAVY }}>Our core values</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            { icon: ShieldCheck, t: "Honesty" }, { icon: FileCheck2, t: "Transparency" },
            { icon: Star, t: "Customer satisfaction" }, { icon: BadgeCheck, t: "Reliability" },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08}>
              <div className="text-center p-6 rounded-xl border" style={{ borderColor: "#E2E8F0" }}>
                <v.icon className="mx-auto mb-3" style={{ color: ORANGE }} />
                <p className="font-semibold" style={{ color: NAVY }}>{v.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <h2 className="text-2xl font-bold text-center" style={{ color: NAVY }}>Meet the team</h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-8 mt-10">
          {[
            { n: "Usman Sheikh", r: "Founder & Director" },
            { n: "Hira Malik", r: "Sales Manager" },
            { n: "Fahad Aslam", r: "Inspection Lead" },
          ].map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4" style={{ background: SILVER }} />
              <p className="font-bold" style={{ color: NAVY }}>{p.n}</p>
              <p className="text-sm text-slate-500">{p.r}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function InventoryPage({ onViewCar }) {
  const [make, setMake] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [trans, setTrans] = useState("All");
  const [maxPrice, setMaxPrice] = useState(15000000);

  const makes = ["All", ...new Set(cars.map((c) => c.make))];
  const fuels = ["All", ...new Set(cars.map((c) => c.fuel))];
  const transes = ["All", ...new Set(cars.map((c) => c.trans))];

  const filtered = cars.filter(
    (c) =>
      (make === "All" || c.make === make) &&
      (fuel === "All" || c.fuel === fuel) &&
      (trans === "All" || c.trans === trans) &&
      c.price <= maxPrice
  );

  return (
    <div className="pt-16">
      <div className="py-16 px-6 text-center" style={{ background: NAVY }}>
        <p className="uppercase tracking-widest text-sm" style={{ color: ORANGE }}>Inventory</p>
        <h1 className="text-4xl font-extrabold text-white mt-3">Browse our current stock</h1>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-xl bg-white shadow-md border" style={{ borderColor: "#E2E8F0" }}>
          <select value={make} onChange={(e) => setMake(e.target.value)} className="border rounded-md px-3 py-2 text-sm" style={{ borderColor: SILVER }}>
            {makes.map((m) => <option key={m}>{m}</option>)}
          </select>
          <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="border rounded-md px-3 py-2 text-sm" style={{ borderColor: SILVER }}>
            {fuels.map((m) => <option key={m}>{m}</option>)}
          </select>
          <select value={trans} onChange={(e) => setTrans(e.target.value)} className="border rounded-md px-3 py-2 text-sm" style={{ borderColor: SILVER }}>
            {transes.map((m) => <option key={m}>{m}</option>)}
          </select>
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Max price: {fmtPKR(maxPrice)}</label>
            <input type="range" min="2000000" max="15000000" step="250000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </div>
        </div>

        <p className="text-sm text-slate-500 mt-6">{filtered.length} vehicles found</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filtered.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <CarCard car={c} onView={onViewCar} />
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-slate-400 py-12">No vehicles match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function CarModal({ car, onClose }) {
  if (!car) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(10,15,13,0.75)" }} onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-64">
          <img src={car.img} alt="" className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"><X size={18} /></button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-extrabold" style={{ color: NAVY }}>{car.make} {car.model}</h2>
          <p className="font-bold text-xl mt-1" style={{ color: ORANGE }}>{fmtPKR(car.price)}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm">
            <div><Calendar size={16} className="mb-1" style={{ color: ORANGE }} /><p className="text-slate-400">Year</p><p className="font-semibold">{car.year}</p></div>
            <div><Gauge size={16} className="mb-1" style={{ color: ORANGE }} /><p className="text-slate-400">Mileage</p><p className="font-semibold">{car.mileage.toLocaleString()} km</p></div>
            <div><Fuel size={16} className="mb-1" style={{ color: ORANGE }} /><p className="text-slate-400">Fuel</p><p className="font-semibold">{car.fuel}</p></div>
            <div><Settings2 size={16} className="mb-1" style={{ color: ORANGE }} /><p className="text-slate-400">Transmission</p><p className="font-semibold">{car.trans}</p></div>
          </div>
          <p className="mt-6 text-slate-600 text-sm leading-relaxed">
            This {car.year} {car.make} {car.model} has passed our 150-point inspection and comes with verified
            documentation, ready for immediate transfer.
          </p>
          <Button className="mt-6 w-full" icon={Phone}>Contact Dealer</Button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text", ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium" style={{ color: NAVY }}>{label}</span>
      <input type={type} className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2" style={{ borderColor: SILVER }} {...props} />
    </label>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sellSent, setSellSent] = useState(false);
  return (
    <div className="pt-16">
      <div className="py-16 px-6 text-center" style={{ background: NAVY }}>
        <p className="uppercase tracking-widest text-sm" style={{ color: ORANGE }}>Get in touch</p>
        <h1 className="text-4xl font-extrabold text-white mt-3">We're here to help</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">
        <div className="space-y-6">
          <div className="p-6 rounded-xl border bg-white" style={{ borderColor: "#E2E8F0" }}>
            <h3 className="font-bold mb-4" style={{ color: NAVY }}>Visit us</h3>
            <p className="flex items-start gap-2 text-sm text-slate-600 mb-3"><MapPin size={16} style={{ color: ORANGE }} className="mt-0.5" /> 45-C Gulberg III, Lahore, Pakistan</p>
            <p className="flex items-start gap-2 text-sm text-slate-600 mb-3"><Phone size={16} style={{ color: ORANGE }} className="mt-0.5" /> +92 300 1234567</p>
            <p className="flex items-start gap-2 text-sm text-slate-600 mb-3"><Mail size={16} style={{ color: ORANGE }} className="mt-0.5" /> info@lahoremotors.pk</p>
            <p className="flex items-start gap-2 text-sm text-slate-600"><Clock size={16} style={{ color: ORANGE }} className="mt-0.5" /> Mon–Sat, 10am–8pm</p>
          </div>
          <div className="p-6 rounded-xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
            <iframe
              title="Map"
              className="w-full h-48 rounded-md"
              src="https://www.google.com/maps?q=Gulberg+III+Lahore&output=embed"
              loading="lazy"
            />
          </div>
          <div className="flex gap-3">
            <Facebook className="cursor-pointer" style={{ color: NAVY }} />
            <Instagram className="cursor-pointer" style={{ color: NAVY }} />
            <MessageCircle className="cursor-pointer" style={{ color: NAVY }} />
          </div>
        </div>

        <div className="p-6 rounded-xl border bg-white" style={{ borderColor: "#E2E8F0" }}>
          <h3 className="font-bold mb-4" style={{ color: NAVY }}>Send us a message</h3>
          {sent ? (
            <p className="text-sm flex items-center gap-2" style={{ color: ORANGE }}><CheckCircle2 size={18} /> Thanks! We'll be in touch shortly.</p>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <Input label="Full name" required />
              <Input label="Phone number" required />
              <Input label="Email" type="email" required />
              <Input label="Subject" />
              <label className="block">
                <span className="text-sm font-medium" style={{ color: NAVY }}>Message</span>
                <textarea rows={4} required className="mt-1 w-full border rounded-md px-3 py-2 text-sm" style={{ borderColor: SILVER }} />
              </label>
              <Button className="w-full">Send message</Button>
            </form>
          )}
        </div>

        <div className="p-6 rounded-xl border bg-white" style={{ borderColor: "#E2E8F0" }}>
          <h3 className="font-bold mb-4" style={{ color: NAVY }}>Sell your car</h3>
          {sellSent ? (
            <p className="text-sm flex items-center gap-2" style={{ color: ORANGE }}><CheckCircle2 size={18} /> Got it! We'll send a valuation soon.</p>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSellSent(true); }}>
              <Input label="Car make" required />
              <Input label="Model" required />
              <Input label="Year" type="number" required />
              <Input label="Mileage (km)" type="number" required />
              <Input label="Expected price (PKR)" type="number" />
              <label className="flex items-center justify-center gap-2 border rounded-md px-3 py-4 text-sm text-slate-500 cursor-pointer" style={{ borderColor: SILVER }}>
                <Upload size={16} /> Upload photos
                <input type="file" multiple className="hidden" />
              </label>
              <Button className="w-full">Submit details</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DealershipSite() {
  const [page, setPage] = useState("home");
  const [activeCar, setActiveCar] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", background: "#FFFFFF", color: NAVY }}>
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadein { animation: fadein .8s ease both; }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .animate-bounce { animation: bounce 2s infinite; }
        input[type=range] { accent-color: ${ORANGE}; }
      `}</style>
      <Navbar page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} onViewCar={setActiveCar} />}
      {page === "about" && <AboutPage />}
      {page === "inventory" && <InventoryPage onViewCar={setActiveCar} />}
      {page === "contact" && <ContactPage />}
      <Footer setPage={setPage} />
      <CarModal car={activeCar} onClose={() => setActiveCar(null)} />
    </div>
  );
}
