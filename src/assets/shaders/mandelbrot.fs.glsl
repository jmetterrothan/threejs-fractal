precision highp float;
varying vec2 pos;

void main () {
    vec2 fractal = pos;

    for (int i = 0; i < 20; i++) {
        fractal = pos + vec2(
            fractal.x * fractal.x - fractal.y * fractal.y,
            2.0 * fractal.x * fractal.y
        );

        // interpolate fractal color over position
        gl_FragColor = vec4(fractal, 0, 1);

        // if outside of fractal, use black
        if (length(fractal) > 1.5) {
            gl_FragColor = vec4(0, 0, 0, 1);
        }
    }
}