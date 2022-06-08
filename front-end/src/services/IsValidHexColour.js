function isValidHexColour(colour) {
	if (!colour) return false;
	var colourArray = colour.split("");
	var isValid = colourArray
		.map((value, index) => {
			if (index === 0) {
				if (value === "#") return "y";
				return "n";
			} else {
				if (parseInt(value, 16).toString(16) === value) return "y";
				return "n";
			}
		})
		.join("");
	if (isValid !== "yyyyyyy" && isValid !== "yyyy") return false;
	return true;
}

export default isValidHexColour;
