async function resizeBase64Image(image, max_width = 700, max_height = 700) {
	let img = new Image();

	return await new Promise((resolve) => {
		img.onload = () => {
			let canvas = document.createElement("canvas");
			let width = img.width;
			let height = img.height;

			if (width > height) {
				if (width > max_width) {
					height *= max_width / width;
					width = max_width;
				}
			} else {
				if (height > max_height) {
					width *= max_height / height;
					height = max_height;
				}
			}

			canvas.width = width;
			canvas.height = height;
			let ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, width, height);

			resolve(canvas.toDataURL());
		};

		img.src = image;
	});
}

export default resizeBase64Image;
