import THREE from 'three';

const CUBE_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x4fb99f });

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

            this.sceneWrapper.scene.add(mesh);
        };

        const menger = (x, y, z, s, it, lvl = 0) => {
            if (it === lvl) {
                createCube(x, y, z, s);
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
    }

    update() {
        
    }
}