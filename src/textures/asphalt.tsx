import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"

const asphaltT = ():TextureT => {
  const repeatX = 4;
  const repeatY = 2;

  const [base, bump, normal, ao, rough, metal] = useLoader(
    THREE.TextureLoader,
    [
      "../assets/pbr/asphalt/basecolor.png",
      "../assets/pbr/asphalt/displacement.png",
      "../assets/pbr/asphalt/normal.png",
      "../assets/pbr/asphalt/ao.png",
      "../assets/pbr/asphalt/roughness.png",
      "../assets/pbr/asphalt/metalness.png",
    ]
  );

  [base, bump, normal, ao, rough, metal].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
  });

  return {
    base,
    bump,
    normal,
    ao,
    rough,
    metal,
    bScale: 0.1
  };
};

export default asphaltT;
