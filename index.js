import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-10);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(14.155, 1.485, 30, 96);
const material = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xfafad2 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("/space.jpg");
scene.background = spaceTexture;

// Avatar

const duncanTexture = new THREE.TextureLoader().load("./duncan.png");

const duncan = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: duncanTexture })
);

scene.add(duncan);

// earth

const earthTexture = new THREE.TextureLoader().load("/earth.png");
const normalTexture = new THREE.TextureLoader().load("/normal.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 15;
earth.position.x = 10;
earth.position.y = 10;

duncan.position.z = -5;
duncan.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  duncan.rotation.y += 0.04;
  duncan.rotation.z += 0.04;

  camera.position.z = t * -0.02;
  camera.position.x = t * -0.0005;
  camera.rotation.y = t * -0.0001;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  earth.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

// clipboard
// Get the copy button element by its ID
const copyBtn = document.getElementById("copy-text-btn");

// Add an event listener to the copy button that triggers the copyGmail function when clicked
copyBtn.addEventListener("click", copyGmail);

// The copyGmail function retrieves the email content and copies it to the clipboard
function copyGmail() {
  // Get the email content by its ID
  const copyGmail = document.getElementById("copy-text").innerText;

  // Use the navigator.clipboard API to copy the email content to the clipboard
  navigator.clipboard
    .writeText(copyGmail)
    .then(() => {
      // Display an alert message to the user when the email has been successfully copied
      alert("Email has been copied!");
    })
    .catch((error) => {
      // Display an error message to the user if the copy operation fails
      alert(`Failed to copy email: ${error}`);
    });
}
