import React, { useEffect } from "react";
import { Layer } from './styles';


const sources = [
  {icon:'../../assets/ico_temp.png', kor:'온도', eng:'Temperture',unit: '°C'},
  {icon:'../../assets/ico_humi.png', kor:'습도', eng:'Humidity',unit: '%'},
  {icon:'../../assets/ico_pha.png', kor:'대기압', eng:'Pressure',unit: 'Pha'},
  {icon:'../../assets/ico_temp.png', kor:'노면온도', eng:'Surface',unit: '°C'},
]

const BMEResultLayer = ({

}) => {
  return (
    <Layer>
       {
              sources.map((item, i) => {
                return (
                  <div style={{display:'flex',alignItems:'center'}}>
                    <img src={item.icon} alt={item.eng} />
                    <div style={{marginLeft:12}}>
                      <p><small>{item.eng}</small></p>
                      <p><strong>{item.kor}</strong></p>
                    </div>
                  </div>
                )
              })
            }
    </Layer>
  );
};

export default BMEResultLayer;

