import React, { memo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"

const acrylicT = ():TextureT => {
  const repeatX = 4;
  const repeatY = 2;

  const [base, bump, normal, ao, rough, metal] = useLoader(
    THREE.TextureLoader,
    [
      "../assets/pbr/acrylic/basecolor.jpg",
      "../assets/pbr/acrylic/displacement.jpg",
      "../assets/pbr/acrylic/normal.jpg",
      "../assets/pbr/acrylic/ao.jpg",
      "../assets/pbr/acrylic/roughness.jpg",
      "../assets/pbr/acrylic/metalness.jpg",
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
    bScale: 1.0
  };
};

export default acrylicT;
