import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"

const metalTexture = ():TextureT => {
  const repeatX = 4;
  const repeatY = 2;

  const [base,normal, rough, metal] = useLoader(
    THREE.TextureLoader,
    [
      "../assets/pbr/metal/basecolor.png",
      "../assets/pbr/metal/normal.png",
      "../assets/pbr/metal/roughness.png",
      "../assets/pbr/metal/metalness.png",
    ]
  );

  [base, normal, rough, metal].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
  });

  return {
    base,
    normal,
    rough,
    metal,
  };
};

export default metalTexture;
