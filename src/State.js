import THREE from 'three';

export default class State 
{
    constructor(scene) {
        this.scene = scene;
    }

    init() {
        // pyramid
        const createCube = (x, y, z, s) => {
            const geometry = new THREE.BoxGeometry(s, s, s);

            const material = new THREE.MeshLambertMaterial({ color: 0xbbbbbb });
            material.shading = THREE.FlatShading;

            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(x, y, z);

            this.scene.add(mesh);
        }

        const menger = (x, y, z, s, it, lvl = 0) => {
            if (it === lvl) {
                createCube(x, y, z, s);
            }    
            else {
                const ns = s / 2;
                const list = [];
                for(let i = 0; i < 3; i++) {
                    for(let j = 0; j < 3; j++) {
                        for(let k = 0; k < 3; k++) {
                            list.push([ i, j, k ]);
                            if (j !== 1 && i !== 1) menger(x + i * ns, y + j * ns, z + k * ns, ns, it, lvl + 1);
                        }
                    } 
                }
                console.log(list)
            }
        };

        menger(0, 0, 0, 6, 1);
    }

    update() {
        
    }
}