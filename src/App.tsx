import React, { useEffect, useState } from 'react';
import MainScreen from './screens/main';

function App() {
  const fs = window.require('fs');
   
  useEffect(()=>{
    fs.readFile(
      "D:/user/Desktop/fs.txt",
      'utf-8',
      (err, data) => {
        if (err) throw err;
        alert(data)
      }
    );
  })
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-auto">
        <MainScreen />
      </div>
    </div>
  );
}

export default App;
