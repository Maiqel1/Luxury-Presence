"use client";
import React, { useId, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
  viewBoxWidth = 300,
}: {
  text: string;
  duration?: number;
  viewBoxWidth?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef);
  const id = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const handleMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setMaskPosition({
      cx: `${((event.clientX - rect.left) / rect.width) * 100}%`,
      cy: `${((event.clientY - rect.top) / rect.height) * 100}%`,
    });
  };

  const textProps = {
    x: "50%",
    y: "50%",
    textAnchor: "middle",
    dominantBaseline: "middle",
    strokeWidth: 0.4,
    className: "fill-transparent font-sans text-7xl font-extrabold tracking-tight",
  } as const;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxWidth} 100`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="select-none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-gradient`} gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#8f6e6e" />
              <stop offset="35%" stopColor="#c2a3a3" />
              <stop offset="60%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c2a3a3" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id={`${id}-reveal`}
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`${id}-mask`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id}-reveal)`} />
        </mask>
      </defs>
      <text {...textProps} className={`${textProps.className} stroke-snow/20`} style={{ opacity: hovered ? 0.7 : 0 }}>
        {text}
      </text>
      <motion.text
        {...textProps}
        className={`${textProps.className} stroke-snow/55`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={inView ? { strokeDashoffset: [1000, 0, 0, 1000] } : undefined}
        transition={{ duration: 5, times: [0, 0.45, 0.8, 1], ease: "easeInOut", repeat: Infinity }}
      >
        {text}
      </motion.text>
      <text {...textProps} stroke={`url(#${id}-gradient)`} mask={`url(#${id}-mask)`}>
        {text}
      </text>
    </svg>
  );
};
