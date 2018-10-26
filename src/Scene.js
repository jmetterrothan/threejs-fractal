import THREE from 'three';

import './OrbitControls';
import State from './State';

class Scene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        this.state = null;

        // state of the animation (play/pause)
        this.running = false;
    }
    
    /**
     * Main initialization of the scene
     */
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 20);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.shadowMap.enabled = true;

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.center.set(0, 0, 0);
        this.controls.update();

        this.raycaster = new THREE.Raycaster(); 

        document.body.appendChild(this.renderer.domElement);


        // window resize handler
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        });

        // scene basic lights
        const ambLight = new THREE.AmbientLight(0xffffff, 0.75);
        this.scene.add(ambLight);

        const light = new THREE.PointLight(0xffffff, 0.65);
        light.position.set(0, 0, 20);
        light.castShadow = true;
        this.scene.add(light);

        this.state = new State(this.scene);
        this.state.init();
    }

    update(delta) {
        this.controls.update(delta);
        this.state.update();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    run(delta = 0) {
        requestAnimationFrame(this.run.bind(this));
        
        if (this.running) {
            this.update(delta);
        }
        this.render();
    }

    start() {
        this.running = true;
        this.run();
    }

    resume() {
        this.running = true;
    }

    pause() {
        this.running = false;
    }

    /**
     * Removes all elements from the scene
     */
    clean() {
        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]); 
        }
    }
}

export default Scene;
