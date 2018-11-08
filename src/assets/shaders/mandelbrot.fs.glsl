precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

const int MAX_ITERATIONS = 256;
const float SOFT_COLORING_FACTOR = 0.2;

// Source : https://www.shadertoy.com/view/lsX3W4

void main () {
    vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / u_resolution.xy;
    p.x *= u_resolution.x / u_resolution.y;

    // animation	
	float tz = 0.5 - 0.5 * cos(0.225 * u_time);
    float zoom = pow(0.5, 13.0 * tz); // zoom speed factor in the second arg
	vec2 c = vec2(-0.05, 0.6805) + p * zoom; // zoom target

    // iterate
    float di =  1.0;
    vec2 z = vec2(0.0);
    float m2 = 0.0;
    vec2 dz = vec2(0.0);

    for (int i = 0; i < MAX_ITERATIONS; i++) {
        if(m2 > 1024.0) { di = 0.0; break; }

        dz = 2.0 * vec2(z.x * dz.x - z.y * dz.y, z.x * dz.y + z.y * dz.x) + vec2(1.0, 0.0);		
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
			
        m2 = dot(z, z);
    }

    // distance	
	float d = 0.5 * sqrt(dot(z, z) / dot(dz, dz)) * log(dot(z, z));
    if (di > 0.5) d = 0.0;
	
    // soft coloring based on distance
	d = clamp(pow(abs(50.0 * d / zoom), SOFT_COLORING_FACTOR), 0.0, 1.0);

    gl_FragColor = vec4(vec3(d) * vec3(0.50, 0.69, 0.63), 1.0);
}