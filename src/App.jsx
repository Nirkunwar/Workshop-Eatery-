import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import * as THREE from 'three';

function Burger3D() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <cylinderGeometry args={[1.2, 1.4, 0.6, 32]} />
        <meshStandardMaterial color="#4a2c0b" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Top bun */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[1.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
      {/* Patty */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.4, 32]} />
        <meshStandardMaterial color="#2c1e14" emissive="#3a2a1f" />
      </mesh>
      {/* Cheese */}
      <mesh position={[0, 0.3, 0]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[2.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorActive, setCursorActive] = useState(false);
  const [orderStep, setOrderStep] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleOrder = () => {
    window.open(`https://wa.me/9779804650880?text=Hi!%20I%20want%20to%20order%20from%20The%20Workshop%20Eatery`, '_blank');
  };

  return (
    <>
      {/* Custom Cursor */}
      <div 
        className="custom-cursor fixed pointer-events-none z-[9999]"
        style={{
          left: `${cursorPos.x - 12}px`,
          top: `${cursorPos.y - 12}px`,
          transform: cursorActive ? 'scale(1.5)' : 'scale(1)'
        }}
      />

      {/* Loading Screen (simulated) */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.5, delay: 1 }}
        className="fixed inset-0 bg-black z-[10000] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-6xl font-bold tracking-tighter neon-text mb-4">THE WORKSHOP</div>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-full animate-pulse" />
          <p className="mt-6 text-sm tracking-[4px] text-zinc-400">CRAFTING FLAVOR • EST 2026</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-2xl">W</div>
            <div>
              <div className="font-bold tracking-tighter text-2xl">WORKSHOP</div>
              <div className="text-[10px] text-zinc-500 -mt-1">EATERY</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm tracking-widest">
            {['MENU', 'SIGNATURE', 'ORDER', 'STORY', 'GALLERY', 'VISIT'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                onMouseEnter={() => setCursorActive(true)}
                onMouseLeave={() => setCursorActive(false)}
                className="hover:text-orange-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <button 
            onClick={handleOrder}
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
            className="hidden md:block px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all active:scale-95"
          >
            ORDER NOW
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ff4d0030_1px,transparent_1px)] bg-[length:40px_40px]" />
        
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-10">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} color="#ff4d00" intensity={2} />
            <Burger3D />
            <Environment preset="night" />
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.4} />
          </Canvas>
        </div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        >
          <div className="inline-block mb-6 px-6 py-2 rounded-full border border-white/20 text-xs tracking-[3px] bg-white/5">LALITPUR • NEPAL</div>
          
          <h1 className="text-7xl md:text-[120px] font-black tracking-[-4px] leading-none mb-6 neon-text">
            CRAFTED.<br />GRILLED.<br />PERFECTED.
          </h1>
          
          <p className="text-2xl md:text-4xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            Premium burgers, artisanal donuts &amp; flame-kissed coffee in the heart of Lalitpur
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('menu')}
              onMouseEnter={() => setCursorActive(true)}
              onMouseLeave={() => setCursorActive(false)}
              className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 group"
            >
              EXPLORE MENU
              <span className="group-hover:rotate-45 transition">→</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={handleOrder}
              className="px-12 py-6 text-xl font-semibold border-2 border-white/70 rounded-2xl hover:bg-white/10 transition-all"
            >
              ORDER VIA WHATSAPP
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs tracking-widest flex flex-col items-center"
        >
          SCROLL TO DISCOVER
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent mt-4" />
        </motion.div>
      </section>

      {/* MENU EXPERIENCE */}
      <section id="menu" className="py-32 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <div className="text-orange-400 text-sm tracking-[4px] mb-3">THE EXPERIENCE</div>
            <h2 className="text-6xl font-bold tracking-tighter">Flame. Craft. Repeat.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "BURGERS", desc: "Nashville Hot • Korean BBQ • Classic Smash", color: "from-orange-500" },
              { category: "DONUTS", desc: "Artisanal • Filled • Glazed daily", color: "from-yellow-400" },
              { category: "COFFEE", desc: "Single origin • Cold brew • Espresso", color: "from-red-500" },
              { category: "SHAKES", desc: "Thick • Creamy • Limited editions", color: "from-amber-500" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -20, scale: 1.02 }}
                onMouseEnter={() => setCursorActive(true)}
                onMouseLeave={() => setCursorActive(false)}
                className="group glass rounded-3xl p-10 h-full flex flex-col justify-between border border-white/10 hover:border-orange-500/50 transition-all"
              >
                <div>
                  <div className={`inline text-6xl font-black bg-gradient-to-br ${item.color} to-transparent bg-clip-text text-transparent`}>{item.category}</div>
                  <p className="mt-8 text-zinc-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
                <div className="text-xs mt-12 text-orange-400 group-hover:tracking-widest transition-all">DISCOVER →</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE ITEMS */}
      <section id="signature" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-6xl font-bold tracking-tighter text-center mb-20">Signature Weapons</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "NASHVILLE HOT", desc: "Buttermilk fried chicken, spicy slaw, pickles, house sauce", cal: "1240 kcal" },
              { name: "KOREAN BBQ BURGER", desc: "Gochujang glazed beef, kimchi, ssamjang mayo", cal: "1180 kcal" },
              { name: "FLAME DONUT TRIO", desc: "Caramel, chili-chocolate, miso-glazed", cal: "890 kcal" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-zinc-900"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                <div className="absolute bottom-0 p-10 z-20">
                  <div className="text-orange-400 text-sm mb-2">SIGNATURE</div>
                  <h3 className="text-4xl font-bold tracking-tight mb-3">{item.name}</h3>
                  <p className="text-zinc-300 mb-6">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-white/10 px-4 py-2 rounded-full">{item.cal}</span>
                    <button onClick={handleOrder} className="text-sm underline">Order Now →</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER SYSTEM UI */}
      <section id="order" className="py-32 bg-black border-t border-b border-white/10">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="uppercase tracking-widest text-orange-400 mb-4">Instant. Seamless.</div>
            <h2 className="text-6xl font-bold">Order Like Tomorrow</h2>
          </div>

          <div className="glass rounded-3xl p-12 md:p-20">
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
              <div>
                <div className="text-3xl font-semibold">The Workshop Eatery</div>
                <div className="text-zinc-400">Bakhundole, Lalitpur • Boudha Outlet</div>
              </div>
              <div className="text-right">
                <div className="text-sm">Ready in</div>
                <div className="text-5xl font-mono text-orange-400">18 min</div>
              </div>
            </div>

            <button 
              onClick={handleOrder}
              className="w-full py-8 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-500 text-2xl font-bold rounded-2xl hover:brightness-110 active:scale-[0.985] transition-all flex items-center justify-center gap-4"
            >
              <Phone className="w-8 h-8" /> ORDER ON WHATSAPP • 9804650880
            </button>

            <p className="text-center text-xs text-zinc-500 mt-8">or book a table • real-time availability</p>
          </div>
        </div>
      </section>

      {/* ABOUT / STORY */}
      <section id="story" className="py-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl leading-tight tracking-tight text-balance"
          >
            Born in the workshops of Lalitpur.<br />
            Where fire meets precision.<br />
            Where every burger tells a story of craft, heat, and obsession.
          </motion.p>
          <div className="mt-16 text-sm tracking-widest text-zinc-500">CLEAN KITCHEN • FRESH DAILY • NO COMPROMISE</div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between mb-12">
            <h2 className="text-5xl font-bold tracking-tighter">Moments from the Grill</h2>
            <div className="text-orange-400 self-end">↗ INSTAGRAM</div>
          </div>
          
          <div className="columns-2 md:columns-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="mb-6 overflow-hidden rounded-2xl aspect-video bg-zinc-900 group">
                <div className="h-full w-full bg-gradient-to-br from-orange-900/30 to-transparent flex items-center justify-center text-8xl opacity-30 group-hover:opacity-50 transition">🍔</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION + CONTACT */}
      <section id="visit" className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl font-bold tracking-tighter mb-10">Find Your Table</h2>
            
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="text-orange-400" />
                  <div>
                    <div className="font-semibold">Bakhundole, Lalitpur</div>
                    <div className="text-sm text-zinc-400">Near Patan Gate</div>
                  </div>
                </div>
                <a href="https://wa.me/9779804650880" className="text-orange-400 hover:underline">Call / WhatsApp → 9804650880</a>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="text-orange-400" />
                  <div>
                    <div className="font-semibold">Boudha Outlet</div>
                    <div className="text-sm text-zinc-400">Kathmandu Valley</div>
                  </div>
                </div>
                <a href="https://wa.me/9779804650880" className="text-orange-400 hover:underline">Call / WhatsApp → 9804650880</a>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-12 h-fit">
            <div className="aspect-video bg-zinc-900 rounded-2xl flex items-center justify-center text-6xl mb-8">🗺️</div>
            <p className="text-sm text-zinc-400">Lalitpur, Nepal • Open daily 11 AM – 10 PM</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black">W</div>
              <span className="font-bold tracking-tighter text-3xl">WORKSHOP EATERY</span>
            </div>
            <p className="max-w-xs text-sm text-zinc-500">Premium fast-casual dining with a workshop soul. Crafted in Lalitpur.</p>
          </div>

          <div className="grid grid-cols-3 gap-12 text-sm">
            <div>
              <div className="font-mono text-xs mb-4 text-orange-400">NAV</div>
              <div className="space-y-2 text-zinc-400">Menu • Story • Locations</div>
            </div>
            <div>
              <div className="font-mono text-xs mb-4 text-orange-400">CONNECT</div>
              <div className="space-y-2 text-zinc-400">Instagram • Facebook</div>
            </div>
            <div>
              <div className="font-mono text-xs mb-4 text-orange-400">LEGAL</div>
              <div className="space-y-2 text-zinc-400">Privacy • Terms</div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-zinc-600 mt-24">
          © 2026 The Workshop Eatery • Made to feel global, rooted in Nepal
        </div>
      </footer>
    </>
  );
}
