// Inside Canvas.js
import React, { forwardRef, useEffect } from 'react';

const Canvas = forwardRef(({ style }, ref) => {
  useEffect(() => {
    const onWindowResize = () => {
      ref.current.style.height = style.height;
      ref.current.style.width = style.width;
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [ref, style.height, style.width]);

  return (
    <canvas ref={ref} height={style.height} width={style.width} style={style} />
  );
});

export default Canvas;
