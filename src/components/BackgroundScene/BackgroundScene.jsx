import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneContents } from './SceneContents';

/**
 * react-three-fiber port of webgl-bg.js.
 * Renders nothing on mobile/touch devices or when prefers-reduced-motion
 * is set, exactly like the original early exit.
 */
export function GLBackground() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileDevice =
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0;

    setIsMobile(mobileDevice);
    setShouldRender(!prefersReduced && !mobileDevice);
  }, []);

  if (!shouldRender) return null;

  return (
    <Canvas id="gl-bg"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
      gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
      dpr={[1, 2]}
      camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 0, 80] }}
      onCreated={({ gl }) => gl.setClearColor(0x0a0a0b, 1)}
    >
      <SceneContents isMobile={isMobile} />
    </Canvas>
  );
}
