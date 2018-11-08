precision highp float;
uniform float zoom;
varying vec2 pos;

void main () {
    pos = position.xy * zoom;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}