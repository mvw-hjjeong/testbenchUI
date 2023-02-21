import React, {
  Suspense,
  forwardRef
} from "react";
import { LogLayer,TimeLayer } from './styles';
import appStates from "@/utils/appStates";

const MessageLayer = () => {
  const [
    detectedTime, 
  ] = appStates((s:any) => [
    s.detectedTime,
  ]);

  return (
    <>
     <LogLayer>
          <p>상태메시지</p>
     </LogLayer>
     <TimeLayer>
          <p>{detectedTime}</p>
     </TimeLayer>
     </>
  );
};


export default MessageLayer;
