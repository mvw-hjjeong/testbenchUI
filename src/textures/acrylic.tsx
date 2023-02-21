import React, { memo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"

const acrylicTexture = ():TextureT => {
  const repeatX = 4;
  const repeatY = 2;

  const [base, bump, normal, ao, rough] = useLoader(
    THREE.TextureLoader,
    [
      "../assets/pbr/acrylic/basecolor.jpg",
      "../assets/pbr/acrylic/displacement.jpg",
      "../assets/pbr/acrylic/normal.jpg",
      "../assets/pbr/acrylic/ao.jpg",
      "../assets/pbr/acrylic/roughness.jpg",
    ]
  );

  [base, bump, normal, ao, rough].forEach((texture) => {
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
    bScale: 0,
    metalness:0,
    roughness:1,
  };
};

export default acrylicTexture;
