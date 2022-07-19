import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { BoxGeometry } from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl') //TODO: should this be included in the snippe

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry( 1,1,1 );

// Materials

const material = new THREE.MeshPhongMaterial()
material.color = new THREE.Color(0x0ffff0)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(1,1,1)
scene.add(light)

const pointLightHelper = new THREE.PointLightHelper( light );
scene.add( pointLightHelper );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

const gui = new dat.GUI()
const geometryFolder = gui.addFolder("Mesh Geometry");
geometryFolder.open();
const lightingFolder = geometryFolder.addFolder("Lighting");

lightingFolder.add(light.position, "x").min(-5).max(5).step(0.01).name("X Position")
lightingFolder.add(light.position, "y").min(-5).max(5).step(0.01).name("Y Position")
lightingFolder.add(light.position, "z").min(-5).max(5).step(0.01).name("Z Position")

const geometryF = geometryFolder.addFolder("Geometry");
geometryF.open();

const rotationFolder = geometryF.addFolder("Rotation");
rotationFolder.add(sphere.rotation, 'x', 0, Math.PI).name("X")
rotationFolder.add(sphere.rotation, 'y', 0, Math.PI).name("Y")
rotationFolder.add(sphere.rotation, 'z', 0, Math.PI).name("Z")

const scaleFolder = geometryF.addFolder("Scale");
scaleFolder.add(sphere.scale, 'x', 0, 2).name("X")
scaleFolder.add(sphere.scale, 'y', 0, 2).name("Y")
scaleFolder.add(sphere.scale, 'z', 0, 2).name("Z")

geometryF.close();

const meshFolder = geometryFolder.addFolder("Material")
const materialParams = {
    materialColor: sphere.material.color.getHex(),
};
meshFolder.add(sphere.material, 'wireframe');
meshFolder
    .addColor(materialParams, 'materialColor')
    .onChange((value) => sphere.material.color.set(value));

const updateCamera = () => {
    camera.updateProjectionMatrix();
}
const cameraFolder = geometryFolder.addFolder("Camera");
cameraFolder.add (camera, 'fov', 1, 180).name('Zoom').onChange(updateCamera);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()