import * as THREE from 'three';

const numParticles = 200; 
const particleSize = 0.8; 
const sphereRadius = 150; 
const particles = []; 
let partA, partR, partG, partB;

class Particle {
  constructor(theta, phi) {
    this.theta = theta;
    this.phi = phi;
    this.origPos = new THREE.Vector3(
      sphereRadius * Math.sin(this.phi) * Math.cos(this.theta),
      sphereRadius * Math.sin(this.phi) * Math.sin(this.theta),
      sphereRadius * Math.cos(this.phi)
    );
    this.pos = this.origPos.clone();
  }

  update(t) {
    let x = this.origPos.x + 20 * Math.cos(t + this.theta) * Math.sin(this.phi);
    let y = this.origPos.y + 20 * Math.sin(t + this.phi) * Math.sin(this.theta);
    let z = this.origPos.z + 20 * Math.cos(this.phi);
    this.pos.set(x, y, z);
  }

  display() {
    let geometry = new THREE.SphereGeometry(particleSize);
    let material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(partR / 255, partG / 255, partB / 255),
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(this.pos);
    scene.add(mesh);
  }
}

let scene, camera, renderer;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 400;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  partR = Math.random() * 20 + 200;
  partG = Math.random() * 55 + 200;
  partB = Math.random() * 30 + 220;
  partA = Math.random() * 7 + 5;

  for (let i = 0; i < numParticles; i++) {
    let theta = Math.random() * Math.PI * 2;
    let phi = Math.random() * Math.PI;
    particles.push(new Particle(theta, phi));
  }
}

function animate() {
  requestAnimationFrame(animate);
  let t = performance.now() * 0.001;
  for (let i = 0; i < numParticles; i++) {
    let particle = particles[i];
    particle.update(t);
    particle.display();
  }
  renderer.render(scene, camera);
}

function main() {
  init();
  animate();
}

main();
