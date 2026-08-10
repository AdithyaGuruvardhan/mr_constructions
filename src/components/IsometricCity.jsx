import React from 'react';

const mapIso = (x, y, z) => ({
  cx: (x - y) * 0.866,
  cy: (x + y) * 0.5 - z,
});

const IsoBlock = ({ x, y, z, w, d, h, stroke = '#2c52a1', fill = 'white', showGrid = false }) => {
  const p1 = mapIso(x + w, y, z);
  const p2 = mapIso(x + w, y + d, z);
  const p3 = mapIso(x, y + d, z);
  
  const p4 = mapIso(x, y, z + h);
  const p5 = mapIso(x + w, y, z + h);
  const p6 = mapIso(x + w, y + d, z + h);
  const p7 = mapIso(x, y + d, z + h);

  const gridLines = [];
  if (showGrid) {
    const steps = 4;
    for (let i = 1; i < steps; i++) {
      // x-axis lines
      const gx1 = mapIso(x + (w * i) / steps, y, z + h);
      const gx2 = mapIso(x + (w * i) / steps, y + d, z + h);
      gridLines.push(<line key={`x-${i}`} x1={gx1.cx} y1={gx1.cy} x2={gx2.cx} y2={gx2.cy} stroke={stroke} strokeWidth="0.5" strokeDasharray="2,2" />);
      
      // y-axis lines
      const gy1 = mapIso(x, y + (d * i) / steps, z + h);
      const gy2 = mapIso(x + w, y + (d * i) / steps, z + h);
      gridLines.push(<line key={`y-${i}`} x1={gy1.cx} y1={gy1.cy} x2={gy2.cx} y2={gy2.cy} stroke={stroke} strokeWidth="0.5" strokeDasharray="2,2" />);
    }
  }

  return (
    <g stroke={stroke} fill={fill} strokeWidth="1.5" strokeLinejoin="round">
      {/* Left Face */}
      <polygon points={`${p3.cx},${p3.cy} ${p2.cx},${p2.cy} ${p6.cx},${p6.cy} ${p7.cx},${p7.cy}`} />
      {/* Right Face */}
      <polygon points={`${p1.cx},${p1.cy} ${p2.cx},${p2.cy} ${p6.cx},${p6.cy} ${p5.cx},${p5.cy}`} />
      {/* Top Face */}
      <polygon points={`${p4.cx},${p4.cy} ${p5.cx},${p5.cy} ${p6.cx},${p6.cy} ${p7.cx},${p7.cy}`} />
      {gridLines}
    </g>
  );
};

const IsoPath = ({ points, stroke = '#2c52a1', strokeWidth = "1", dashed = false }) => {
  const mapped = points.map(p => mapIso(p[0], p[1], p[2]));
  const d = `M ${mapped.map(p => `${p.cx},${p.cy}`).join(' L ')}`;
  return (
    <path 
      d={d} 
      stroke={stroke} 
      fill="none" 
      strokeWidth={strokeWidth} 
      strokeDasharray={dashed ? "4,4" : "none"} 
    />
  );
};

export default function IsometricCity() {
  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none opacity-80">
      <svg viewBox="-600 -300 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        
        {/* Ground grid lines for technical feel */}
        {Array.from({ length: 15 }).map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            <IsoPath points={[[-400, i * 60 - 400, 0], [600, i * 60 - 400, 0]]} stroke="#2c52a1" strokeWidth="0.2" />
            <IsoPath points={[[i * 60 - 400, -400, 0], [i * 60 - 400, 600, 0]]} stroke="#2c52a1" strokeWidth="0.2" />
          </React.Fragment>
        ))}

        <g>
          {/* Main central building cluster */}
          <IsoBlock x={0} y={0} z={0} w={120} d={120} h={60} showGrid={true} />
          <IsoBlock x={20} y={20} z={60} w={80} d={80} h={30} />
          
          {/* Adjacent buildings */}
          <IsoBlock x={150} y={-50} z={0} w={80} d={100} h={40} showGrid={true} />
          <IsoBlock x={-100} y={150} z={0} w={100} d={60} h={80} />
          <IsoBlock x={-100} y={150} z={80} w={40} d={60} h={20} />

          {/* Infrastructure (Substation/Transformers) */}
          <IsoBlock x={300} y={100} z={0} w={40} d={40} h={30} />
          <IsoBlock x={360} y={100} z={0} w={40} d={40} h={30} />
          <IsoPath points={[[320, 120, 30], [320, 120, 50], [380, 120, 50], [380, 120, 30]]} strokeWidth="2" />
          <IsoPath points={[[350, 120, 50], [350, 200, 50]]} strokeWidth="1" dashed={true} />

          {/* Solar Panel Field */}
          <IsoBlock x={-250} y={-200} z={0} w={140} d={100} h={5} showGrid={true} />
          <IsoBlock x={-250} y={-80} z={0} w={140} d={100} h={5} showGrid={true} />
          
          {/* Warehouse/Industrial */}
          <IsoBlock x={-300} y={50} z={0} w={80} d={160} h={50} showGrid={true} />
          <IsoBlock x={-320} y={70} z={0} w={20} d={40} h={30} />
          
          {/* Data Center */}
          <IsoBlock x={200} y={-250} z={0} w={100} d={100} h={60} />
          <IsoBlock x={220} y={-230} z={60} w={60} d={60} h={20} />

          {/* Connecting pipes / power lines */}
          <IsoPath points={[[-110, -100, 0], [0, -100, 0], [0, 0, 0]]} strokeWidth="1" dashed={true} />
          <IsoPath points={[[120, 60, 0], [150, 60, 0], [150, -50, 0]]} strokeWidth="1" />
          <IsoPath points={[[-200, 150, 0], [-100, 150, 0]]} strokeWidth="1" dashed={true} />
        </g>
      </svg>
    </div>
  );
}
