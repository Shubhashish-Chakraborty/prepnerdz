'use client';
import { useState, useEffect, useRef } from 'react';

import fluidCursor from '../hooks/use-FluidCursor';

{/* Modified to work with intersaction */}
const FluidCursor = ( {active} : {active:boolean}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [controller, setController] = useState<{ start: () => void; stop: () => void }>();

  useEffect(() => {
    if (canvasRef.current) {
      const ctrl = fluidCursor(canvasRef.current);
      setController(ctrl);
    }
  }, []);

  useEffect(() => {
    if (!controller) return;
    if (active) controller.start();
    else controller.stop();
  }, [active, controller]);

  return (
    <div className='fixed top-0 left-0 '>
      <canvas ref={canvasRef} className='w-screen h-screen' />
    </div>
  );
};
export default FluidCursor;
