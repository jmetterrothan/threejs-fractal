import * as THREE from 'three';

import State from './State';

const PYRAMID_MATERIAL = new THREE.MeshPhongMaterial({ color: 0x61dfe2, flatShading: true, shininess: 2 });

/**
 * Creates a pyramid with THREE
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} b Base
 * @param {number} h Height
 */
const createPyramid = (x, y, z, b, h) => {
    const geometry = new THREE.ConeBufferGeometry(b, h, 4, 1);
    const mesh = new THREE.Mesh(geometry, PYRAMID_MATERIAL);

    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    mesh.shouldBeDeletedOnStateChange = true;

    return mesh;
};

/**
 * Sierpinsky algorithm implementation
 * @param {THREE.Scene} scene 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} b Base
 * @param {number} h Height
 * @param {number} it Number of iterations
 * @param {number} lvl Current level
 */
const sierpinsky = (scene, x, y, z, b, h, it, lvl = 0) => {
    if (it === lvl) {
        scene.add(createPyramid(x, y, z, b, h));
    }    
    else {
        const nb = b / 2;
        const nh = h / 2;

        const childs = [
            [ 0, nh / 2 , 0 ],
            [ -nb, -nh / 2, 0 ],
            [ 0, -nh / 2, nb ],
            [ nb, -nh / 2, 0 ],
            [ 0, -nh / 2, -nb ],
        ];

        childs.forEach((point) => {
            sierpinsky(scene, x + point[0], y + point[1], z + point[2], nb, nh, it, lvl + 1);
        });
    }
};

export default class SierpinskyState extends State
{
    init() {
        // Use Sierpinsky's algorithm to generate the pyramids in the scene
        sierpinsky(this.sceneWrapper.scene, 0, 2, 0, 10, 10, 5);

        this.sceneWrapper.createAxesHelper();
        this.sceneWrapper.camera.position.set(0, -2, 20);
    }
}