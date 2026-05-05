"use client";
import { useEffect } from "react";
import Link from "next/link";
export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("webCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 250;

    let points = [];

    for (let i = 0; i < 30; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1 - 0.5,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#2563eb";
        ctx.fill();

        points.forEach((p2, j) => {
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(37, 99, 235, 0.2)";
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <main>
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="text-2xl font-bold text-blue-600">Starter</div>
          <div className="hidden md:flex space-x-6 text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/services" className="hover:text-blue-600">
              Services
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              Build Modern Websites with{" "}
              <span className="text-blue-600">Next.js</span>
            </h1>

            <p className="mt-5 text-gray-500 max-w-md">
              Create fast, responsive and modern landing pages using Next.js and
              Tailwind CSS. Build better UI with clean structure and
              performance.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                Get Started
              </button>

              <button className="border bg-blue-600 border-gray-300 px-6 py-3 rounded-md hover:bg-gray-500 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <canvas
              id="webCanvas"
              className="w-full max-w-md h-64 bg-gray-100 rounded-md"
            ></canvas>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-blue-500">Starter</h2>

          <p className="text-gray-400 text-sm mt-3 max-w-md">
            Building modern web experiences with Next.js and Tailwind CSS. Fast,
            responsive and clean UI for better user experience.
          </p>

          <div className="w-24 h-px bg-gray-700 my-6"></div>

          {/* Social / Icons (simple text style) */}
          <div className="flex gap-6 text-gray-400 text-sm">
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">GitHub</span>
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
          </div>
        </div>

        <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-xs">
          © 2026 Starter. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
