import React, { Suspense, forwardRef, useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { SphereLayerPropsT } from "@/types";
import { Layer } from "./styles";

const SphereLayer = forwardRef(
  (
    { sphereTexture }: SphereLayerPropsT,
    ref: any
  ) => {
    return (
      <Layer>
        <Canvas
          camera={{
            position: [5, 5, 5],
          }}
        >
          <directionalLight
            position={[1, 1, 1]} //
            intensity={0.3}
          />
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <mesh position={[0, 0, 0]} ref={ref}>
              <sphereGeometry args={[3, 2048, 2048]} />
              <meshPhysicalMaterial
                transparent
                map={sphereTexture.base}
                displacementMap={sphereTexture.bump}
                displacementScale={sphereTexture.bScale}
                aoMap={sphereTexture.ao}
                normalMap={sphereTexture.normal}
                roughnessMap={sphereTexture.rough}
                metalnessMap={sphereTexture.metal}
                metalness={sphereTexture.metalness}
                roughness={sphereTexture.roughness}
              />
            </mesh>
            <OrbitControls
              autoRotate
              rotateSpeed={0.3}
              enableRotate={false}
              enableZoom={false}
            />
          </Suspense>
        </Canvas>
      </Layer>
    );
  }
);

export default SphereLayer;
