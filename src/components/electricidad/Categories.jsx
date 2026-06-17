import React from 'react';
import { ArrowRight, Lightbulb, Cable } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Categories({ lightingImage, electricalImage }) {
  const navigate = useNavigate();

  const categories = [
    {
      icon: Lightbulb,
      title: 'Iluminación',
      desc: 'LED, lámparas, artefactos de techo, spots empotrables y soluciones de iluminación decorativa y funcional.',
      image: lightingImage,
    },
    {
      icon: Cable,
      title: 'Materiales Eléctricos',
      desc: 'Cables, tableros, llaves térmicas, cajas PVC, módulos USB y todo lo necesario para instalaciones eléctricas.',
      image: electricalImage,
    },
  ];

  return (
    <section id="categorias" className="py-20 lg:py-28 bg-background font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Categorías Principales
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Dos grandes áreas para cubrir todas sus necesidades eléctricas y de iluminación.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => navigate(`/?categoria=${encodeURIComponent(cat.title)}`)}
            >
              <div className="aspect-[3/2] relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white">{cat.title}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-sm">{cat.desc}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                  Ver productos <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}