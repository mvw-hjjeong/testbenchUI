import React, {
  Suspense,
  forwardRef
} from "react";
import { Layer } from './styles';

const MessageLayer = () => {
  return (
     <Layer>
          <p>상태메시지</p>
     </Layer>
  );
};


export default MessageLayer;
