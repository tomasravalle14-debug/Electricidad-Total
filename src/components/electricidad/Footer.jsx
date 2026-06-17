import React from 'react';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Catálogo', to: '/' },
  { label: 'Categorías', to: '/categorias' },
  { label: 'Beneficios', to: '/beneficios' },
  { label: 'Presupuestos', to: '/presupuestos' },
];

export default function Footer({ logoUrl }) {
  return (
    <footer className="bg-[#0a1628] text-white/80 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              {logoUrl ? (
                <img src={logoUrl} alt="Electricidad Total" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg leading-none">e</span>
                </div>
              )}
              <div className="leading-tight">
                <span className="font-bold text-sm tracking-wide text-white">ELECTRICIDAD TOTAL</span>
                <span className="block text-[10px] tracking-wider text-[#2BA8E0]">
                  Materiales Eléctricos + Iluminación
                </span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Proveemos materiales eléctricos y soluciones de iluminación de primera calidad en Rosario.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-[#2BA8E0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-[#2BA8E0] shrink-0" />
                Cafferatta 1660, Rosario
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Phone className="w-4 h-4 text-[#2BA8E0] shrink-0" />
                +54 341 566-5882
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Mail className="w-4 h-4 text-[#2BA8E0] shrink-0" />
                info@electricidadtotal.com
              </li>
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">
              Redes Sociales
            </h4>
            <a
              href="https://instagram.com/electricidadtotal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#2BA8E0] transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @electricidadtotal
            </a>

            <div className="mt-8">
              <h4 className="font-semibold text-white text-sm mb-3 tracking-wide uppercase">
                Legal
              </h4>
              <ul className="space-y-2 text-xs text-white/40">
                <li><button className="hover:text-white/60 transition-colors">Política de Privacidad</button></li>
                <li><button className="hover:text-white/60 transition-colors">Términos y Condiciones</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs text-white/30 text-center">
            © {new Date().getFullYear()} Electricidad Total. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}