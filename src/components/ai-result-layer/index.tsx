import React, { useEffect,useRef } from "react";
import { Layer } from './styles';
import appStates from "@/utils/appStates";
import {SourcesT_PairsT} from '@/types';

const AIResultLayer = ({

}) => {
  const sources = appStates((s:any) => s.sources);


  return (
    <>
      <Layer>
        <div className="slider js-slider">
          <div className="slider__inner js-slider__inner"></div>
            {
              sources.pairs.map((item:SourcesT_PairsT) => {
                return (
                  <div className="slide js-slide">
                    <div className="slide__content">
                      {/* <figure className="slide__img js-slide__img">
                        <img src={item.img1} alt="image1" />
                      </figure>
                      <figure className="slide__img js-slide__img">
                        <img src={item.img2} alt="image2" />
                      </figure> */}
                    </div>

                    <div className="slider__text js-slider__text">
                      {
                        item.sentence.map(p => <div className="slider__text-line js-slider__text-line"><div>{p}</div></div>)
                      }
                    </div>

                  </div>
                )
              })
            }
          <nav className="slider__nav js-slider__nav">
            {
              sources.pairs.map((item:SourcesT_PairsT) => {
                return (
                  <div className="slider-bullet js-slider-bullet">
                    <span className="slider-bullet__text js-slider-bullet__text">{item.sentence[1]}</span>
                    <span className="slider-bullet__line js-slider-bullet__line"></span>
                  </div>
                )
              })
            }
          </nav>
        </div>
      </Layer>
    </>
  );
};

export default AIResultLayer;

