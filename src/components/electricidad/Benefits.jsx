import React from 'react';
import { Home, Building2, Truck, ShieldCheck, CreditCard, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: Home,
    title: 'Para Particulares',
    desc: 'Asesoramiento personalizado para cada proyecto del hogar. Le ayudamos a elegir los materiales adecuados con la mejor relación calidad-precio.',
    tag: 'Hogares',
  },
  {
    icon: Building2,
    title: 'Para Empresas y Constructoras',
    desc: 'Cuentas corporativas con condiciones especiales, presupuestos por volumen y seguimiento de obra dedicado para proyectos de cualquier escala.',
    tag: 'Corporativo',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    desc: 'Despacho ágil para Rosario y zona de influencia. Coordinamos entregas en obra para optimizar sus tiempos de proyecto.',
    tag: 'Logística',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía de Calidad',
    desc: 'Trabajamos exclusivamente con primeras marcas del mercado eléctrico nacional e importado. Todos los productos con garantía oficial.',
    tag: 'Calidad',
  },
  {
    icon: CreditCard,
    title: 'Facilidades de Pago',
    desc: 'Múltiples medios de pago, incluyendo transferencia bancaria, tarjetas de crédito y débito, y condiciones especiales para cuentas corrientes.',
    tag: 'Pagos',
  },
  {
    icon: Headphones,
    title: 'Soporte Técnico',
    desc: 'Equipo de asesores capacitados para resolver consultas técnicas y ayudarle a especificar correctamente sus materiales.',
    tag: 'Soporte',
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 lg:py-28 bg-background font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            ¿Por qué elegir Electricidad Total?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Soluciones integrales tanto para el hogar como para el sector profesional.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{b.title}</h3>
                    <span className="text-[10px] font-medium tracking-wider uppercase text-primary bg-accent px-2 py-0.5 rounded-full">
                      {b.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}