const TWO_PI = Math.PI * 2;

const degToRad = (deg) => {
    return deg * Math.PI / 180;
};

const radToDeg = (rad) => {
    return rad * 180 / Math.PI;
};

const lerp = (a, b, t) => {
    return (1 - t) * a + t * b;
};

/**
 * Modulo function that handles negative values
 * @param {number} x 
 * @param {number} m 
 * @return number
 */
const mod = (x, m) => {
    return (x % m + m) % m;
};

export default {
    TWO_PI,
    degToRad,
    radToDeg,
    lerp,
    mod,
};