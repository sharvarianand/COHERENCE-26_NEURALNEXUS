"use client";

import { useRef } from "react";
import Image from "next/image";

interface ScrollCardProps {
   title: string;
   category: string;
   year: string;
   description: string;
   image: string;
   index: string;
   color?: string;
}

export default function ScrollCard({
   title,
   category,
   year,
   description,
   image,
   index,
   color = "#b8c5b2",
}: ScrollCardProps) {
   const cardRef = useRef<HTMLDivElement>(null);

   return (
      <div
         ref={cardRef}
         className="project-card"
         style={{
            flex: 1,
            height: "96vh",
            margin: "2vh 0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            backgroundColor: color,
            minWidth: 0,
            borderRadius: "40px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.12)",
         }}
      >
         {/* Image Container — Top 70% */}
         <div
            className="project-card__media"
            style={{
               position: "relative",
               flex: "0 0 68%",
               overflow: "hidden",
               margin: "0",
            }}
         >
            <Image
               src={image}
               alt={title}
               fill
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               style={{
                  objectFit: "cover",
               }}
               priority={index === "01" || index === "02"}
            />
         </div>

         {/* Info Panel — Bottom 30% */}
         <div
            className="project-card__info"
            style={{
               flex: "1",
               display: "flex",
               flexDirection: "column",
               justifyContent: "space-between",
               padding: "1.5rem 2rem",
               backgroundColor: color,
               position: "relative",
               opacity: 0,
               minWidth: 0,
               overflow: "hidden",
            }}
         >
            {/* Info Row: Year | Category | Description */}
            <div
               style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "2rem",
                  whiteSpace: "nowrap",
               }}
            >
               {/* Year Badge */}
               <span
                  style={{
                     fontFamily: "var(--font-heading)",
                     fontSize: "0.8rem",
                     fontWeight: 500,
                     padding: "0.35rem 1rem",
                     border: "1px solid rgba(0, 0, 0, 0.25)",
                     borderRadius: "50px",
                     color: "var(--charcoal)",
                     letterSpacing: "0.05em",
                     flexShrink: 0,
                  }}
               >
                  {year}
               </span>

               {/* Category */}
               <span
                  style={{
                     fontFamily: "var(--font-heading)",
                     fontSize: "0.7rem",
                     fontWeight: 600,
                     letterSpacing: "0.12em",
                     textTransform: "uppercase",
                     color: "var(--charcoal)",
                     opacity: 0.7,
                     flexShrink: 0,
                  }}
               >
                  {category}
               </span>

               {/* Description */}
               <span
                  style={{
                     fontFamily: "var(--font-body)",
                     fontSize: "0.75rem",
                     fontWeight: 400,
                     lineHeight: 1.4,
                     color: "var(--charcoal)",
                     opacity: 0.6,
                     textAlign: "right",
                     maxWidth: "280px",
                     whiteSpace: "normal",
                     flexShrink: 1,
                  }}
               >
                  {description}
               </span>
            </div>

            {/* Title Row */}
            <div
               style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
               }}
            >
               {/* Project Title */}
               <h3
                  style={{
                     fontFamily: "var(--font-heading)",
                     fontSize: "clamp(2rem, 5vw, 4.5rem)",
                     fontWeight: 400,
                     lineHeight: 1.0,
                     letterSpacing: "-0.03em",
                     color: "var(--charcoal)",
                     margin: 0,
                  }}
               >
                  {title}
               </h3>

               {/* Arrow Button */}
               <button
                  style={{
                     width: "50px",
                     height: "50px",
                     borderRadius: "50%",
                     border: "1px solid rgba(0, 0, 0, 0.25)",
                     backgroundColor: "transparent",
                     cursor: "pointer",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     flexShrink: 0,
                     transition: "background-color 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = "var(--charcoal)";
                     e.currentTarget.style.borderColor = "var(--charcoal)";
                     const svg = e.currentTarget.querySelector("svg");
                     if (svg) svg.style.color = "var(--cream)";
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = "transparent";
                     e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.25)";
                     const svg = e.currentTarget.querySelector("svg");
                     if (svg) svg.style.color = "var(--charcoal)";
                  }}
               >
                  <svg
                     width="18"
                     height="18"
                     viewBox="0 0 18 18"
                     fill="none"
                     style={{ color: "var(--charcoal)", transition: "color 0.3s ease" }}
                  >
                     <path
                        d="M5 13L13 5M13 5H6M13 5V12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>
            </div>

            {/* Bottom Row: Index */}
            <div
               style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
               }}
            >
               <span
                  style={{
                     fontFamily: "var(--font-heading)",
                     fontSize: "0.75rem",
                     fontWeight: 500,
                     color: "var(--charcoal)",
                     opacity: 0.5,
                  }}
               >
                  {index}
               </span>
            </div>
         </div>
      </div>
   );
}
