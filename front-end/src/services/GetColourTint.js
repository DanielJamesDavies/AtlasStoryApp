function getColourTint(hex) {
	hex = hex.replace("#", "");
	let amount = 60;

	const brightness = getColourBrightness(hex);

	if (brightness > 128) amount *= -1;

	let [r, g, b] = hex.match(/.{2}/g);

	r = Math.max(Math.min(255, parseInt(r, 16) + amount), 0).toString(16);
	if (parseInt(r, 16) + amount > 255) amount *= 0.5;
	g = Math.max(Math.min(255, parseInt(g, 16) + amount), 0).toString(16);
	b = Math.max(Math.min(255, parseInt(b, 16) + amount), 0).toString(16);

	return `#${(r.length < 2 ? "0" : "") + r}${(g.length < 2 ? "0" : "") + g}${(b.length < 2 ? "0" : "") + b}`;
}

function getColourBrightness(hex) {
	let int = parseInt(hex, 16);
	let r = (int >> 16) & 255;
	let g = (int >> 8) & 255;
	let b = int & 255;
	return (r + g + b) / 3;
}

export default getColourTint;
