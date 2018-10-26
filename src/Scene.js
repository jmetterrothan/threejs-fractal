import THREE from 'three';

import './OrbitControls';

import MengerState from './Menger';
import SierpinskyState from './Sierpinsky';

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

        const object = new THREE.AxisHelper();
        object.position.set(0, 0, 0);
        object.scale.x = object.scale.y = object.scale.z = 1;
        this.scene.add(object);

        // scene basic lights
        const ambLight = new THREE.AmbientLight(0xffffff, 0.25);
        this.scene.add(ambLight);

        const spotLight = new THREE.SpotLight(0xffffff, 0.9);
        spotLight.position.set(100, 100, 25);

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        this.scene.add(spotLight);


        this.state = new SierpinskyState(this);
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
