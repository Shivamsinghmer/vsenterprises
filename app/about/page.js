"use client";
import {
  ShieldCheck, Users2, Globe2, CheckCircle2,
  ArrowRight, Truck, Headphones, Zap,
  Factory, Sparkles, Star, Building2, Package, Award,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";

/* ── static data ─────────────────────────────────────── */
const stats = [
  { value: "10K+", label: "Clients Served" },
  { value: "5K+", label: "Products" },
  { value: "10+", label: "Years" },
  { value: "100+", label: "Cities" },
];

const products = [
  { emoji: "🔩", name: "Fasteners", desc: "Hex Bolts · Hex Nuts · Plain & Spring Washers · Stud Bolts" },
  { emoji: "⚡", name: "Electrical Cables", desc: "PTFE Cable · Pig Tail Wire · Armoured · Instrumentation" },
  { emoji: "🔌", name: "Connectors & Terminals", desc: "Seal Wedge · Terminal Blocks · End Caps · Cable Connectors" },
];

const values = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Certified Quality", desc: "IS/DIN/BSW compliant. Every product passes rigorous checks before leaving our warehouse." },
  { icon: <Users2 className="w-5 h-5" />, title: "Client-First", desc: "We work with procurement teams to meet bulk timelines precisely and without compromise." },
  { icon: <Globe2 className="w-5 h-5" />, title: "Wide Network", desc: "Direct ties with verified manufacturers ensure consistent availability and fair pricing." },
  { icon: <CheckCircle2 className="w-5 h-5" />, title: "100% Genuine", desc: "No counterfeits. Every bolt, cable, and connector comes with full quality documentation." },
];

const promises = [
  { icon: <Truck className="w-5 h-5" />, title: "Bulk Delivery", desc: "On-time, industrial-grade packaged dispatches." },
  { icon: <Headphones className="w-5 h-5" />, title: "Expert Support", desc: "We help you pick the right grade, size & spec." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Mill Certificates", desc: "Quality compliance docs with every shipment." },
  { icon: <Zap className="w-5 h-5" />, title: "Custom Sourcing", desc: "We source specific materials & grades on demand." },
];

/* ── animation helpers ───────────────────────────────── */
const containerAnim = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 28 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 28 } }
};

/* ── page ────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* ─── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Abstract shapes & grid */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div aria-hidden className="absolute -top-40 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div aria-hidden className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative container mx-auto px-6 lg:px-8 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-8 shadow-sm"
          >
            <Factory className="w-4 h-4" /> VS Enterprises
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.15] mb-6"
          >
            Industrial Hardware &amp;<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Electrical Components</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Trusted supplier of fasteners, cables, connectors, and specialty components —
            quality-certified and delivered across India for over a decade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/categories" className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1">
              Browse Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-muted bg-background px-8 py-4 text-base font-semibold text-foreground hover:border-primary/30 hover:bg-muted/30 transition-all duration-300">
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────── */}
      <section className="relative z-10 -mt-10 mb-16 md:mb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={containerAnim}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={itemUp}
                className="flex flex-col items-center justify-center py-8 px-4 rounded-3xl bg-background border border-border/50 shadow-xl shadow-black/[0.03] backdrop-blur-sm"
              >
                <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60 mb-1">{s.value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── STORY ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slideInLeft} className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                <span className="w-8 h-px bg-primary" /> Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
                A Decade of <br /><span className="italic font-medium text-muted-foreground">Industrial Excellence</span>
              </h2>
              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed pt-2">
                <p>Founded in Kanpur, Uttar Pradesh, VS Enterprises began as a local hardware distributor with one clear goal — supply industries with reliable, certified components they could count on, every time.</p>
                <p>Over 10 years, we've built deep partnerships with manufacturers. Our knowledge lets us serve oil &amp; gas, power plants, construction, and heavy manufacturing with equal confidence.</p>
                <p>Our catalogue spans thousands of SKUs: <strong className="text-foreground font-semibold">stainless steel hex bolts, hex nuts, PTFE cables, seal wedge connectors, and end caps</strong> — all backed by full quality documentation.</p>
              </div>
              <Link href="/categories" className="group inline-flex items-center gap-2 text-base font-semibold text-primary pt-4 hover:opacity-80 transition-all">
                View Product Catalogue
                <span className="bg-primary/10 p-2 rounded-full group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slideInRight} className="grid grid-cols-2 gap-4">
              {/* big card */}
              <div className="col-span-2 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex flex-col items-center justify-center py-12 px-6 text-center transform hover:scale-[1.02] transition-transform duration-500">
                <span className="text-6xl md:text-7xl font-bold text-primary mb-2">10+</span>
                <span className="text-sm font-semibold text-foreground uppercase tracking-widest">Years in Industrial Supply</span>
              </div>
              {/* HQ */}
              <div className="rounded-[2rem] bg-muted/40 border border-border/80 p-6 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="p-3 bg-background rounded-2xl shadow-sm">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Headquartered</p>
                  <p className="text-sm text-muted-foreground mt-1">Kanpur, Uttar Pradesh</p>
                </div>
              </div>
              {/* rating */}
              <div className="rounded-[2rem] bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/50 p-6 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex gap-1 bg-white dark:bg-black p-2 rounded-xl shadow-sm">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Trusted Supplier</p>
                  <p className="text-sm text-muted-foreground mt-1">ISO-compliant sourcing</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ──────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/30 border-y border-border/50 relative">
        <div aria-hidden className="absolute -left-40 top-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative">

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={itemUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Product Range</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              From structural fasteners to precision electrical components — all in one place.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={containerAnim} className="grid md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.div key={i} variants={itemUp} className="group">
                <Link href="/categories"
                  className="flex flex-col gap-6 p-8 rounded-[2rem] bg-background border border-border/60 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <span className="text-5xl filter drop-shadow-sm">{p.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{p.name}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES & PROMISES (Combined elegantly) ────── */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">

          <div className="mb-24">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={itemUp} className="mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Core Values</h2>
              <div className="w-20 h-1.5 bg-primary rounded-full" />
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerAnim} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div key={i} variants={itemUp} className="group p-6 rounded-[2rem] bg-muted/30 border border-transparent hover:border-border hover:bg-background transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={itemUp} className="mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Commitment</h2>
              <div className="w-20 h-1.5 bg-blue-500 rounded-full" />
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerAnim} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {promises.map((p, i) => (
                <motion.div key={i} variants={itemUp} className="flex flex-col items-start gap-4 p-6 rounded-[1.5rem] border-2 border-dashed border-border/60 hover:border-blue-500/40 hover:bg-blue-500/5 transition-colors duration-300">
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      {p.icon}
                    </div>
                    <h3 className="text-base font-bold text-foreground">{p.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="pb-20 md:pb-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-zinc-950 px-6 py-16 md:px-16 md:py-24 text-center border border-zinc-800 shadow-2xl"
          >
            {/* Dark theme aesthetics for CTA */}
            <div aria-hidden className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-luminosity" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />

            <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/30 blur-[120px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px]" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white uppercase tracking-widest shadow-xl">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> 10,000+ Industrial Clients
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Need Industrial Components? <br />
                <span className="text-zinc-400 font-medium">We've Got You Covered.</span>
              </h2>

              <p className="text-zinc-400 text-base md:text-xl font-medium">
                Hex bolts to PTFE cables — fast quotes, certified quality, and competitive bulk pricing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-zinc-950 shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/categories"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  Browse Catalogue
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
