import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/electricidad/Navbar';
import HeroSection from '../components/electricidad/HeroSection';
import SectionIndex from '../components/electricidad/SectionIndex';
import Categories from '../components/electricidad/Categories';
import ProductCatalog from '../components/electricidad/ProductCatalog';
import Benefits from '../components/electricidad/Benefits';
import QuoteForm from '../components/electricidad/QuoteForm';
import StoreInfo from '../components/electricidad/StoreInfo';
import WhatsAppButton from '../components/electricidad/WhatsAppButton';
import Footer from '../components/electricidad/Footer';
import CartDrawer from '../components/electricidad/CartDrawer';

const LOGO_URL = 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/74a4d8d67_fiori.jpg';
const LIGHTING_IMAGE = 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/c9d25b79a_generated_5ed0126c.png';
const ELECTRICAL_IMAGE = 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/c96f7f425_generated_e553bfac.png';

const PRODUCTS = [
  {
    name: 'Caja de Paso PVC 10x10',
    description: 'Caja de paso de PVC embutir, medida 10x10 cm. Resistente a impactos, apta para uso interior.',
    price: 1850,
    category: 'Materiales Eléctricos',
    image: 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/a2e03c397_generated_d62a63f3.png',
  },
  {
    name: 'Módulo USB Doble de Pared',
    description: 'Módulo con dos puertos USB integrados para instalación en bastidor estándar. Carga rápida 2.1A.',
    price: 8900,
    category: 'Materiales Eléctricos',
    image: 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/b7fe1a0cc_generated_d83fa9eb.png',
  },
  {
    name: 'Videoportero Digital HD',
    description: 'Sistema de videoportero con pantalla LCD 7" y cámara HD con visión nocturna infrarroja.',
    price: 89500,
    category: 'Materiales Eléctricos',
    image: 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/9e88e48aa_generated_8bf6f75a.png',
  },
  {
    name: 'Lámpara Infrarroja 250W',
    description: 'Lámpara infrarroja para calefacción puntual. Ideal para baños y espacios reducidos. Rosca E27.',
    price: 6200,
    category: 'Iluminación',
    image: 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/9e4b5e2f0_generated_e617c8f6.png',
  },
  {
    name: 'Spot Dicroico Empotrable LED',
    description: 'Spot empotrable LED 7W, luz cálida 3000K. Cuerpo de aluminio inyectado con disipador.',
    price: 4500,
    category: 'Iluminación',
    image: 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/e0e86ae70_generated_79d63948.png',
  },
  {
    name: 'Panel LED 60x60 cm 40W',
    description: 'Panel LED de alta eficiencia para cielorraso. Luz neutra 4000K. Ideal para oficinas y comercios.',
    price: 22800,
    category: 'Iluminación',
    image: 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/108951dd7_generated_a642c116.png',
  },
  {
    name: 'Cable Unipolar 2.5mm² x 100m',
    description: 'Rollo de cable unipolar de cobre, aislación PVC. Norma IRAM 2183. Color azul.',
    price: 45600,
    category: 'Materiales Eléctricos',
    image: 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/0a3aa60df_generated_ad90cc5e.png',
  },
  {
    name: 'Llave Térmica Bipolar 20A',
    description: 'Interruptor termomagnético bipolar 20A. Curva C. Montaje en riel DIN. Capacidad de corte 6kA.',
    price: 12300,
    category: 'Materiales Eléctricos',
    image: 'https://media.base44.com/images/public/6a0dc1d45330cdee8bb9cb7c/a706002c3_generated_0bcce99a.png',
  },
];

function MainPage() {
  return (
    <>
      <HeroSection />
      <Categories lightingImage={LIGHTING_IMAGE} electricalImage={ELECTRICAL_IMAGE} />
      <ProductCatalog products={PRODUCTS} />
      <StoreInfo />
    </>
  );
}

function CategoriasPage() {
  return (
    <div className="pt-20">
      <Categories lightingImage={LIGHTING_IMAGE} electricalImage={ELECTRICAL_IMAGE} />
    </div>
  );
}

function BeneficiosPage() {
  return (
    <div className="pt-20">
      <Benefits />
    </div>
  );
}

function PresupuestosPage() {
  return (
    <div className="pt-20">
      <QuoteForm />
    </div>
  );
}

export default function Home() {
  return (
    <div className="font-inter min-h-screen bg-background text-foreground">
      <Navbar logoUrl={LOGO_URL} />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/beneficios" element={<BeneficiosPage />} />
        <Route path="/presupuestos" element={<PresupuestosPage />} />
      </Routes>
      <Footer logoUrl={LOGO_URL} />
      <WhatsAppButton />
    </div>
  );
}
