import * as THREE from "three";

export type AppStatesT = {
  detectedSurface: number;
  setDetectedSurface: (value:number) => void;
  sources:SourcesT;
  generation:GenerationT;
  setGeneration:(key:string,value:number) => void;
};

export type SourcesT = {
  pairs: SourcesT_PairsT[];
};
export type SourcesT_PairsT = {
  img1?: string;
  img2?: string;
  sentence: string[];
};
export type GenerationT = {
  aa: number
};
export type TextureT = {
  base?: THREE.Texture;
  bump?: THREE.Texture;
  normal?: THREE.Texture;
  ao?: THREE.Texture;
  rough?: THREE.Texture;
  metal?: THREE.Texture;
  bScale?: number;
  metalness?:number;
  roughness?:number;
};

export type SphereLayerT={
  props:any,
  ref:React.RefObject<HTMLElement>
}
export type SphereLayerPropsT={ 
  sphereTexture:TextureT
}