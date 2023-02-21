import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  VoidFunctionComponent,
} from "react";
import gsap, { Power4, Expo, Linear } from "gsap";
import * as THREE from "three";
import { useWindowSize } from "@/utils/hooks";
import { Canvas, MeshProps, useLoader, useFrame } from "@react-three/fiber";
import { BMEResultLayer, AIResultLayer, SphereLayer,MessageLayer } from "@/components";
import {
  grassTexture,
  asphaltTexture,
  acrylicTexture,
  metalTexture,
  concreteTexture
} from "@/textures";

import bg_steel from "@/assets/bg_steel.png";
import bg_asphalt from "@/assets/bg_asphalt.png";
import bg_grass from "@/assets/bg_grass.png";
import bg_acrylic from "@/assets/bg_acrylic.png";
import appStates from "@/utils/appStates";

const images = [bg_asphalt, bg_acrylic, bg_grass, bg_steel];

let el: HTMLElement | any = undefined;
let inner: HTMLElement | any = undefined;
let slides: HTMLElement[] | any = undefined;
let bullets: HTMLElement[] | any = undefined;

let page = {
  prev: 0,
  current: 1,
  total: 3,
  delta: 0,
};

let state = {
  animating: false,
  text: false,
  initial: true,
};

let renderer: THREE.WebGLRenderer | any = null;
let scene: THREE.Scene | any = null;
let clock = null;
let camera: THREE.Camera | any = null;
let textures: THREE.Texture[] | any = null;
let texture: THREE.Texture | any = null;
let mat: THREE.ShaderMaterial | any = null;
let disp: THREE.Texture | any = null;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const frag = `
varying vec2 vUv;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D disp;

uniform float dispPower;
uniform float intensity;

uniform vec2 size;
uniform vec2 res;

vec2 backgroundCoverUv( vec2 screenSize, vec2 imageSize, vec2 uv ) {
  float screenRatio = screenSize.x / screenSize.y;
  float imageRatio = imageSize.x / imageSize.y;
  vec2 newSize = screenRatio < imageRatio 
      ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
      : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
  vec2 newOffset = (screenRatio < imageRatio 
      ? vec2((newSize.x - screenSize.x) / 2.0, 0.0) 
      : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
  return uv * screenSize / newSize + newOffset;
}

void main() {
  vec2 uv = vUv;
  
  vec4 disp = texture2D(disp, uv);
  vec2 dispVec = vec2(disp.x, disp.y);
  
  vec2 distPos1 = uv + (dispVec * intensity * dispPower);
  vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));
  
  vec4 _texture1 = texture2D(texture1, distPos1);
  vec4 _texture2 = texture2D(texture2, distPos2);
  
  gl_FragColor = mix(_texture1, _texture2, dispPower);
}
`;

