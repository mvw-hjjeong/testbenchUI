import React from 'react';
import fs from "fs";

const fetchText = ()=>{
  const text = `D://user//Desktop//test.txt`;

  fs.readFileSync(text.toString());
  
  fs.readFile(text, (err, data) => {
    if (err) console.error(err);
    alert(data.toString());
  });
}

export {
  fetchText
}