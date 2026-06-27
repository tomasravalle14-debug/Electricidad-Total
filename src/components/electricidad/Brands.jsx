import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Novalucce', logo: '/logos/novalucce.png' },
  { name: 'Jeluz', logo: '/logos/jeluz.png' },
  { name: 'Bright', logo: '/logos/bright.png' },
];

export default function Brands() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Nuestras Principales Marcas
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-24 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(var(--primary), 0.2)"
              }}
              className="bg-foreground/5 backdrop-blur-md rounded-2xl p-8 h-40 flex items-center justify-center border border-foreground/10 transition-colors hover:border-primary/50 group cursor-pointer"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Fallback text if image fails to load, otherwise the image is shown */}
                <img 
                  src={brand.logo} 
                  alt={`Logo de ${brand.name}`}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden text-2xl font-bold tracking-wider text-foreground/80 group-hover:text-primary transition-colors">
                  {brand.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
