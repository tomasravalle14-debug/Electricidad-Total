import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MessageCircle, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const CATEGORIES = ['Todos', 'Iluminación', 'Materiales Eléctricos'];

export default function ProductCatalog({ products }) {
  const [searchParams] = useSearchParams();
  const categoriaParam = searchParams.get('categoria');

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoriaParam || 'Todos');
  const { addToCart } = useCart();

  useEffect(() => {
    if (categoriaParam) {
      setActiveCategory(categoriaParam);
      const el = document.getElementById('catalogo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [categoriaParam]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'Todos' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, products]);

  return (
    <section id="catalogo" className="py-20 lg:py-28 bg-muted/30 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Catálogo de Productos
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Explore nuestra selección de materiales eléctricos e iluminación de primera calidad.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-10">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-background rounded-xl border border-border overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-square bg-card p-4 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-medium">
                    {product.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-end mt-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 rounded-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shrink-0"
                        asChild
                      >
                        <a
                          href={`https://wa.me/543415665882?text=Hola, me interesa consultar por: ${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Consultar por WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No se encontraron productos con ese criterio de búsqueda.</p>
          </div>
        )}
      </div>
    </section>
  );
}