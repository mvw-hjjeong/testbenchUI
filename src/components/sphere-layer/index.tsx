import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  Suspense,
  useMemo,
  memo
} from "react";
import { Canvas,MeshProps, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { grassTexture, asphaltTexture,acrylicTexture } from "@/textures";
import appStates from "@/utils/appStates";

const SphereLayer = ({}) => {
  return (
    <>
      <Canvas
        camera={{
          position: [5, 5, 5],
        }}
      >
        <pointLight position={[5, 10, -10]} intensity={0.5} />
        <pointLight position={[0, 0, 10]} intensity={0.5} />
        <Suspense fallback={null}>
          <Sphere />
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={0.1}/>
      </Canvas>
    </>
  );
};

function Sphere() {
  const sphereRef = useRef<MeshProps|any>(null);
  const detectedSurface:number = appStates((s:any) => s.detectedSurface);
  const _grassTexture = useMemo(grassTexture,[]);
  const _asphaltTexture = useMemo(asphaltTexture,[])
  const _acrylicTexture = useMemo(acrylicTexture,[])
  const [texture,setTexture] = useState(_grassTexture);

  const changeTexture = useCallback((value:number) =>{
    switch (value) {
      case 0: {
        setTexture( _grassTexture);
        break;
      }
      case 1: {
        setTexture(_asphaltTexture);
        break;
      }
      case 2: {
        setTexture(_acrylicTexture);
        break;
      }
      default: {
        break;
      }
    }
  },[])

  useEffect(() => {
    changeTexture(detectedSurface)
  }, [detectedSurface]);

  return (
    <mesh position={[0, 0, 0]} ref={sphereRef}>
      <sphereGeometry args={[3, 1024, 1024]} />
      <meshPhysicalMaterial
        map={texture.base}
        displacementMap={texture.bump}
        displacementScale={1}
        aoMap={texture.ao}
        normalMap={texture.normal}
        roughnessMap={texture.rough}
        metalnessMap={texture.metal}
        specularColorMap={texture.spec}
        lightMap={texture.gloss}
        transparent={true}
      />
    </mesh>
  );
}

export default SphereLayer;
