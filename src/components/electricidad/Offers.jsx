import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ShoppingCart, Tag, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3-oEEe4wOmS3vTpuXsRQo4hKovtJFOtFa3uwVsKrsFRnGELtkLzms8w3WuT4bd_AJxZwdvG9a0Q6t/pub?output=csv';

// Convierte links de Google Drive (para compartir) a links directos de imagen
function convertDriveLink(url) {
  if (!url) return null;
  // Extrae el ID del archivo del link de Drive
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
  }
  return url;
}

// Parsea el precio del formato "$25.400,00" a número
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  return Number(priceStr.replace(/[$\s.]/g, '').replace(',', '.')) || 0;
}

export default function Offers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const mapped = results.data
          .filter((row) => {
            const estado = (row['Estado / Notas'] || '').trim().toUpperCase();
            return estado !== 'SIN STOCK';
          })
          .map((row) => ({
            name: row['Producto'] || '',
            code: row['Código'] || '',
            price: parsePrice(row['Precio']),
            priceRaw: row['Precio'] || '',
            status: row['Estado / Notas'] || '',
            image: convertDriveLink(row['Imagenes']),
          }))
          .filter((p) => p.name);
        setProducts(mapped);
        setLoading(false);
      },
      error: () => {
        setError('No se pudieron cargar las ofertas. Intentá de nuevo más tarde.');
        setLoading(false);
      },
    });
  }, []);

  return (
    <section id="ofertas" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-5">
            <Tag className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-semibold tracking-wide uppercase">
              Precios Especiales
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Ofertas del Momento
          </h2>
          <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Productos seleccionados con precios especiales. ¡Actualizados en tiempo real!
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-orange-400 animate-spin" />
            <p className="text-muted-foreground">Cargando ofertas...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
            <AlertCircle className="w-10 h-10 text-destructive" />
            <p>{error}</p>
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={`${product.code}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-square bg-muted/40 relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Tag className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}

                    {/* Oferta badge */}
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold shadow-md">
                      OFERTA
                    </Badge>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider">
                      {product.code}
                    </p>
                    <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <p className="text-lg font-bold text-orange-400 mb-3">
                      {product.priceRaw}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 rounded-full border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-white shrink-0 transition-colors"
                        asChild
                      >
                        <a
                          href={`https://wa.me/543415665882?text=Hola, me interesa la oferta de: ${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Consultar por WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs gap-1.5 bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() =>
                          addToCart({
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: 'Oferta',
                          })
                        }
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No hay ofertas disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}
