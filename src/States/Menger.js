import * as THREE from 'three';

import State from './State';

const CUBE_MATERIAL = new THREE.MeshPhongMaterial({ color: 0x61dfe2, flatShading: true, shininess: 2 });

/**
 * Creates a cube with THREE
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} s Size of the cube
 */
const createCube = (x, y, z, s) => {
    const geometry = new THREE.BoxBufferGeometry(s, s, s);
    const mesh = new THREE.Mesh(geometry, CUBE_MATERIAL);

    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    mesh.shouldBeDeletedOnStateChange = true;

    return mesh;
};

/**
 * Menger sponge algorithm implementation
 * @param {THREE.Scene} scene 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} s Size of the cube
 * @param {number} it Number of iterations
 * @param {number} lvl Current level
 */
const menger = (scene, x, y, z, s, it, lvl = 0) => {
    if (it === lvl) {
        scene.add(createCube(x, y, z, s));
    }
    else {
        const ns = s / 3;
        
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                for(let k = 0; k < 3; k++) {
                    if((i !== 1 && j !== 1) || (k !== 1 && j !== 1) || (i !== 1 && k !== 1)) { 
                        menger(scene, x + i * ns, y + j * ns, z + k * ns, ns, it, lvl + 1);
                    }
                }
            } 
        }
    }
};

export default class MengerState extends State
{
    init() {
        // Use Menger's algorithm to generate the sponge in the scene
        menger(this.sceneWrapper.scene, -1.5, -1.5, -1.5, 3, 3);


        // lights
        const spotLight = new THREE.SpotLight(0xffffff, 0.2);
        spotLight.position.set(0, 100, 50);
        spotLight.castShadow = true;
        spotLight.shouldBeDeletedOnStateChange = true;
        this.sceneWrapper.scene.add(spotLight);


        this.sceneWrapper.createAxesHelper();
        this.sceneWrapper.camera.position.set(-5, 4, 5);
    }
}