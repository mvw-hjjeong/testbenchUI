import React, { useEffect, useState } from "react";
import MainLayers from "./layers";
import appStates from "@/utils/appStates";

function MainScreen() {
  const fs = window.require("fs");
  const [
    detectedSurface, 
    setDetectedSurface,
    setDetectedTime
  ] = appStates((s:any) => [
    s.detectedSurface,
    s.setDetectedSurface,
    s.setDetectedTime
  ]);

  useEffect(() => {
    setInterval(()=> {
      fs.readFile("D:/user/Desktop/fs.txt", "utf-8", (err:Error, data:any) => {
        if (err) throw err;
        if(data!==detectedSurface){
          setDetectedSurface(parseInt(data));
          setDetectedTime(new Date().toDateString());
        }
      });
    }, 1000);
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-auto">
        <MainLayers />
      </div>
    </div>
  );
}

export default MainScreen;
