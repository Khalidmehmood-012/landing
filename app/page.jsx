"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create points for animation - MORE POINTS for better effect
    let points = [];
    const numPoints = 80;

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    let animationId;
    
    function draw() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connecting lines (spider web)
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Move points
        p.x += p.dx;
        p.y += p.dy;
        
        // Bounce off edges with margin
        if (p.x < 20 || p.x > canvas.width - 20) p.dx *= -1;
        if (p.y < 20 || p.y > canvas.height - 20) p.dy *= -1;
        
        // Draw connections to nearby points
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Brighter lines for visibility
            const opacity = (1 - dist / 120) * 0.25;
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      
      // Draw points (dots)
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fill();
        
        // Inner glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(draw);
    }
    
    draw();
    
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#EAE6DC]">
      {/* Canvas Background - Spider Web Animation */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{ pointerEvents: "none", zIndex: 0 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="bg-[#EAE6DC]/80 backdrop-blur-md shadow-md sticky top-0 z-20 border-b border-black/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="text-2xl font-bold text-black">Starter</div>
            <div className="hidden md:flex space-x-8 text-gray-600">
              <Link href="/" className="hover:text-black transition">Home</Link>
              <Link href="/about" className="hover:text-black transition">About</Link>
              <Link href="/services" className="hover:text-black transition">Services</Link>
              <Link href="/contact" className="hover:text-black transition">Contact</Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
                  Build Modern Websites with{" "}
                  <span className="text-black/60">Next.js</span>
                </h1>
                <p className="mt-5 text-black/50 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
                  Create fast, responsive and modern landing pages using Next.js and
                  Tailwind CSS. Build better UI with clean structure and performance.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition shadow-md">
                    Get Started
                  </button>
                  <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition shadow-md ">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-72 sm:w-80 lg:w-96 h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-gray-100">
                <img
                  src="/khalid.jpg"
                  alt="Khalid"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-black text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-white">Starter</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-md">
              Building modern web experiences with Next.js and Tailwind CSS. Fast,
              responsive and clean UI for better user experience.
            </p>
            <div className="w-24 h-px bg-gray-700 my-6"></div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <span className="hover:text-white cursor-pointer transition">Twitter</span>
              <span className="hover:text-white cursor-pointer transition">GitHub</span>
              <span className="hover:text-white cursor-pointer transition">LinkedIn</span>
            </div>
          </div>
          <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-xs">
            © 2026 Starter. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}