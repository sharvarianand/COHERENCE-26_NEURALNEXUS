"use client";

import { useRef } from "react";
import gsap from "gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

export default function Navbar() {
   const navRef = useRef<HTMLElement>(null);

   useIsomorphicLayoutEffect(() => {
      const ctx = gsap.context(() => {
         gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
         );
      }, navRef);

      return () => ctx.revert();
   }, []);

   return (
      <nav
         ref={navRef}
         style={{
            position: "fixed",
            top: "1.25rem",
            left: "1.25rem",
            right: "1.25rem",
            margin: "0 auto",
            maxWidth: "1200px",
            zIndex: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1.5rem 0 2rem",
            height: "4rem",
            background: "rgba(13, 11, 9, 0.7)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderRadius: "100px",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            opacity: 0,
         }}
      >
         {/* Logo */}
         <a
            href="#"
            style={{
               display: "flex",
               alignItems: "center",
               gap: "0.5rem",
               fontFamily: "var(--font-heading)",
               fontSize: "1.15rem",
               fontWeight: 600,
               color: "var(--text-primary)",
            }}
         >
            <span style={{ color: "var(--accent-primary)", fontSize: "1.2rem" }}>
               ◈
            </span>
            Rosey
         </a>

         {/* Nav Links */}
         <div
            style={{
               display: "flex",
               gap: "2rem",
               alignItems: "center",
            }}
         >
            {["Features", "How It Works", "Dashboard", "Contact"].map((link) => (
               <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{
                     color: "var(--text-secondary)",
                     fontSize: "0.875rem",
                     fontFamily: "var(--font-body)",
                     transition: "color 200ms ease",
                  }}
                  onMouseEnter={(e) =>
                     (e.currentTarget.style.color = "var(--accent-primary)")
                  }
                  onMouseLeave={(e) =>
                     (e.currentTarget.style.color = "var(--text-secondary)")
                  }
               >
                  {link}
               </a>
            ))}
         </div>

         {/* CTA Button */}
         <a
            href="#contact"
            style={{
               padding: "0.5rem 1.25rem",
               borderRadius: "100px",
               border: "1px solid var(--accent-primary)",
               color: "var(--accent-primary)",
               fontSize: "0.875rem",
               fontWeight: 600,
               fontFamily: "var(--font-body)",
               transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
               e.currentTarget.style.background = "var(--accent-primary)";
               e.currentTarget.style.color = "var(--bg-base)";
            }}
            onMouseLeave={(e) => {
               e.currentTarget.style.background = "transparent";
               e.currentTarget.style.color = "var(--accent-primary)";
            }}
         >
            Get Early Access
         </a>
      </nav>
   );
}
