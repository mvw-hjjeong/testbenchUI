import { create } from 'zustand';
import produce from "immer";

export default create((set) => ({
  isSplash:true,
  setSplash: (value:boolean) =>
  set(
    produce((state) => {
      state.isSplash = value;
    })
  ),
  detectedSurface: 0,
  setDetectedSurface: (value:number) =>
  set(
    produce((state) => {
      state.detectedSurface = value;
    })
  ),
  detectedTime:"",
  setDetectedTime: (value:string) =>
  set(
    produce((state) => {
      state.detectedTime = value;
    })
  ),
  sources: {
    pairs: [
      {
        sentence: ['아스팔트','Asphalt']
      },
      {
        sentence: ['아크릴','Acrylic']
      },
      {
        sentence: ['인조잔디','Artificial Grass']
      },
      {
        sentence: ['철판','Steel']
      },
    ]
  },
  generation: {
    aa: 0,
  },
  setGeneration: (key:string, value:number|any) =>
    set(
      produce((state) => {
        state.generation[key] = value;
      })
    ),
}));