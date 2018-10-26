import THREE from 'three';

const PYRAMID_MATERIAL = new THREE.MeshLambertMaterial({ color: 0x4fb99f });

export default class SierpinskyState 
{
    constructor(sceneWrapper) {
        this.sceneWrapper = sceneWrapper;
    }

    init() {
        // pyramid
        const createPyramid = (x, y, z, b, h) => {
            const geometry = new THREE.ConeBufferGeometry(b, h, 4, 1);
            const mesh = new THREE.Mesh(geometry, PYRAMID_MATERIAL);

            mesh.position.set(x, y, z);
            mesh.receiveShadow = true;

            this.sceneWrapper.scene.add(mesh);
        };

        const sierpinsky = (x, y, z, b, h, it, lvl = 0) => {
            if (it === lvl) {
                createPyramid(x, y, z, b, h);
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
                    sierpinsky(x + point[0], y + point[1], z + point[2], nb, nh, it, lvl + 1);
                });
            }
        };
        

        sierpinsky(0, 0, 0, 10, 10, 4);
    }

    update() {
        
    }
}