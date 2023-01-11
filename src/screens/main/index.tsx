import React,{useEffect} from "react";
import gsap, { Power4, Expo, Linear } from 'gsap';
import * as THREE from 'three';
import { useWindowSize,useScroll } from '@/utils/hooks';
import {BMEResultLayer,AIResultLayer} from '@/components';
import bg_steel from '@/assets/bg_steel.png';
import bg_asphalt from '@/assets/bg_asphalt.png';
import bg_grass from '@/assets/bg_grass.png';
import bg_acrylic from '@/assets/bg_acrylic.png';


const images = [
  bg_asphalt,
  bg_acrylic,
  bg_grass,
  bg_steel,
];

let el : HTMLElement = undefined;
let inner: HTMLElement = undefined;
let slides: HTMLElement = undefined;
let bullets: HTMLElement = undefined;

let data = {
  current: 0,
  next: 1,
  total: 3,
  delta: 0
}

let state = {
  animating: false,
  text: false,
  initial: true
}

let renderer = null;
let scene = null;
let clock = null;
let camera = null;
let textures = null;
let texture = null;
let mat = null;
let disp = null;

const MainScreen = ({

}) => {
  let size = useWindowSize()
  const vert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `

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
  `
  const mouseWheel = useScroll()

  const setup = () => {
    scene = new THREE.Scene()
    clock = new THREE.Clock(true)

    renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(el.offsetWidth, el.offsetHeight)

    inner.appendChild(renderer.domElement)
  }

  const cameraSetup = () => {
    camera = new THREE.OrthographicCamera(
      el.offsetWidth / -2,
      el.offsetWidth / 2,
      el.offsetHeight / 2,
      el.offsetHeight / -2,
      1,
      1000
    )

    camera.lookAt(scene.position)
    camera.position.z = 1
  }

  const render = () => {
    renderer.render(scene, camera)
  }

  const loadTextures = () => {
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = ''

    textures = []
    images.forEach((image, index) => {
      texture = loader.load(image + '?v=' + Date.now(), render())
      texture.minFilter = THREE.LinearFilter
      texture.generateMipmaps = false

      if (index === 0 && mat) {
        mat.uniforms.size.value = [
          size.innerWidth,
          size.innerHeight
        ]
      }

      textures.push(texture)
    })

    disp = loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/rock-_disp.png', render())
    disp.magFilter = disp.minFilter = THREE.LinearFilter
    disp.wrapS = disp.wrapT = THREE.RepeatWrapping
  }


  const createMesh = () => {
    mat = new THREE.ShaderMaterial({
      uniforms: {
        dispPower: { type: 'f', value: 0.0 },
        intensity: { type: 'f', value: 0.5 },
        res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        size: { value: new THREE.Vector2(1, 1) },
        texture1: { type: 't', value: textures[0] },
        texture2: { type: 't', value: textures[1] },
        disp: { type: 't', value: disp }
      },
      transparent: true,
      vertexShader: vert,
      fragmentShader: frag
    })

    const geometry = new THREE.PlaneBufferGeometry(
      el.offsetWidth,
      el.offsetHeight,
      1
    )

    const mesh = new THREE.Mesh(geometry, mat)

    scene.add(mesh)
  }

  const setStyles = () => {
    slides.forEach((slide, index) => {
      if (index === 0) return

      gsap.set(slide, { autoAlpha: 0 })
    })

    bullets.forEach((bullet, index) => {
      if (index === 0) return

      const txt = bullet.querySelector('.js-slider-bullet__text')
      const line = bullet.querySelector('.js-slider-bullet__line')

      gsap.set(txt, {
        alpha: 0.25
      })
      gsap.set(line, {
        scaleX: 0,
        transformOrigin: 'left'
      })
    })
  }
  const changeTexture = () => {
    mat.uniforms.texture1.value = textures[data.current]
    mat.uniforms.texture2.value = textures[data.next]
  }
  const transitionNext = () => {

    gsap.to(mat.uniforms.dispPower, 2.5, {
      value: 1,
      ease: Expo.easeInOut,
      onUpdate: render,
      onComplete: () => {
        mat.uniforms.dispPower.value = 0.0;
        changeTexture();
        render();
        state.animating = false;
      }
    })

    const current = slides[data.current]
    const next = slides[data.next]

    const currentImages = current.querySelectorAll('.js-slide__img')
    const nextImages = next.querySelectorAll('.js-slide__img')

    const currentText = current.querySelectorAll('.js-slider__text-line div')
    const nextText = next.querySelectorAll('.js-slider__text-line div')

    const currentBullet = bullets[data.current]
    const nextBullet = bullets[data.next]

    const currentBulletTxt = currentBullet.querySelectorAll('.js-slider-bullet__text')
    const nextBulletTxt = nextBullet.querySelectorAll('.js-slider-bullet__text')

    const currentBulletLine = currentBullet.querySelectorAll('.js-slider-bullet__line')
    const nextBulletLine = nextBullet.querySelectorAll('.js-slider-bullet__line')

    const tl = gsap.timeline({ paused: true })

    if (state.initial) {
      gsap.to('.js-scroll', 1.5, {
        yPercent: 100,
        alpha: 0,
        ease: Power4.easeInOut
      })

      state.initial = false
    }

    tl
      .staggerFromTo(currentImages, 1.5, {
        yPercent: 0,
        scale: 1
      }, {
        yPercent: -185,
        scaleY: 1.5,
        ease: Expo.easeInOut
      }, 0.075)
      .to(currentBulletTxt, 1.5, {
        alpha: 0.25,
        ease: Linear.easeNone
      }, 0)
      .set(currentBulletLine, {
        transformOrigin: 'right'
      }, 0)
      .to(currentBulletLine, 1.5, {
        scaleX: 0,
        ease: Expo.easeInOut
      }, 0)

    if (currentText) {
      tl
        .fromTo(currentText, 2, {
          yPercent: 0
        }, {
          yPercent: -100,
          ease: Power4.easeInOut
        }, 0)
    }

    tl
      .set(current, {
        autoAlpha: 0
      })
      .set(next, {
        autoAlpha: 1
      }, 1)

    if (nextText) {
      tl
        .fromTo(nextText, 2, {
          yPercent: 100
        }, {
          yPercent: 0,
          ease: Power4.easeOut
        }, 1.5)
    }

    tl
      .staggerFromTo(nextImages, 1.5, {
        yPercent: 150,
        scaleY: 1.5
      }, {
        yPercent: 0,
        scaleY: 1,
        ease: Expo.easeInOut
      }, 0.075, 1)
      .to(nextBulletTxt, 1.5, {
        alpha: 1,
        ease: Linear.easeNone
      }, 1)
      .set(nextBulletLine, {
        transformOrigin: 'left'
      }, 1)
      .to(nextBulletLine, 1.5, {
        scaleX: 1,
        ease: Expo.easeInOut
      }, 1)

    tl.play()
  }

  const nextSlide = () => {
    if (state.animating) return

    state.animating = true

    transitionNext()

    data.current = data.current === data.total ? 0 : data.current + 1
    data.next = data.current === data.total ? 0 : data.current + 1
  }


  useEffect(
    () => {
      el = document.querySelector('.js-slider');
      inner = el.querySelector('.js-slider__inner');
      slides = [...el.querySelectorAll('.js-slide')];
      bullets = [...el.querySelectorAll('.js-slider-bullet')];

      setup();
      cameraSetup();
      loadTextures();
      createMesh();
      setStyles();
      render();
      nextSlide();
    },
    [],
  );
  useEffect(
    () => {
      if (mouseWheel !== 0 && mouseWheel % 100 === 0) {
        nextSlide();
      }
    },
    [mouseWheel],
  );

  return (
    <>
      <AIResultLayer/>
      <BMEResultLayer/>
      <div>

      </div>
    </>
  );
};

export default MainScreen;

