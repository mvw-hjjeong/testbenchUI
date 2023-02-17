import { create } from 'zustand';
import produce from "immer";

export default create((set) => ({
  detectedSurface: 2,
  setDetectedSurface: (value:number) =>
  set(
    produce((state) => {
      state.detectedSurface = value;
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