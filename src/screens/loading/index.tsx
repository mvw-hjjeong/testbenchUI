import React, { useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import { Screen } from "./styles";

const {
  VITE_ROOT_DIR
} = import.meta.env;

const LoadingScreen = () => {
  return (
    <Screen>
      <main className="page-main">
        <div>
          <img
            src={`${VITE_ROOT_DIR}/logo_white.png`}
            width={200}
          />
        </div>
      </main>
    </Screen>
  );
};

export default LoadingScreen;
