import { useRef, useEffect, useLayoutEffect, useCallback } from 'react';

const useAnimationFrame = (callback, isAnimating) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = useCallback(
    (time) => {
      if (!isAnimating) {
        return;
      }

      frameRef.current = requestAnimationFrame(loop);
      const cb = callbackRef.current;
      cb(time);
    },
    [isAnimating, callbackRef]
  );

  const frameRef = useRef();

  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameRef.current);
  }, [isAnimating, loop]);
};

export default useAnimationFrame;
