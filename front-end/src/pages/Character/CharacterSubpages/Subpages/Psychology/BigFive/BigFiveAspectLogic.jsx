// Packages
import { useEffect } from "react";
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";

// Services

// Styles

// Assets

export const BigFiveAspectLogic = ({ aspect }) => {
	const { characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const [aspectValueText, setAspectValueText] = useState("");

	useEffect(() => {
		function getAspectValueText() {
			let newAspectValueText = "";
			const valuePercentage = parseInt(characterVersion.psychology.bigFive[aspect.id]);
			if (valuePercentage <= 4) {
				newAspectValueText = "Exceptionally Low";
			} else if (valuePercentage <= 14) {
				newAspectValueText = "Very Low";
			} else if (valuePercentage <= 24) {
				newAspectValueText = "Low";
			} else if (valuePercentage <= 39) {
				newAspectValueText = "Moderately Low";
			} else if (valuePercentage <= 60) {
				newAspectValueText = "Typical";
			} else if (valuePercentage <= 75) {
				newAspectValueText = "Moderately High";
			} else if (valuePercentage <= 85) {
				newAspectValueText = "High";
			} else if (valuePercentage <= 95) {
				newAspectValueText = "Very High";
			} else if (valuePercentage <= 100) {
				newAspectValueText = "Exceptionally High";
			}
			setAspectValueText(newAspectValueText);
		}
		getAspectValueText();
	}, [aspect, characterVersion]);

	function getPercentileText(percentile) {
		var s = ["th", "st", "nd", "rd"];
		var v = percentile % 100;
		return percentile + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	function changeBigFiveAspect(e) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.bigFive[aspect.id] = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	return { characterVersion, aspectValueText, getPercentileText, changeBigFiveAspect };
};
