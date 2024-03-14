function hexToHSL(hex) {
	let r = 0;
	let g = 0;
	let b = 0;

	let colour_min = 0;
	let colour_max = 0;
	let delta = 0;

	let h = 0;
	let s = 0;
	let l = 0;

	if (hex.length === 4) {
		r = "0x" + hex[1] + hex[1];
		g = "0x" + hex[2] + hex[2];
		b = "0x" + hex[3] + hex[3];
	} else if (hex.length === 7) {
		r = "0x" + hex[1] + hex[2];
		g = "0x" + hex[3] + hex[4];
		b = "0x" + hex[5] + hex[6];
	}

	r = r / 255;
	g = g / 255;
	b = b / 255;

	colour_min = Math.min(r, g, b);
	colour_max = Math.max(r, g, b);
	delta = colour_max - colour_min;

	if (delta === 0) {
		h = 0;
	} else if (colour_max === r) {
		h = ((g - b) / delta) % 6;
	} else if (colour_max === g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (colour_max + colour_min) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = parseFloat(s * 100).toFixed(1);
	l = parseFloat(l * 100).toFixed(1);

	return [h, s, l];
}

export default hexToHSL;
