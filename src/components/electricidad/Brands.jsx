import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Novalucce', logo: '/logos/novalucce.png' },
  { name: 'Jeluz', logo: '/logos/jeluz.png' },
  { name: 'Bright', logo: '/logos/bright.png' },
];

export default function Brands() {
  return (
    <section className="py-14 border-y border-border bg-zinc-100 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-10"
        >
          Nuestras Principales Marcas
        </motion.p>

        {/* Logos en línea horizontal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-center justify-center w-44 h-20 group"
            >
              <img
                src={brand.logo}
                alt={`Logo de ${brand.name}`}
                className="max-w-full max-h-full object-contain
                           opacity-60 grayscale
                           group-hover:opacity-100 group-hover:grayscale-0
                           transition-all duration-400"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-lg font-bold text-zinc-600 dark:text-zinc-300 tracking-wider">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
