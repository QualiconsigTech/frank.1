import { useState } from "react";

export const ButtonGlass = () => {
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

  const moveTrail = (event:any) => {
    setTrailPosition({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
  };

  return (
    <button
      className="glassButton"
      onMouseMove={moveTrail}
      onMouseLeave={() => setTrailPosition({ x: 0, y: 0 })}
    >
      Gerar PDF
      <div
        className="trail"
        style={{ left: trailPosition.x, top: trailPosition.y }}
      ></div>
    </button>
  );
};