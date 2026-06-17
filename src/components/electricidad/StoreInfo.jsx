import React from 'react';
import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const hours = [
  { day: 'Lunes a Viernes', time: '9:00 - 12:30 | 13:30 - 18:00' },
  { day: 'Sábados', time: '8:00 - 12:00' },
];

export default function StoreInfo() {
  return (
    <section id="ubicacion" className="py-20 lg:py-28 bg-background font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Nuestro Local
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Visítenos en nuestro punto de venta en Rosario.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-border h-[360px] bg-muted"
          >
            <iframe
              title="Ubicación Electricidad Total"
              src="https://maps.google.com/maps?q=Cafferatta+1660,+Rosario,+Santa+Fe,+Argentina&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/50 border border-border">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Dirección</h3>
                <p className="text-sm text-muted-foreground">Cafferatta 1660, Rosario, Santa Fe, Argentina</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/50 border border-border">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Horarios de Atención</h3>
                <div className="space-y-1.5">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-medium text-foreground">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground block">Teléfono</span>
                  <a href="tel:+543415665882" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    +54 341 566-5882
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground block">WhatsApp</span>
                  <a href="https://wa.me/543415665882" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    +54 341 566-5882
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
