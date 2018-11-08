import * as THREE from 'three';

import OrbitControls from 'three-orbitcontrols';

import MengerState from './States/Menger';
import SierpinskyState from './States/Sierpinsky';
import MandelbrotState from './States/Mandelbrot';

class SceneWrapper {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        this.state = -1;
        this.stateList = [];

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

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.shadowMap.enabled = true;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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

        const object = new THREE.AxesHelper();
        object.position.set(0, 0, 0);
        object.scale.x = object.scale.y = object.scale.z = 1;
        this.scene.add(object);

        // scene basic lights
        const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambLight);

        const dirLigth = new THREE.DirectionalLight(0xffffff, 0.3);
        this.scene.add(dirLigth);

        const spotLight = new THREE.SpotLight(0xffffff, 0.75);
        spotLight.position.set(100, 100, 50);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        this.scene.add(spotLight);


        this.stateList.push(new SierpinskyState(this));
        this.stateList.push(new MengerState(this));
        this.stateList.push(new MandelbrotState(this));

        this.switchState(2);
    }

    run(delta = 0) {
        if (this.running) {
            this.controls.update(delta);
            this.stateList[this.state].update(delta);
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.run.bind(this));
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

    switchState(state) {
        this.clean();

        this.state = state;
        this.stateList[state].init();
    }

    /**
     * Removes all elements from the scene
     */
    clean() {
        this.removeItem(this.scene);
    }

    removeItem(obj) {
        for(let i = obj.children.length - 1; i >= 0; i--) {
            if(obj.children[i].shouldBeDeletedOnStateChange === true) {
                this.removeItem(obj.children[i]);
                obj.remove(obj.children[i]);
            }
        }
    }
}

export default SceneWrapper;
