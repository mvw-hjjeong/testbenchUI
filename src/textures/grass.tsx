import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"


const grassT = ():TextureT => {
  const repeatX = 8;
  const repeatY = 4;

  const [base, bump, normal, ao, rough, metal] = useLoader(
    THREE.TextureLoader,
    [
      "../assets/pbr/grass/basecolor.png",
      "../assets/pbr/grass/displacement.png",
      "../assets/pbr/grass/normal.png",
      "../assets/pbr/grass/ao.png",
      "../assets/pbr/grass/roughness.png",
      "../assets/pbr/grass/metalness.png",
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
  };
};

export default grassT;
