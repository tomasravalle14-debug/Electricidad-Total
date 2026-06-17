import React from 'react';
import { Lightbulb, LayoutGrid, ShoppingBag, Award, FileText, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  { icon: Lightbulb, label: 'Inicio', href: '#inicio' },
  { icon: LayoutGrid, label: 'Categorías', href: '#categorias' },
  { icon: ShoppingBag, label: 'Catálogo', href: '#catalogo' },
  { icon: Award, label: 'Beneficios', href: '#beneficios' },
  { icon: FileText, label: 'Presupuestos', href: '#presupuestos' },
  { icon: MapPin, label: 'Ubicación', href: '#ubicacion' },
];

export default function SectionIndex() {
  return (
    <section className="py-6 bg-muted/50 border-y border-border font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase shrink-0">
            Navegación
          </span>
          <div className="h-4 w-px bg-border shrink-0" />
          {sections.map((s, i) => (
            <motion.button
              key={s.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              onClick={() => document.querySelector(s.href)?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors shrink-0"
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}