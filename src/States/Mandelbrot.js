import * as THREE from 'three';

import mandelbrotVs from '../assets/shaders/mandelbrot.vs.glsl';
import mandelbrotFs from '../assets/shaders/mandelbrot.fs.glsl';

export default class MandelbrotState 
{
    constructor(sceneWrapper) {
        this.sceneWrapper = sceneWrapper; 
    }

    init() {
        const material = new THREE.ShaderMaterial({
            uniforms: {
                zoom: { type: 'f', value: 0.05 }
            },
            vertexShader: mandelbrotVs,
            fragmentShader: mandelbrotFs,
            lights: true,
        });
        const geometry = new THREE.PlaneGeometry(2, 2, 0);

        this.planeMesh = new THREE.Mesh(geometry, material);

        this.planeMesh.position.set(0, 0, 0);
        this.planeMesh.shouldBeDeletedOnStateChange = true;

        this.sceneWrapper.scene.add(this.planeMesh);

        this.sceneWrapper.camera.position.set(0, 0, 30);
    }

    update(delta) {
        this.planeMesh.material.uniforms.zoom.value = Math.cos(delta / 500) + 1.5;
    }
}