import 'reset-css';
import './assets/sass/style.scss';

import Scene from './Scene';

const scene = new Scene();

scene.init();
scene.start();

//  Change scene w/ the ui select element
const $uiSceneSelector = document.getElementById('uiScene');

$uiSceneSelector.addEventListener('change', () => {
    const index = parseInt($uiSceneSelector.value, 10);
    scene.switchState(index);
});