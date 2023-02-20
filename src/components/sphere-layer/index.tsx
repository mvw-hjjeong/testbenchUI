import React, {
  Suspense,
  forwardRef,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";
import {SphereLayerPropsT} from '@/types';
import { Layer } from './styles';

const SphereLayer = forwardRef(({sphereTexture}:SphereLayerPropsT, ref:React.RefObject<HTMLElement>|any) => {
  return (
    <Layer>
      <Canvas
        camera={{
          position: [5, 5, 5],
        }}
      >
        <pointLight position={[5, 10, -10]} intensity={0.5} />
        <pointLight position={[0, 0, 10]} intensity={0.5} />
        <Suspense fallback={null}>
          <mesh position={[0, 0, 0]} rotation={[0,50,0]} ref={ref}>
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
              specularColorMap={sphereTexture.spec}
              lightMap={sphereTexture.gloss}
            />
          </mesh>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={0.3}/>
      </Canvas>
      </Layer>
  );
},);


export default SphereLayer;
