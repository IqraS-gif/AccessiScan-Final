import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import { ArrowRight, Sparkles, LayoutDashboard, Code2, Chrome, ScanLine, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import FeatureCard from '../components/ui/FeatureCard';
import DownloadCards from '../components/ui/DownloadCards';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Floating Particles
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20 blur-[1px]"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3
          }}
        />
      ))}
    </div>
  );
};

// Grid Background Effect
const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-base pointer-events-none">
      {/* Primary Grid Layer - Cyan colored and more opaque */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, #800020 1px, transparent 1px),
            linear-gradient(to bottom, #800020 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)'
        }}
      ></div>

      {/* Subtle theme-aligned glow instead of intense red */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <FloatingParticles />
    </div>
  );
};

export default function Landing() {
  const [demoScore, setDemoScore] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const { setTheme } = useThemeStore();

  const demoRef = useRef(null);
  const isDemoInView = useInView(demoRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Landing page always opens in light theme (Beige/Marrom aesthetic)
    setTheme('light');
  }, [setTheme]);

  useEffect(() => {
    if (isDemoInView) {
      setTimeout(() => setIsScanning(false), 2400); // Stop scan after 2.4s

      let start = 0;
      const target = 92; // Final visual score
      const duration = 2400;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(timer);
          setDemoScore(target);
        } else {
          setDemoScore(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isDemoInView]);

  return (
    <div className="min-h-screen text-main overflow-hidden font-sans selection:bg-primary/30 relative">

      {/* Animated Gradient Background & Particles */}
      <GridBackground />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between relative z-10 backdrop-blur-sm border-b border-white/5 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25 border border-white/10">
            <ScanLine className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-main tracking-tight drop-shadow-sm">AccessiScan<span className="text-primary">.ai</span></span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/auth"
            className="text-sm font-bold px-6 py-2.5 rounded-full border border-border-subtle bg-surface-deep/80 hover:bg-surface-hover hover:text-primary transition-all shadow-md text-main"
          >
            Sign In
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-32 text-center relative z-10">
        <motion.div
          initial="hidden" animate="visible" variants={staggerContainer}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeIn} whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary mb-8 text-sm font-bold shadow-[0_0_20px_rgba(108,99,255,0.2)] cursor-default">
            <Sparkles size={16} />
            <span>Advanced AI-Powered Web Accessibility Auditor</span>
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black text-primary mb-6 leading-tight drop-shadow-sm">
            AI-Powered <br className="hidden md:block" /> Accessibility Audits
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted mb-10 max-w-3xl leading-relaxed font-light">
            Scan, Fix, and Improve Web Accessibility Effortlessly. Automatically detect WCAG violations and instantly generate AI-driven remediation code payloads.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link
              to="/scan"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-slate-900 px-10 py-4 rounded-full font-black text-lg hover:shadow-[0_10px_40px_rgba(108,99,255,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
              Start Free Audit <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://youtu.be/BZ1RKHLO_F0"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-surface border border-border-subtle text-main px-10 py-4 rounded-full font-bold text-lg hover:bg-surface-hover hover:-translate-y-1 transition-all duration-300 backdrop-blur-md shadow-lg"
            >
              View Demo
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Demo Preview Section */}
      <section id="demo" ref={demoRef} className="container mx-auto px-6 pb-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Decorative glows behind dashboard mockup */}
          {/* Subtle theme-aligned shadow instead of intense multicolored glow */}
          <div className="absolute -inset-1 bg-primary/10 rounded-[2.5rem] blur-2xl opacity-20"></div>

          {/* Glassmorphic Dashboard Mockup */}
          <div className="relative bg-surface-deep backdrop-blur-2xl border border-border-subtle rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col min-h-[400px]">
            {/* Window header */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border-subtle bg-surface">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] cursor-pointer hover:bg-red-400 transition-colors"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] cursor-pointer hover:bg-yellow-400 transition-colors"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] cursor-pointer hover:bg-green-400 transition-colors"></div>
              </div>
              <div className="ml-4 flex-1 flex justify-center hidden sm:flex">
                <div className="bg-base rounded-xl px-5 py-2 text-xs text-muted font-mono w-72 text-center border border-border-subtle shadow-inner flex items-center justify-center gap-2">
                  <ShieldCheck size={14} className="text-secondary" />
                  https://app.accessiscan.ai/report
                </div>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
              {/* Score circle */}
              <div className="col-span-1 bg-surface rounded-3xl p-6 border border-border-subtle flex flex-col items-center justify-center relative overflow-hidden group shadow-lg">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-44 h-44 flex items-center justify-center mb-6">
                  <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible">
                    <circle cx="88" cy="88" r="72" className="stroke-primary/10" strokeWidth="12" fill="none" />
                    {/* SVG Arc length: 2*PI*72 ~ 452 */}
                    <motion.circle
                      cx="88" cy="88" r="72"
                      className="stroke-primary transition-colors duration-1000"
                      strokeWidth="12" fill="none"
                      strokeDasharray="452"
                      initial={{ strokeDashoffset: 452 }}
                      animate={isDemoInView ? { strokeDashoffset: 452 - (452 * (demoScore / 100)) } : { strokeDashoffset: 452 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-center flex flex-col items-center">
                    {isScanning ? (
                      <Loader2 className="animate-spin text-primary mb-1" size={32} />
                    ) : (
                      <span className="text-5xl font-black text-main drop-shadow-md">{demoScore}<span className="text-xl text-muted">%</span></span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-main mb-2">{isScanning ? 'Analyzing DOM...' : 'Accessibility Score'}</h3>
                <p className="text-sm text-muted font-medium">{isScanning ? 'Running heuristics loop' : 'Excellent compliance level'}</p>
              </div>

              {/* Fix suggestion card list */}
              <div className="col-span-1 md:col-span-2 flex flex-col justify-center gap-5">
                {[
                  { title: "Missing Alt Attributes", severity: "High", color: "text-accent", bg: "bg-accent/10 border-accent/20" },
                  { title: "Insufficient Color Contrast", severity: "Medium", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
                  { title: "Non-descriptive ARIA labels", severity: "Low", color: "text-primary", bg: "bg-primary/10 border-primary/20" }
                ].map((issue, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={isDemoInView && !isScanning ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ delay: idx * 0.15, type: 'spring' }}
                    key={idx}
                    className={`flex justify-between items-center p-5 bg-slate-900/60 rounded-2xl border hover:bg-slate-800 transition-all duration-300 shadow-md ${issue.bg}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-3 rounded-xl bg-slate-950 shadow-inner ${issue.color}`}>
                        <ShieldCheck size={24} />
                      </div>
                      <span className="font-bold text-main text-lg">{issue.title}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-bold px-4 py-2 rounded-lg text-center hidden sm:block bg-slate-800 ${issue.color} border border-slate-700 shadow-sm`}
                    >
                      Remediate
                    </motion.button>
                  </motion.div>
                ))}

                {/* Skeleton loaders while scanning */}
                {isScanning && [...Array(3)].map((_, idx) => (
                  <motion.div
                    key={`skel-${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-between items-center p-5 bg-slate-800/30 rounded-2xl border border-slate-700/30 animate-pulse"
                  >
                    <div className="flex items-center gap-5 w-full">
                      <div className="w-12 h-12 rounded-xl bg-slate-700/50"></div>
                      <div className="h-6 bg-slate-700/50 rounded-md w-1/2"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FeatureCards Grid using Styled Components */}
      <section className="container mx-auto px-6 pb-40 relative z-10">
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 drop-shadow-sm">Complete Audit Arsenal</h2>
            <p className="text-muted max-w-2xl mx-auto text-xl font-light">Everything you need to ship accessible web products, architected cleanly into a single interactive workflow.</p>
          </motion.div>
        </div>

        {/* 3 Download Cards */}
        <DownloadCards />

        {/* CSS GRID OF INTERACTIVE FLIP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 perspective-1000">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <FeatureCard
              title="URL Scanner"
              desc="Deep scan any webpage instantly. Analyzes the raw DOM tree, semantic structure mapping, and ARIA roles precisely."
              icon={LayoutDashboard}
              color="text-primary"
              gradient="#6C63FF"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <FeatureCard
              title="Chrome Ext."
              desc="Audit internal portals safely, strictly authenticated apps, and local localhost environments bypassing firewalls."
              icon={Chrome}
              color="text-secondary"
              gradient="#00E5FF"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <FeatureCard
              title="AI Remediation"
              desc="Stop guessing entirely. Get context-aware AI recommendations populated with copy-pasteable HTML/React fixes."
              icon={Zap}
              color="text-accent"
              gradient="#FF4D6D"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <FeatureCard
              title="Visual Engine"
              desc="See exactly where code issues are geometrically. Visual markers inject right over your frontend DOM elements dynamically."
              icon={Code2}
              color="text-emerald-400"
              gradient="#34d399"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-base relative z-20">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ScanLine className="text-primary" size={26} />
            <span className="text-xl font-bold text-main drop-shadow-sm">AccessiScan<span className="text-primary">.ai</span></span>
          </div>
          <div className="text-slate-500 font-medium text-sm">
            © 2026 AccessiScan AI Hackathon Project. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-primary hover:-translate-y-0.5 transition-all">Twitter</a>
            <a href="#" className="hover:text-primary hover:-translate-y-0.5 transition-all">GitHub</a>
            <a href="#" className="hover:text-primary hover:-translate-y-0.5 transition-all">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