const MainScreen = ({}) => {
  let size:any = useWindowSize();
  const detectedSurface: number = appStates((s: any) => s.detectedSurface);

  const sphereRef = useRef<MeshProps | any>(null);
  const _grassTexture = useMemo(grassTexture, []);
  const _asphaltTexture = useMemo(asphaltTexture, []);
  const _acrylicTexture = useMemo(acrylicTexture, []);
  const _metalTexture = useMemo(metalTexture, []);
  const _concreteTexture = useMemo(concreteTexture, []);
  const [sphereTexture, setSphereTexture] = useState(_asphaltTexture);

  const changeSphereTexture = useCallback((value: number) => {
    switch (value) {
      case 0: {
        setSphereTexture(_asphaltTexture);
        break;
      }
      case 1: {
        setSphereTexture(_acrylicTexture);
        break;
      }
      case 2: {
        setSphereTexture(_grassTexture);
        break;
      }
      case 3: {
        setSphereTexture(_metalTexture);
        break;
      }
      default: {
        break;
      }
    }
  }, []);

  const setup = useCallback(() => {
    scene = new THREE.Scene();
    clock = new THREE.Clock(true);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(el.offsetWidth, el.offsetHeight);

    inner.appendChild(renderer.domElement);
  }, []);

  const cameraSetup = useCallback(() => {
    camera = new THREE.OrthographicCamera(
      el.offsetWidth / -2,
      el.offsetWidth / 2,
      el.offsetHeight / 2,
      el.offsetHeight / -2,
      1,
      1000
    );

    camera.lookAt(scene.position);
    camera.position.z = 1;
  }, []);

  const render = useCallback<VoidFunction|any>(() => {
    renderer.render(scene, camera);
  }, [renderer, scene, camera]);

  const loadTextures = useCallback(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";

    textures = [];
    images.forEach((image: string, index: number) => {
      texture = loader.load(image + "?v=" + Date.now(), render());
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      if (index === 0 && mat) {
        mat.uniforms.size.value = [size.innerWidth, size.innerHeight];
      }

      textures.push(texture);
    });

    disp = loader.load("../../assets/shader_rock-disp.png", render());
    disp.magFilter = disp.minFilter = THREE.LinearFilter;
    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;
  }, []);

  const createMesh = useCallback(() => {
    mat = new THREE.ShaderMaterial({
      uniforms: {
        dispPower: { value: 0.0 },
        intensity: { value: 0.5 },
        res: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        size: { value: new THREE.Vector2(1, 1) },
        texture1: { value: textures[0] },
        texture2: { value: textures[1] },
        disp: { value: disp },
      },
      transparent: true,
      vertexShader: vert,
      fragmentShader: frag,
    });

    const geometry = new THREE.PlaneGeometry(
      el.offsetWidth,
      el.offsetHeight,
      1
    );

    const mesh = new THREE.Mesh(geometry, mat);

    scene.add(mesh);
  }, []);

  const setStyles = () => {
    slides.forEach((slide: HTMLElement, index: number) => {
      if (index === 0) return;

      gsap.set(slide, { autoAlpha: 0 });
    });

    bullets.forEach((bullet: HTMLElement, index: number) => {
      if (index === 0) return;

      const txt = bullet.querySelector(".js-slider-bullet__text");
      const line = bullet.querySelector(".js-slider-bullet__line");

      gsap.set(txt, {
        alpha: 0.25,
      });
      gsap.set(line, {
        scaleX: 0,
        transformOrigin: "left",
      });
    });
  };

  const setBeforeTexture = useCallback(
    (value) => {
      mat.uniforms.texture1.value = textures[value];
      mat.uniforms.texture1.value.name = value;
    },
    [mat, textures]
  );

  const setAfterTexture = useCallback(
    (value) => {
      mat.uniforms.texture2.value = textures[value];
      mat.uniforms.texture2.value.name = value;
    },
    [mat, textures]
  );

  const changeBackgroundTexture = () => {
    console.log(page.prev + "→" + page.current);
    setBeforeTexture(page.current);
    setAfterTexture(page.prev);
  };

  const transitionNext = () => {
    const current = slides[page.prev];
    const next = slides[page.current];

    const currentText = current.querySelectorAll(".js-slider__text-line div");
    const nextText = next.querySelectorAll(".js-slider__text-line div");

    const currentBullet = bullets[page.prev];
    const nextBullet = bullets[page.current];

    const currentBulletTxt = currentBullet.querySelectorAll(
      ".js-slider-bullet__text"
    );
    const nextBulletTxt = nextBullet.querySelectorAll(
      ".js-slider-bullet__text"
    );

    const currentBulletLine = currentBullet.querySelectorAll(
      ".js-slider-bullet__line"
    );
    const nextBulletLine = nextBullet.querySelectorAll(
      ".js-slider-bullet__line"
    );

    if (state.initial) {
      gsap.to(".js-scroll", 1.5, {
        yPercent: 100,
        alpha: 0,
        ease: Power4.easeInOut,
      });

      state.initial = false;
    }
    if (sphereRef.current) {
      gsap.to(sphereRef.current.material, {
        opacity: 0,
        duration: 2,
        ease: Power4.easeInOut,
        onComplete: () => {
          changeSphereTexture(detectedSurface);
          gsap.to(sphereRef.current.material, {
            opacity: 1,
            duration: 1,
            ease: Power4.easeInOut,
          });
        },
      });
    }
    // currentBullet
    gsap.to(currentBulletTxt, {
      alpha: 0.25,
      ease: Linear.easeNone,
      duration: 1.5,
    });
    gsap.set(currentBulletLine, {
      transformOrigin: "right",
    });
    gsap.to(currentBulletLine, {
      scaleX: 0,
      ease: Expo.easeInOut,
      duration: 1.5,
    });

    // currentText
    if (currentText) {
      gsap.fromTo(
        currentText,
        {
          yPercent: 0,
        },
        {
          yPercent: -100,
          ease: Power4.easeInOut,
          duration: 2,
        }
      );
    }
    gsap.set(current, {
      autoAlpha: 0,
    });

    gsap.set(next, {
      autoAlpha: 1,
    });
    // nextText
    if (nextText) {
      gsap.fromTo(
        nextText,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          ease: Power4.easeOut,
          duration: 2,
        }
      );
    }

    // nextBulletTxt
    gsap.to(nextBulletTxt, {
      alpha: 1,
      ease: Linear.easeNone,
      duration: 1.5,
    });
    gsap.set(nextBulletLine, {
      transformOrigin: "left",
    });
    gsap.to(nextBulletLine, {
      scaleX: 1,
      ease: Expo.easeInOut,
      duration: 1.5,
    });

    gsap.to(mat.uniforms.dispPower, {
      value: 1,
      ease: Expo.easeInOut,
      onUpdate: render,
      onComplete: () => {
        mat.uniforms.dispPower.value = 0.0;
        console.log(page);
        changeBackgroundTexture();
        render();
        state.animating = false;
      },
      duration: 2.5,
    });
  };

  const nextSlide = (value:number) => {
    if (state.animating) return;
    state.animating = true;
    page.prev = page.current;
    page.current = value;
    setAfterTexture(value);
    transitionNext();
  };

  useEffect(() => {
    el = document.querySelector(".js-slider");
    inner = el.querySelector(".js-slider__inner");
    slides = [...el.querySelectorAll(".js-slide")];
    bullets = [...el.querySelectorAll(".js-slider-bullet")];

    setup();
    cameraSetup();
    loadTextures();
    createMesh();
    setStyles();
    render();
  }, []);

  const onChangeDetectedSurface = () => {
    if (detectedSurface !== page.current) nextSlide(detectedSurface);
  };

  useEffect(() => {
    onChangeDetectedSurface();
  }, [detectedSurface]);

  return (
    <>
      <MessageLayer/>
      <BMEResultLayer />
      <AIResultLayer />
      <SphereLayer ref={sphereRef} sphereTexture={sphereTexture} />
    </>
  );
};

export default MainScreen;
