import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Catálogo', to: '/', hash: '#catalogo' },
  { label: 'Categorías', to: '/categorias' },
  { label: 'Beneficios', to: '/beneficios' },
  { label: 'Presupuestos', to: '/presupuestos' },
  { label: 'Ubicación', to: '/', hash: '#ubicacion' },
];

export default function Navbar({ logoUrl }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, setIsDrawerOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to hash when location changes
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }
    }
  }, [location]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  const handleClick = (link, e) => {
    setOpen(false);
    if (link.hash) {
      e.preventDefault();
      navigate('/' + link.hash);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-inter ${
      isTransparent
        ? 'bg-transparent'
        : 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt="Electricidad Total" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">e</span>
              </div>
            )}
            <div className="leading-tight">
              <span className={`font-bold text-sm tracking-wide ${isTransparent ? 'text-white' : 'text-foreground'}`}>
                ELECTRICIDAD TOTAL
              </span>
              <span className="block text-[10px] tracking-wider text-primary">
                Materiales Eléctricos + Iluminación
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to && !link.hash;
              return (
                <Link
                  key={link.label}
                  to={link.hash ? '/' + link.hash : link.to}
                  onClick={(e) => handleClick(link, e)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary bg-accent'
                      : isTransparent
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 rounded-full hover:bg-muted/50 transition-colors"
            >
              <ShoppingCart className={`w-5 h-5 ${isTransparent ? 'text-white' : 'text-foreground'}`} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <Button
              size="sm"
              className="hidden sm:flex bg-primary hover:bg-secondary text-primary-foreground gap-2"
              asChild
            >
              <Link to="/presupuestos">
                <Phone className="w-4 h-4" />
                Contacto
              </Link>
            </Button>
            <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
              {open ? (
                <X className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-foreground'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-foreground'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.hash ? '/' + link.hash : link.to}
                onClick={(e) => handleClick(link, e)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="w-full mt-3 bg-primary hover:bg-secondary text-primary-foreground gap-2"
              asChild
            >
              <Link to="/presupuestos" onClick={() => setOpen(false)}>
                <Phone className="w-4 h-4" />
                Contacto
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}