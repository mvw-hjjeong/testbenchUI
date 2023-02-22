import React, { memo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {TextureT} from "@/types"

const name = "acrylic"
const extension = "jpg"

const acrylicTexture = ():TextureT => {
  const repeatX = 4;
  const repeatY = 2;

  const [base, bump, normal, ao, rough] = useLoader(
    THREE.TextureLoader,
    [
      `../assets/pbr/${name}/basecolor.${extension}`,
      `../assets/pbr/${name}/displacement.${extension}`,
      `../assets/pbr/${name}/normal.${extension}`,
      `../assets/pbr/${name}/ao.${extension}`,
      `../assets/pbr/${name}/roughness.${extension}`,
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
