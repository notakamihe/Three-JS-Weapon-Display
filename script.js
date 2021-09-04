import * as THREE from "./three.js/build/three.module.js"
import {GLTFLoader} from "./three.js/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
const renderer = new THREE.WebGL1Renderer()
const orbitControls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader()
const light = new THREE.PointLight(0xffffff, 10, 500)

let weapon
let autoRotate = true
let value = getRandomWeapon()
let hideUI = false

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

scene.background = new THREE.Color(0xffff00)
light.position.set(2, 2, 2)
camera.position.set(0, 0, 4)

scene.add(light)

changeWeapon(value)

function animate() {
  requestAnimationFrame(animate)

  orbitControls.listenToKeyEvents(window)
  orbitControls.autoRotate = autoRotate;
  orbitControls.autoRotateSpeed = 0.5
  orbitControls.keyPanSpeed = 1

  orbitControls.keys = {
    LEFT: 'KeyA', //left arrow
    UP: 'KeyW', // up arrow
    RIGHT: 'KeyD', // right arrow
    BOTTOM: 'KeyS'
  }

  orbitControls.update();

  renderer.render(scene, camera)
}

function changeWeapon(value) {
  removeWeapon()

  switch (value) {
    case "ak":
      loadWeapon("assets/ak.glb")
      scene.background = new THREE.Color(0xff6600)
      camera.position.set(0, 0, 4)
      break
    case "m16":
      loadWeapon("assets/m16.glb")
      scene.background = new THREE.Color(0x66ff88)
      camera.position.set(0, 0, 4)
      break
    case "boltaction":
      loadWeapon("assets/boltaction.glb")
      scene.background = new THREE.Color(0x88bb00)
      camera.position.set(2, 2, 2)
      break
    case "katana":
      loadWeapon("assets/katana.glb")
      scene.background = new THREE.Color(0xffff00)
      camera.position.set(-1, 9, 1.1)
      break
    case "musket":
      loadWeapon("assets/musket.glb")
      scene.background = new THREE.Color(0x0099ff)
      camera.position.set(0, 0, 3)
      break
    case "fn":
      loadWeapon("assets/fn.glb")
      scene.background = new THREE.Color(0xff6699)
      camera.position.set(0, 0, 4)
      break
    case "glock":
      loadWeapon("assets/glock.glb")
      scene.background = new THREE.Color(0xff0000)
      camera.position.set(0, 0, 6)
      break
    case "revolver":
      loadWeapon("assets/revolver.glb")
      scene.background = new THREE.Color(0xddaaff)
      camera.position.set(0, 5, 4)
      break
    case "sniper":
      loadWeapon("assets/sniper.glb")
      scene.background = new THREE.Color(0xdddddd)
      camera.position.set(0, 0, 4)
      break
    case "pump":
      loadWeapon("assets/pump.glb")
      scene.background = new THREE.Color(0x6600ff)
      camera.position.set(0, 0, 4)
      break
    case "mossberg":
      loadWeapon("assets/mossberg.glb")
      scene.background = new THREE.Color(0x111111)
      camera.position.set(0, 0, 4)
      break
    case "mac11":
      loadWeapon("assets/MAC11.glb")
      scene.background = new THREE.Color(0x66ffff)
      camera.position.set(0, 0, 4)
      break
  }
}

function getRandomWeapon() {
  const weapons = ["ak", "m16", "boltaction", "katana", "musket", "fn", "glock", "revolver", "sniper", "pump", "mossberg", "mac11"]

  return weapons[Math.floor(Math.random() * weapons.length)];
}

function loadWeapon(filename) {
  loader.load(filename, function(glb) {
    weapon = glb.scene
    glb.scene.rotation.set(0, 1.6, 0)
    scene.add(glb.scene)
  })
}

function removeWeapon() {
  if (weapon) {
    scene.remove(weapon)
    weapon = null
  }
}

animate()

document.addEventListener("keypress", function(e) {
  if (e.key.toLowerCase() === " ")
    autoRotate = !autoRotate

  if (e.key.toLowerCase() === "u") {
    hideUI = !hideUI
    const ui = document.querySelector("#ui")
    ui.style.display = hideUI ? "none" : "initial"
  }
})

document.addEventListener("keydown", function(e) {
  if (e.key.toLowerCase() === "q") {
    orbitControls.dollyIn(0.05)
  } else if (e.key.toLowerCase() === "e") {
    orbitControls.dollyOut(0.05)
  }
})

const weaponSelect = document.querySelector("#weapon-select")
weaponSelect.value = value

weaponSelect.addEventListener("change", function(e) {
  changeWeapon(e.target.value)
})
