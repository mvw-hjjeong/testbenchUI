import React, { useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import { Screen } from "./styles";
import { useNavigate } from 'react-router-dom';


const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(".panels .panel:first-child, .panels .panel:last-child", {
      scaleY: 1,
      duration: 1,
    });
    gsap.to([".panel:nth-child(2)"," .panel:nth-child(3)",".panel:nth-child(4)",".panel:nth-child(5)"], {
      scaleY: 1,
      delay: 0.5,
      stagger: 0.2,
    });
    gsap.to(".panels", {
      clipPath: "circle(0%)",
      skewX: 0,
      duration: 1,
      delay: 2,
    });
    gsap.to(".page-main", {
      clipPath: "circle(100%)",
      duration: 1,
      delay: 3.2,
      onComplete:()=>{
        navigate('/main', { replace: true });
      }
    });
  }, []);

  return (
    <Screen>
      <ul className="panels">
        <li className="panel"></li>
        <li className="panel"></li>
        <li className="panel"></li>
        <li className="panel"></li>
        <li className="panel"></li>
        <li className="panel"></li>
      </ul>
      <main className="page-main">
        <div>
          <img src={"../../assets/logo_white.png"} width={200}/>
        </div>
      </main>
    </Screen>
  );
};

export default SplashScreen;
