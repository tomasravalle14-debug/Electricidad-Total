import React, { useState } from 'react';
import { Send, Building2, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: '',
    details: '',
  });
  const [sending, setSending] = useState(false);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Build WhatsApp message with form data
    const message = `Solicitud de Presupuesto\n\nNombre: ${form.name}\nEmpresa: ${form.company || 'N/A'}\nEmail: ${form.email}\nTeléfono: ${form.phone}\nTipo: ${form.type}\n\nDetalle:\n${form.details}`;

    window.open(
      `https://wa.me/543415665882?text=${encodeURIComponent(message)}`,
      '_blank'
    );

    toast.success('Solicitud enviada. Se abrirá WhatsApp para completar la consulta.');
    setSending(false);
    setForm({ name: '', company: '', email: '', phone: '', type: '', details: '' });
  };

  return (
    <section id="presupuestos" className="py-20 lg:py-28 bg-muted/30 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/20 mb-6">
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">
                Presupuestos sin cargo
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Solicite su presupuesto
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Complete el formulario con los datos de su proyecto y nuestro equipo comercial
              se comunicará dentro de las 24 horas hábiles.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                <Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Cuentas Corporativas</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Presupuestos especiales para obras y proyectos de gran escala. Adjunte su pliego de materiales para una cotización precisa.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-background rounded-2xl border border-border p-6 lg:p-8 shadow-sm space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nombre completo</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">Empresa (opcional)</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Constructora ABC"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="correo@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Teléfono</Label>
                  <Input
                    id="phone"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+54 341 ..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo de consulta</Label>
                <Select value={form.type} onValueChange={(v) => handleChange('type', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="particular">Proyecto particular / Hogar</SelectItem>
                    <SelectItem value="empresa">Empresa / Constructora</SelectItem>
                    <SelectItem value="reventa">Reventa / Distribución</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details" className="text-sm font-medium">
                  Detalle de materiales o pliego
                </Label>
                <Textarea
                  id="details"
                  required
                  value={form.details}
                  onChange={(e) => handleChange('details', e.target.value)}
                  placeholder="Describa los materiales que necesita, cantidades aproximadas y cualquier especificación técnica relevante..."
                  className="min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-primary hover:bg-secondary text-primary-foreground gap-2 text-base py-5"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Enviando...' : 'Enviar Solicitud de Presupuesto'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}