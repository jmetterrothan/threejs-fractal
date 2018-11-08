import * as THREE from 'three';

import State from './State';

const CUBE_MATERIAL = new THREE.MeshPhongMaterial({ color: 0x61dfe2, flatShading: true, shininess: 2 });

export default class MengerState 
{
    constructor(sceneWrapper) {
        this.sceneWrapper = sceneWrapper;
    }

    init() {
        const createCube = (x, y, z, s) => {
            const geometry = new THREE.BoxBufferGeometry(s, s, s);
            const mesh = new THREE.Mesh(geometry, CUBE_MATERIAL);

            mesh.position.set(x, y, z);
            mesh.receiveShadow = true;
            mesh.shouldBeDeletedOnStateChange = true;

            return mesh;
        };

        const menger = (x, y, z, s, it, lvl = 0) => {
            if (it === lvl) {
                this.sceneWrapper.scene.add(createCube(x, y, z, s));
            }
            else {
                const ns = s / 3;
                
                for(let i = 0; i < 3; i++) {
                    for(let j = 0; j < 3; j++) {
                        for(let k = 0; k < 3; k++) {
                            if((i !== 1 && j !== 1) || (k !== 1 && j !== 1) || (i !== 1 && k !== 1)) { 
                                menger(x + i * ns, y + j * ns, z + k * ns, ns, it, lvl + 1);
                            }
                        }
                    } 
                }
            }
        };

        menger(-1.5, -1.5, -1.5, 3, 3);

        const spotLight = new THREE.SpotLight(0xffffff, 0.2);
        spotLight.position.set(0, 100, 50);
        spotLight.castShadow = true;
        spotLight.shouldBeDeletedOnStateChange = true;
        this.sceneWrapper.scene.add(spotLight);

        this.sceneWrapper.camera.position.set(-5, 4, 5);
    }

    update() {
        
    }

    onResize(w, h) {

    }
}