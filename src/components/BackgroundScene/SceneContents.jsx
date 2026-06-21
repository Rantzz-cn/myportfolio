import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const SECTION_DEPTHS = {
  hero: 80,
  about: 68,
  skills: 56,
  projects: 46,
  experience: 36,
  certifications: 30,
  contact: 24,
};
const SECTION_IDS = Object.keys(SECTION_DEPTHS);

const ACCENT_COLOR = 0xd7ff3d;

export function SceneContents({ isMobile }) {
  const { camera } = useThree();

  const STAR_COUNT = isMobile ? 900 : 1800;
  const HERO_COUNT = isMobile ? 110 : 220;
  const LINE_COUNT = isMobile ? 30 : 60;

  /* ---------------- Star field geometry ---------------- */
  const starPositions = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400 - 50;
    }
    return positions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STAR_COUNT]);

  /* ---------------- Hero accent cloud geometry ---------------- */
  const { heroPositions, heroColors } = useMemo(() => {
    const positions = new Float32Array(HERO_COUNT * 3);
    const colors = new Float32Array(HERO_COUNT * 3);

    for (let i = 0; i < HERO_COUNT; i++) {
      const r = Math.random() * 28 + 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) + 18;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) + 20;

      const b = 0.65 + Math.random() * 0.35;
      colors[i * 3] = b * (215 / 255);
      colors[i * 3 + 1] = b * 1.0;
      colors[i * 3 + 2] = b * (61 / 255);
    }
    return { heroPositions: positions, heroColors: colors };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [HERO_COUNT]);

  /* ---------------- Sparse connection lines ----------------
   * Merged into a single LineSegments buffer (2 verts per segment) so all
   * 60 lines share one material instance — matches the original's single
   * `lineMat` reused across every THREE.Line.
   */
  const linePositions = useMemo(() => {
    const positions = new Float32Array(LINE_COUNT * 2 * 3);
    for (let c = 0; c < LINE_COUNT; c++) {
      const i = Math.floor(Math.random() * HERO_COUNT);
      const j = Math.floor(Math.random() * HERO_COUNT);
      positions[c * 6] = heroPositions[i * 3];
      positions[c * 6 + 1] = heroPositions[i * 3 + 1];
      positions[c * 6 + 2] = heroPositions[i * 3 + 2];
      positions[c * 6 + 3] = heroPositions[j * 3];
      positions[c * 6 + 4] = heroPositions[j * 3 + 1];
      positions[c * 6 + 5] = heroPositions[j * 3 + 2];
    }
    return positions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LINE_COUNT, heroPositions]);

  /* ---------------- Refs for animated objects/materials ---------------- */
  const heroMatRef = useRef();
  const lineMatRef = useRef();
  const heroCloudRef = useRef();
  const starsRef = useRef();
  const torusRef = useRef();
  const gridRef = useRef();

  /* ---------------- Mouse + scroll-driven depth state (refs, no re-renders) ---------------- */
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const cameraZ = useRef({ current: 80, target: 80 });
  const scrollFade = useRef(1);
  const entranceFade = useRef(0); // driven by the timed fade-in below, takes priority early on

  useEffect(() => {
    function onMouseMove(e) {
      targetMouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }

    function updateTargetDepth() {
      const scrollMid = window.scrollY + window.innerHeight * 0.45;
      let best = 'hero';
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollMid >= top) best = id;
      });
      cameraZ.current.target = SECTION_DEPTHS[best];

      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        const fade = Math.max(0, Math.min(1, heroBottom / window.innerHeight));
        scrollFade.current = fade;
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', updateTargetDepth, { passive: true });
    updateTargetDepth();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', updateTargetDepth);
    };
  }, []);

  /* ---------------- Entrance fade: hero cloud fades in 300ms after mount over 1.4s ---------------- */
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1400;
      let raf;
      function fadeIn(ts) {
        const p = Math.min((ts - start) / duration, 1);
        entranceFade.current = p;
        if (p < 1) raf = requestAnimationFrame(fadeIn);
      }
      raf = requestAnimationFrame(fadeIn);
      document.dispatchEvent(new CustomEvent('webgl:ready'));
      return () => cancelAnimationFrame(raf);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  /* ---------------- Main animation loop ---------------- */
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.04;
    mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.04;

    cameraZ.current.current += (cameraZ.current.target - cameraZ.current.current) * 0.025;

    camera.position.x = mouse.current.x * 4.5;
    camera.position.y = mouse.current.y * 2.8 + Math.sin(t * 0.28) * 1.2;
    camera.position.z = cameraZ.current.current;
    camera.lookAt(0, 0, 0);

    // Hero cloud opacity: timed entrance fade hands off to scroll-driven fade once it completes
    const targetOpacity =
      entranceFade.current < 1 ? entranceFade.current * 0.7 : Math.min(scrollFade.current * 0.7, 0.7);
    if (heroMatRef.current) heroMatRef.current.opacity = targetOpacity;
    if (lineMatRef.current) lineMatRef.current.opacity = Math.min(scrollFade.current * 0.08, 0.08);

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.13;
      torusRef.current.rotation.y = t * 0.19;
    }

    if (heroCloudRef.current) {
      heroCloudRef.current.rotation.y = t * 0.04;
      heroCloudRef.current.position.y = Math.sin(t * 0.38) * 1.1;
    }

    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.006;
      starsRef.current.rotation.x = t * 0.002;
    }

    if (gridRef.current) {
      gridRef.current.position.y = -42 + Math.sin(t * 0.2) * 0.8;
    }
  });

  return (
    <>
      {/* Ambient star field */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={ACCENT_COLOR}
          size={0.55}
          sizeAttenuation
          transparent
          opacity={0.3}
        />
      </points>

      {/* Hero accent particle cloud */}
      <points ref={heroCloudRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[heroPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[heroColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={heroMatRef}
          vertexColors
          size={0.85}
          sizeAttenuation
          transparent
          opacity={0}
        />
      </points>

      {/* Sparse connection lines — single merged buffer, one shared material */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMatRef} color={ACCENT_COLOR} transparent opacity={0.07} />
      </lineSegments>

      {/* Wireframe torus knot accent — desktop only */}
      {!isMobile && (
        <mesh ref={torusRef} position={[28, 0, 10]}>
          <torusKnotGeometry args={[12, 2.2, 120, 18]} />
          <meshBasicMaterial color={ACCENT_COLOR} wireframe transparent opacity={0.055} />
        </mesh>
      )}

      {/* Receding grid plane */}
      <gridHelper
        ref={gridRef}
        args={[400, 36, 0x1e1e22, 0x16161a]}
        position={[0, -42, 0]}
        rotation={[Math.PI * 0.04, 0, 0]}
      />
    </>
  );
}
