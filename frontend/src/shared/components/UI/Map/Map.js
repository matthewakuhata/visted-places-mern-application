import React, { useRef } from "react";

import 'mapbox-gl/dist/mapbox-gl.css';
import "./Map.css";

const CustomMap = ({ longitude, latitude, zoom, className, style }) => {
  const mapRef = useRef();

  return (
    <div ref={mapRef} className={`map ${className}`} stlye={style}>
      <div>Map Location here GOOGLEMAP API</div>
    </div>
  );
};

export default CustomMap;
