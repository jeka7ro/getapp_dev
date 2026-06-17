import React from "react";

export default function LogoAnimated({ size = 44 }) {
  // We use the new pre-generated logo image instead of the SVG atom
  return (
    <img 
      src="/logo_cropped.png?v=3" 
      alt="GetApp Smart Displays Logo" 
      style={{ height: size, objectFit: 'contain' }}
      className="shrink-0"
    />
  );
}
