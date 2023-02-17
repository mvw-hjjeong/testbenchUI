import React, { useEffect, useState } from "react";
import MainScreen from "./screens/main";
import appStates from "@/utils/appStates";

function App() {
  const fs = window.require("fs");
  const setDetectedSurface = appStates((s:any) => s.setDetectedSurface);

  useEffect(() => {
    setInterval(()=> {
      fs.readFile("D:/user/Desktop/fs.txt", "utf-8", (err:Error, data:any) => {
        if (err) throw err;
        setDetectedSurface(parseInt(data));
      });
    }, 1000);
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-auto">
        <MainScreen />
      </div>
    </div>
  );
}

export default App;
