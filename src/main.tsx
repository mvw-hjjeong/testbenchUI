// import React, { lazy, Suspense } from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SplashScreen from "@/screens/splash";
// import LoadingScreen from "@/screens/loading"
// import "./index.css";

// const MainScreen = lazy(() => import("@/screens/main"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <SplashScreen />,
//   },
//   {
//     path: "/main",
//     element: <MainScreen />,
//   },
// ]);

// const root = document.getElementById("root") as HTMLElement;
// ReactDOM.createRoot(root).render(
//   <React.StrictMode>
//     <Suspense fallback={<LoadingScreen/>}>
//       <RouterProvider router={router} />
//     </Suspense>
//   </React.StrictMode>
// );
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import LoadingScreen from "@/screens/loading";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <LoadingScreen />
  </React.StrictMode>
);
