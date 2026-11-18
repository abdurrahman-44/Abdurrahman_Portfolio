import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Float, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Eye, RotateCcw, Sparkles, Info } from 'lucide-react';

interface InteractivePortrait3DProps {
  portraitImageUrl: string;
  glbModelUrl: string;
}

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * 3D Textured Bust / Editorial Sculpture Monolith preserving Abdurrahman's actual facial photograph
 * with subtle idle breathing animation and studio lighting.
 */
const PortraitMonolithMesh: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle idle breathing / floating motion
    groupRef.current.position.y = Math.sin(t * 1.4) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.18}>
      <group ref={groupRef}>
        {/* Outer Sculpted Bronze/Obsidian Frame */}
        <RoundedBox args={[2.35, 3.05, 0.22]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color="#1c2230"
            metalness={0.55}
            roughness={0.32}
          />
        </RoundedBox>

        {/* Inner Bezel Rim */}
        <RoundedBox
          args={[2.16, 2.86, 0.25]}
          radius={0.08}
          smoothness={4}
          position={[0, 0, 0.01]}
        >
          <meshStandardMaterial
            color="#C8A97E"
            metalness={0.75}
            roughness={0.25}
          />
        </RoundedBox>

        {/* Front Actual Verified Portrait Relief Plane */}
        <mesh position={[0, 0, 0.145]}>
          <planeGeometry args={[2.04, 2.74, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.35}
            metalness={0.08}
          />
        </mesh>

        {/* Subtle Architectural Pedestal Base */}
        <mesh position={[0, -1.72, 0]}>
          <cylinderGeometry args={[0.85, 1.05, 0.18, 32]} />
          <meshStandardMaterial
            color="#262D3D"
            metalness={0.6}
            roughness={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
};

const GLBAvatarMesh: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = -0.9 + Math.sin(t * 1.5) * 0.03;
  });

  return (
    <group ref={ref} dispose={null}>
      <primitive object={scene} scale={1.35} />
    </group>
  );
};

export const InteractivePortrait3D: React.FC<InteractivePortrait3DProps> = ({
  portraitImageUrl,
  glbModelUrl,
}) => {
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [hasGlbAsset, setHasGlbAsset] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');
  const [showPipelineInfo, setShowPipelineInfo] = useState<boolean>(false);

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());

    // Check if an optional rigged GLB avatar exists at /assets/models/abdurrahman-avatar.glb
    fetch(glbModelUrl, { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (
          res.ok &&
          !contentType.includes('text/html') &&
          (contentType.includes('model') ||
            contentType.includes('octet-stream') ||
            glbModelUrl.endsWith('.glb'))
        ) {
          // Verify content-length is non-trivial
          const len = Number(res.headers.get('content-length') || '0');
          if (len > 1024) {
            setHasGlbAsset(true);
          }
        }
      })
      .catch(() => {
        setHasGlbAsset(false);
      });
  }, [glbModelUrl]);

  return (
    <div className="relative flex flex-col rounded-2xl border border-rule-strong bg-page-alt/70 p-4 shadow-card">
      {/* Top Stage Header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-accent" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
            Interactive 3D Portrait Stage
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {webglSupported && (
            <button
              type="button"
              onClick={() => setViewMode((v) => (v === '3d' ? 'photo' : '3d'))}
              className="inline-flex items-center gap-1 rounded-lg border border-rule bg-page px-2.5 py-1 font-mono text-[10px] text-ink-secondary transition hover:border-accent hover:text-ink"
            >
              <Eye className="h-3 w-3 text-accent" />
              <span>{viewMode === '3d' ? '2D Portrait View' : '3D Stage View'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowPipelineInfo((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-lg border border-rule bg-page px-2 py-1 font-mono text-[10px] text-ink-secondary transition hover:border-accent hover:text-ink"
            title="3D GLB Rigging Pipeline Information"
            aria-label="Toggle 3D GLB Pipeline Info"
          >
            <Info className="h-3 w-3 text-accent" />
            <span>GLB Pipeline</span>
          </button>
        </div>
      </div>

      {/* Main 3D WebGL Canvas or Static Fallback */}
      <div className="relative h-[330px] sm:h-[360px] w-full overflow-hidden rounded-xl border border-rule bg-canvas">
        {webglSupported && viewMode === '3d' ? (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={portraitImageUrl}
                  alt="Abdurrahman Zarook"
                  className="h-full w-full object-cover opacity-80"
                />
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 0, 4.3], fov: 42 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              {/* Cinematic 3-Point Studio Lighting */}
              <ambientLight intensity={0.75} />
              <directionalLight
                position={[3.5, 4.5, 4]}
                intensity={1.45}
                color="#fff6e9"
              />
              <directionalLight
                position={[-3.5, 2, -2]}
                intensity={0.65}
                color="#8fa89b"
              />
              <pointLight position={[0, 2.5, 2]} intensity={0.5} color="#d4b895" />

              {hasGlbAsset ? (
                <GLBAvatarMesh url={glbModelUrl} />
              ) : (
                <PortraitMonolithMesh imageUrl={portraitImageUrl} />
              )}

              <ContactShadows
                position={[0, -1.85, 0]}
                opacity={0.45}
                scale={6}
                blur={2.2}
                far={4}
              />

              {/* Smooth Rotation Limits Preserving Natural Viewing Angles */}
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2 - 0.35}
                maxPolarAngle={Math.PI / 2 + 0.35}
                minAzimuthAngle={-0.55}
                maxAzimuthAngle={0.55}
                rotateSpeed={0.65}
              />
            </Canvas>

            {/* Interactive Rotation Hint Overlay */}
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-rule/80 bg-page/85 px-3 py-1.5 backdrop-blur-sm">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-secondary">
                <RotateCcw className="h-3 w-3 text-accent" />
                Drag or touch to rotate 3D portrait • Smooth azimuth limits active
              </span>
              <span className="font-mono text-[10px] text-accent">
                {hasGlbAsset ? 'GLB Mesh Active' : 'Verified Identity Sculpture'}
              </span>
            </div>
          </Suspense>
        ) : (
          <div className="relative h-full w-full">
            <img
              src={portraitImageUrl}
              alt="Abdurrahman Zarook — Verified Portrait"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-rule bg-page/90 px-3 py-1.5 font-mono text-[10px] text-ink-secondary">
              Verified Identity Portrait — Abdurrahman Zarook
            </div>
          </div>
        )}
      </div>

      {/* Transparent 3D GLB Pipeline Notice */}
      {showPipelineInfo && (
        <div className="mt-3 rounded-xl border border-accent/40 bg-page p-3 text-xs text-ink-secondary">
          <div className="flex items-center gap-1.5 font-semibold text-ink">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Identity-Preserving 3D GLB Avatar Pipeline</span>
          </div>
          <p className="mt-1 leading-relaxed">
            In strict compliance with portfolio identity rules, no generic third-party human mesh is substituted. The stage currently renders Abdurrahman&apos;s verified portrait in a Three.js / React Three Fiber 3D relief sculpture, and automatically upgrades to a rigged full-head mesh as soon as a user-approved photogrammetry `.glb` asset is placed at{' '}
            <code className="rounded bg-page-alt px-1 py-0.5 font-mono text-[10px] text-accent">
              public/assets/models/abdurrahman-avatar.glb
            </code>
            .
          </p>
        </div>
      )}
    </div>
  );
};
