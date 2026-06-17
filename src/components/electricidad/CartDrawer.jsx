import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';



export default function CartDrawer() {
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const productList = cart
      .map(item => `${item.name} (x${item.quantity})`)
      .join(', ');

    const message = `Hola buenos dias. Queria consultar el precio de ${productList}`;
    const whatsappUrl = `https://wa.me/543415665882?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Drawer Lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-50 flex flex-col font-inter"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Tu Carrito</h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Contenido (Lista de productos) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
                  <p>Tu carrito está vacío</p>
                  <Button
                    variant="link"
                    onClick={() => setIsDrawerOpen(false)}
                    className="mt-2 text-primary"
                  >
                    Explorar productos
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.name} className="flex gap-4 p-3 bg-muted/30 rounded-xl border border-border">
                    <div className="w-20 h-20 bg-background rounded-lg p-2 border border-border shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-start mt-2">
                        <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer con Total y Botón */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-border bg-muted/10">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                  onClick={handleCheckout}
                >
                  Finalizar compra
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Seguir comprando
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
