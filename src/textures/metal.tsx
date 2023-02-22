import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"

const name = "metal"
const extension = "jpg"

const metalTexture = ():TextureT => {
  const repeatX = 4;
  const repeatY = 2;

  const [base,bump, normal, rough, metal] = useLoader(
    THREE.TextureLoader,
    [

      `../assets/pbr/${name}/basecolor.${extension}`,
      `../assets/pbr/${name}/displacement.${extension}`,
      `../assets/pbr/${name}/normal.${extension}`,
      `../assets/pbr/${name}/roughness.${extension}`,
      `../assets/pbr/${name}/metalness.${extension}`,
    ]
  );

  [base,bump, normal, rough, metal].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
  });

  return {
    base,
    bump,
    normal,
    rough,
    metal,
    bScale: 0,
    metalness:1,
    roughness:1,
  };
};

export default metalTexture;
