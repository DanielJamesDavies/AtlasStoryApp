async function getImageFromFile(file, options) {
	let maxFileSizeInKBs = options?.maxFileSizeInKBs;
	if (maxFileSizeInKBs === undefined) maxFileSizeInKBs = 500;

	return await new Promise((resolve) => {
		const fr = new FileReader();

		fr.readAsDataURL(file);

		fr.onload = async () => {
			if (!options?.ignoreMaxFileSize) {
				const newImage = await resizeBase64Image(fr.result, maxFileSizeInKBs);
				if (newImage === false) resolve({ error: "Image Too Large." });
				resolve({ data: newImage });
			} else {
				resolve({ data: fr.result });
			}
		};

		fr.onerror = (error) => {
			resolve({ error });
		};
	});
}

async function resizeBase64Image(base64, maxFileSizeInKBs, attempt) {
	if (attempt > 40) return false;

	return await new Promise((resolve) => {
		const image = document.createElement("img");
		image.crossOrigin = "anonymous";
		image.src = base64;

		image.onload = (e) => {
			const canvas = document.createElement("canvas");

			const max = attempt <= 10 ? 1920 : 1280 - (attempt - 10) * 26;
			if (e.target.width === e.target.height && e.target.width > max) {
				canvas.width = max;
				canvas.height = max;
			} else if (e.target.width > e.target.height && e.target.width > max) {
				canvas.width = max;
				canvas.height = e.target.height * (max / e.target.width);
			} else if (e.target.width < e.target.height && e.target.height > max) {
				canvas.width = e.target.width * (max / e.target.height);
				canvas.height = max;
			} else {
				canvas.width = e.target.width;
				canvas.height = e.target.height;
			}

			canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);

			let quality = 1;
			if (attempt !== undefined) {
				if (attempt <= 10) {
					quality = 1 - (attempt - 1) / 10;
				} else {
					quality = 10 / attempt;
				}
			}
			let newBase64 = canvas.toDataURL("image/webp", quality);

			if (getBase64FileSize(newBase64) / 1000 > maxFileSizeInKBs)
				newBase64 = resizeBase64Image(base64, maxFileSizeInKBs, attempt === undefined ? 2 : attempt + 1);

			resolve(newBase64);
		};
	});
}

function getBase64FileSize(base64) {
	return base64.length * (3 / 4) - (base64.slice(-2) === "==" ? 2 : 1);
}

export default getImageFromFile;
