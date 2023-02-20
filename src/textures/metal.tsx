import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"

const metalTexture = ():TextureT => {
  const repeatX = 4;
  const repeatY = 2;

  const [base,bump, normal, rough, metal] = useLoader(
    THREE.TextureLoader,
    [
      "../assets/pbr/metal/basecolor.jpg",
      "../assets/pbr/metal/displacement.png",
      "../assets/pbr/metal/normal.jpg",
      "../assets/pbr/metal/roughness.jpg",
      "../assets/pbr/metal/metalness.jpg",
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
    bScale: 1.0
  };
};

export default metalTexture;
