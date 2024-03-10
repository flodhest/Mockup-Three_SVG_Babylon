import * as THREE from 'three';

export const getCamera = ({ offsetWidth, offsetHeight }) => {
  const camera = new THREE.PerspectiveCamera(
    65,
    offsetWidth / offsetHeight,
    0.1,
    2000,
  );
  camera.position.set(0, -119, 100);

  return camera;
};

export const getRenderer = canvas => {
  const context = canvas.getContext('webgl');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context,
  });

  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  return renderer;
};

export const getScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);
  scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

  const light = new THREE.SpotLight(0xffffff, 1, 750, 1);
  light.position.set(0, 200, 0);
  light.rotation.z = (90 * Math.PI) / 280;
  scene.add(light);

  const planeGeometry = new THREE.BufferGeometry(10000, 10000, 32, 32);
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = (90 * Math.PI) / 180;
  plane.receiveShadow = true;
  scene.add(plane);

  return scene;
};
