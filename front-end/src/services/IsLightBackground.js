async function isLightBackground(base64, coords1, coords2) {
	var image = new Image();
	image.src = base64;
	return await new Promise((resolve, reject) => {
		image.onload = function () {
			if (coords1.length !== 2 || coords2.length !== 2) return resolve(false);
			const canvas = document.querySelector("canvas");
			const ctx = canvas.getContext("2d");
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0);
			const { data } = ctx.getImageData(0, 0, image.width, image.height);

			if (coords2[0] === -1) coords2[0] = canvas.width;
			if (coords2[1] === -1) coords2[1] = canvas.height;
			if (coords1[0] > coords2[0] || coords1[1] > coords2[1]) return resolve(false);

			let rgb = [0, 0, 0];
			for (let x = coords1[0]; x < coords2[0]; x++) {
				for (let y = coords1[1]; y < coords2[1]; y++) {
					const index = (x + y * canvas.width) * 4;
					rgb[0] += data[index];
					rgb[1] += data[index + 1];
					rgb[2] += data[index + 2];
				}
			}

			const pixelCount = (coords2[0] - coords1[0]) * (coords2[1] - coords1[1]);
			rgb[0] = rgb[0] / pixelCount;
			rgb[1] = rgb[1] / pixelCount;
			rgb[2] = rgb[2] / pixelCount;

			const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
			if (luma < 40 || isNaN(luma)) return resolve(false);
			return resolve(true);
		};
	});
}

export default isLightBackground;
