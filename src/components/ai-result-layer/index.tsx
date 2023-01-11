import React, { useEffect } from "react";
import { Layer } from './styles';
import img_grass_1 from '@/assets/img_grass_1.jpg';
import img_grass_2 from '@/assets/img_grass_2.jpg';
import img_asphalt_1 from '@/assets/img_asphalt_1.jpg';
import img_asphalt_2 from '@/assets/img_asphalt_2.png';


const source = {
  pairs: [
    {
      img1: img_asphalt_1,
      img2: img_asphalt_2,
      sentence: ['아스팔트','Asphalt']
    },
    {
      img1: 'https://images.squarespace-cdn.com/content/v1/5aa98e25e17ba340fbd04832/1537913117990-YC99NN8VFHTP2E94A6HV/Image_1.jpeg',
      img2: 'https://www.wolfpaving.com/hs-fs/hub/98698/file-981025171-jpg/images/cracked-asphalt.jpg',
      sentence: ['아크릴','Acrylic']
    },
    {
      img1: img_grass_1,
      img2: img_grass_2,
      sentence: ['인조잔디','Artificial Grass']
    },
    {
      img1: 'https://images.squarespace-cdn.com/content/v1/5aa98e25e17ba340fbd04832/1537913117990-YC99NN8VFHTP2E94A6HV/Image_1.jpeg',
      img2: 'https://www.wolfpaving.com/hs-fs/hub/98698/file-981025171-jpg/images/cracked-asphalt.jpg',
      sentence: ['철판','Steel']
    },
  ]
}

const AIResultLayer = ({

}) => {
  return (
    <>
      <Layer>
        <div className="slider js-slider">
          <div className="slider__inner js-slider__inner"></div>
            {
              source.pairs.map((item, i) => {
                return (
                  <div className="slide js-slide">
                    <div className="slide__content">
                      <figure className="slide__img js-slide__img">
                        <img src={item.img1} alt="image1" />
                      </figure>
                      <figure className="slide__img js-slide__img">
                        <img src={item.img2} alt="image2" />
                      </figure>
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
              source.pairs.map((item, i) => {
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

