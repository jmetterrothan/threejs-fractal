import THREE from 'three';

export default class State 
{
    constructor(scene) {
        this.scene = scene;
    }

    init() {
        // pyramid
        const createPyramid = (x, y, z, b, h) => {
            const geometry = new THREE.ConeGeometry(b, h, 4, 1);

            const material = new THREE.MeshLambertMaterial({ color: 0xbbbbbb });
            material.shading = THREE.FlatShading;

            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(x, y, z);

            this.scene.add(mesh);
        }

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

        sierpinsky(0, 0, 0, 6, 6, 4);
    }

    update() {
        
    }
}