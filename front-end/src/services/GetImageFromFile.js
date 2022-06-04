async function getImageFromFile(file) {
	return await new Promise((resolve) => {
		const fr = new FileReader();

		fr.readAsDataURL(file);

		fr.onload = () => {
			let image = new Image();
			image.onload = async () => {
				resolve({ data: fr.result });
			};

			image.src = fr.result;
		};

		fr.onerror = (error) => {
			resolve({ error });
		};
	});
}

export default getImageFromFile;
