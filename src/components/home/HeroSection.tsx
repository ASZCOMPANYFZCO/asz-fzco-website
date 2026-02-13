"use client";

import Link from "next/link";
import { ArrowRight, Globe, Shield, Boxes } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* --------------------------------------------------------
   Global Trade Network Visual
   Represents ASZ's role connecting producers and buyers
   across continents — nodes with animated connection lines.
   -------------------------------------------------------- */

/* Trade route nodes — positioned like a world map abstraction */
const NODES = [
  { id: "dubai", x: 52, y: 42, label: "Dubai HQ", primary: true, delay: 0.8 },
  { id: "london", x: 38, y: 22, label: "Europe", primary: false, delay: 1.0 },
  { id: "mumbai", x: 60, y: 48, label: "South Asia", primary: false, delay: 1.1 },
  { id: "beijing", x: 72, y: 28, label: "East Asia", primary: false, delay: 1.2 },
  { id: "joburg", x: 44, y: 72, label: "Africa", primary: false, delay: 1.3 },
  { id: "saopaulo", x: 22, y: 62, label: "Americas", primary: false, delay: 1.4 },
  { id: "istanbul", x: 44, y: 32, label: "Türkiye", primary: false, delay: 1.15 },
];

/* Lines connecting Dubai to each region */
const ROUTES = NODES.filter((n) => !n.primary).map((node, i) => ({
  from: NODES[0], // Dubai
  to: node,
  delay: 1.5 + i * 0.15,
}));

function TradeNetworkVisual() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative w-[360px] h-[400px] sm:w-[420px] sm:h-[460px] lg:w-[500px] lg:h-[500px]"
    >
      {/* Subtle circular background — represents the globe */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute inset-4 rounded-full border border-[var(--color-border)] opacity-40"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute inset-12 rounded-full border border-[var(--color-border)] opacity-20"
      />

      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {ROUTES.map((route, i) => (
          <motion.line
            key={i}
            x1={route.from.x}
            y1={route.from.y}
            x2={route.to.x}
            y2={route.to.y}
            stroke="var(--color-accent)"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              duration: 1,
              delay: route.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      {/* Animated pulse traveling along routes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {ROUTES.map((route, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="0.6"
            fill="var(--color-accent)"
            initial={{ opacity: 0 }}
            animate={{
              cx: [route.from.x, route.to.x],
              cy: [route.from.y, route.to.y],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + i * 0.4,
              delay: route.delay + 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {NODES.map((node) => (
        <motion.div
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: node.delay,
            ease: "easeOut",
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.primary ? (
            /* Dubai HQ — larger, accented */
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-3 rounded-full bg-[var(--color-accent)]/20"
              />
              <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-bg-primary)] shadow-md" />
              <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="px-2.5 py-1 rounded-md bg-[var(--color-accent)] text-white text-[10px] font-semibold shadow-md">
                  {node.label}
                </span>
              </div>
            </div>
          ) : (
            /* Other nodes — smaller, subtle */
            <div className="relative group">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]/50 border border-[var(--color-accent)]/30" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-70">
                <span className="text-[9px] font-medium text-[var(--color-text-muted)]">
                  {node.label}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {/* Floating product category cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute top-2 right-0 sm:top-4 sm:right-2"
      >
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-primary)]/95 backdrop-blur-md border border-[var(--color-border)] shadow-md"
        >
          <Boxes className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          <span className="text-[11px] font-semibold text-[var(--color-text-primary)]">
            Ferro Alloys
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
        className="absolute bottom-20 -left-2 sm:bottom-24 sm:left-0"
      >
        <motion.div
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-primary)]/95 backdrop-blur-md border border-[var(--color-border)] shadow-md"
        >
          <Shield className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          <span className="text-[11px] font-semibold text-[var(--color-text-primary)]">
            Noble Alloys
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="absolute bottom-6 right-2 sm:bottom-8 sm:right-6"
      >
        <motion.div
          animate={{ y: [-2, 4, -2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-primary)]/95 backdrop-blur-md border border-[var(--color-border)] shadow-md"
        >
          <Globe className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          <span className="text-[11px] font-semibold text-[var(--color-text-primary)]">
            Minor Metals
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)]"
      />

      {/* Decorative layer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Parallax gradient orbs */}
        <motion.div
          style={{ y: orb1Y }}
          className="absolute top-1/4 -left-1/4 w-[400px] sm:w-[550px] lg:w-[700px] h-[400px] sm:h-[550px] lg:h-[700px] rounded-full bg-[var(--color-accent)]/5 blur-[100px]"
        />
        <motion.div
          style={{ y: orb2Y }}
          className="absolute bottom-1/4 -right-1/4 w-[350px] sm:w-[500px] lg:w-[650px] h-[350px] sm:h-[500px] lg:h-[650px] rounded-full bg-[var(--color-accent)]/6 blur-[80px]"
        />

        {/* Subtle accent lines */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/10 to-transparent origin-left"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="container-custom relative z-10 py-20"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          {/* Left — copy */}
          <motion.div
            className="flex-1 max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent-light)] text-[var(--color-accent)] text-xs sm:text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                Built on Industry Experience
              </div>
            </motion.div>

            {/* Main Headline — no gradient, clean solid colour */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--color-text-primary)] leading-[1.1] mb-6"
            >
              International{" "}
              <span className="text-[var(--color-accent)]">
                Noble &amp; Ferro
              </span>
              <br />
              Alloy Trading
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-xl mb-8"
            >
              Delivering premium metals and alloys to global markets with
              reliability, transparency, and competitive value from Dubai.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Get a Quote
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators — bolder, cleaner */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-[var(--color-border)]"
            >
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-[var(--color-accent)] leading-none">
                    30+
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
                    Countries Supplied
                  </p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-[var(--color-accent)] leading-none">
                    500+
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
                    Shipments Delivered
                  </p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-[var(--color-accent)] leading-none">
                    24
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
                    Products Traded
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — global trade network visual */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <TradeNetworkVisual />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[var(--color-text-muted)] p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-[var(--color-text-muted)] mx-auto animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
