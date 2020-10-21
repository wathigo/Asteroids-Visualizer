// Imports & constants
import createAsteroids from "./helpers/create_asteroids";
import createSpotlights from "./helpers/create_spotlights";

global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
const canvasSketch = require("canvas-sketch");
const { Scene } = require("three");

const settings = {
  animate: true,
  context: "webgl",
  scaleToView: true
};

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const update = (pointCloud, asteroids, renderer, scene, camera) => {
  pointCloud.rotation.x -= 0.0001;
  //pointCloud.rotation.y -= 0.001;
  pointCloud.rotation.z -= 0.0001;
  asteroids.forEach(function (obj) {
    obj.rotation.x -= obj.r.x;
    obj.rotation.y -= obj.r.y;
    obj.rotation.z -= obj.r.z;
  })

  // renderer.render(scene, camera);
  // requestAnimationFrame(update(pointCloud, asteroids, renderer, scene, camera))
}

const sketch = ({ context }) => {

  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
    alpha: true,
  });
  renderer.setClearColor("#121212", 1);

  // CAMERA
  const camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
  camera.position.set(30, 5, 35);

  // ORBIT CONTROLS
  const controls = new THREE.OrbitControls(camera, context.canvas);
  controls.target.set(0, 5, 0);

  // SCENE
  const scene = new THREE.Scene();

  // TEXTURES
  const loader = new THREE.TextureLoader();
  const earthTexture = loader.load("../assets/earth.jpg");

  // // MATERIALS
  
  const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
  const material = new THREE.PointsMaterial({
    color: 0x555555
  });

  // MESHES
  const geometry = new THREE.Geometry();

  let x, y, z;
  for (let i = 0; i < 2000; i++) {
    x = (Math.random() * SCREEN_WIDTH * 2) - SCREEN_WIDTH;
    y = (Math.random() * SCREEN_HEIGHT * 2) - SCREEN_HEIGHT;
    z = (Math.random() * 3000) - 1500;

    geometry.vertices.push(new THREE.Vector3(x, y, z));
  };

  const asteroids = createAsteroids(scene);

  const earthGeometry = new THREE.SphereGeometry(1, 32, 16);
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  earthMesh.position.set(0, 0, 0);
  earthMesh.scale.setScalar(15);
  scene.add(earthMesh);

  //LIGHTING
  const pointCloud = new THREE.PointCloud(geometry, material);
  scene.add(pointCloud);
  const light = new THREE.PointLight("white", 1.25);
  light.position.set(0, 0, 0);
  scene.add(light);

  // illuminate the earth
  createSpotlights(scene);

  return {
    render({ time }) {
      earthMesh.rotation.y = time * 0.15;

      controls.update();
      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      renderer.render(scene, camera);
      // requestAnimationFrame(update(pointCloud, asteroids, renderer, scene, camera));
    },

    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);