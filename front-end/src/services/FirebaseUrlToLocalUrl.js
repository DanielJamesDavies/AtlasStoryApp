async function firebaseUrlToLocalUrl(url, get_size) {
	try {
		const image_url = await new Promise((resolve) => {
			const xhr = new XMLHttpRequest();
			xhr.responseType = "blob";
			xhr.onload = () => {
				const blob = xhr.response;
				const url_creator = window.URL || window.webkitURL;
				const size = xhr.getResponseHeader("Content-Length");
				const image_url = url_creator.createObjectURL(blob);
				resolve(get_size ? { image_url, size } : image_url);
			};
			xhr.open("GET", url);
			xhr.send();
		});
		return image_url;
	} catch {
		return url;
	}
}

export default firebaseUrlToLocalUrl;
