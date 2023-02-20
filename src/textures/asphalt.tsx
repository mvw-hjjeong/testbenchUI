import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"

const asphaltT = ():TextureT => {
  const repeatX = 4;
  const repeatY = 2;

  const [base, bump, normal, ao, rough, metal, spec, gloss] = useLoader(
    THREE.TextureLoader,
    [
      "../assets/pbr/asphalt/basecolor.jpg",
      "../assets/pbr/asphalt/displacement.jpg",
      "../assets/pbr/asphalt/normal.jpg",
      "../assets/pbr/asphalt/ao.jpg",
      "../assets/pbr/asphalt/roughness.jpg",
      "../assets/pbr/asphalt/metalness.jpg",
      "../assets/pbr/asphalt/specular.jpg",
      "../assets/pbr/asphalt/gloss.jpg",
    ]
  );

  [base, bump, normal, ao, rough, metal, spec, gloss].forEach((texture) => {
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
    spec,
    gloss,
    bScale: 0.1
  };
};

export default asphaltT;
