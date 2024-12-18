import './Wheel.css';
import React, { useRef, useEffect, useCallback } from 'react';

interface WheelProps {
  questions: string[];
  rotation: number;
  onSpin: () => void;
  colors: string[];
}

const Wheel: React.FC<WheelProps> = ({ questions, rotation, onSpin, colors }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);
    const degreesPerSegment = 360 / questions.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    questions.forEach((question, index) => {
      const startAngle = index * degreesPerSegment;
      const endAngle = (index + 1) * degreesPerSegment;

      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngleRad, endAngleRad);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((startAngleRad + endAngleRad) / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#000";
      ctx.font = "bold 16px Arial"; // Ajustar la fuente a negrita
      ctx.fillText(question, radius - 10, 10, radius * 0.75);
      ctx.restore();
    });
  }, [questions, colors]);

  useEffect(() => {
    drawWheel();
  }, [rotation, drawWheel]);

  return (
    <div className="ruleta-container">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 4s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
        onClick={onSpin}
      ></canvas>
      <div className="arrow"></div>
    </div>
  );
};

export default Wheel;