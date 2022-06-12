module.exports = (image) => {
	let errors = [];

	if (!image) return { errors };

	const imageLength = image.split(",")[1].split("=")[0].length;
	const imageSize = Math.floor(imageLength - (imageLength / 8) * 2);

	console.log(imageSize, imageSize > 500000);
	if (imageSize > 500000) errors.push({ message: "This Image Is Too Large. Please Only Use Images That Are Below 500KBs" });
	return { size: imageSize, errors };
};
