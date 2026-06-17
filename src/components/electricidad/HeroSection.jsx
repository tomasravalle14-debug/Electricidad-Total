import React from 'react';
import { ArrowRight, MessageCircle, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Zap, value: '+5.000', label: 'Productos disponibles' },
  { icon: Shield, value: '+15', label: 'Años de experiencia' },
];

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100vh] flex items-center overflow-hidden font-inter"
      style={{ background: 'linear-gradient(135deg, #0d2137 0%, #1A6FA0 50%, #2BA8E0 100%)' }}
    >
      {/* Subtle geometric overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Right side decorative gradient blob */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #2BA8E0 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <Zap className="w-3.5 h-3.5 text-[#2BA8E0]" />
              <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
                Soluciones eléctricas profesionales
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Energía e iluminación
              <span className="block text-[#2BA8E0] mt-1">para cada proyecto</span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Proveemos materiales eléctricos y soluciones de iluminación de primera calidad
              para hogares, empresas y constructoras en Rosario y alrededores.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-[#2BA8E0] hover:bg-[#1A6FA0] text-white gap-2 text-base px-6"
                onClick={() => document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Catálogo
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 gap-2 text-base px-6 bg-transparent"
                asChild
              >
                <a href="https://wa.me/543415665882" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Consultar por WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 gap-8 max-w-md"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 text-[#2BA8E0] mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}