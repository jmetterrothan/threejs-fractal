import * as THREE from 'three';

import State from './State';

import mandelbrotVs from '../assets/shaders/mandelbrot.vs.glsl';
import mandelbrotFs from '../assets/shaders/mandelbrot.fs.glsl';

export default class MandelbrotState extends State
{
    init() {
        const canvas = this.sceneWrapper.renderer.domElement;

        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { type: 'f', value: 0.0 },
                u_resolution: { type: '2fv', value: new THREE.Vector2(canvas.width, canvas.height) }
            },
            vertexShader: mandelbrotVs,
            fragmentShader: mandelbrotFs,
        });
        const geometry = new THREE.PlaneBufferGeometry(10 * (canvas.width / canvas.height), 10);

        this.planeMesh = new THREE.Mesh(geometry, material);
        this.planeMesh.position.set(0, 0, 0);
        this.planeMesh.shouldBeDeletedOnStateChange = true;
        this.sceneWrapper.scene.add(this.planeMesh);

        this.sceneWrapper.camera.position.set(0, 0, 4);
        this.sceneWrapper.controls.enabled = false;
    }

    update(delta) {
        this.planeMesh.material.uniforms.u_time.value = delta / 1000;
    }

    onResize(w, h) {
        this.planeMesh.material.uniforms.u_resolution.value = new THREE.Vector2(w, h);
    }
}