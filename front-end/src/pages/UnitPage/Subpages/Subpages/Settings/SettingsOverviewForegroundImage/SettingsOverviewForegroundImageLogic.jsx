// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RecentDataContext } from "../../../../../../context/RecentDataContext";

// Services

// Styles

// Assets

export const SettingsOverviewForegroundImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion, changeUnitVersion, unitOverviewForegrounds, setUnitOverviewForegrounds } =
		useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	function changeOverviewForeground(image) {
		let newUnitOverviewForegrounds = JSON.parse(JSON.stringify(unitOverviewForegrounds));
		const newUnitOverviewForegroundsIndex = newUnitOverviewForegrounds.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(unitVersion._id)
		);
		if (newUnitOverviewForegroundsIndex === -1) return false;
		if (
			newUnitOverviewForegrounds[newUnitOverviewForegroundsIndex]?.image?.image ||
			newUnitOverviewForegrounds[newUnitOverviewForegroundsIndex]?.image?.image === undefined
		)
			newUnitOverviewForegrounds[newUnitOverviewForegroundsIndex].image.image = image;
		setUnitOverviewForegrounds(newUnitOverviewForegrounds);
	}

	function changeOverviewForegroundAlignment(e, alignment) {
		const newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.overviewForeground.alignment = alignment;
		changeUnitVersion(newUnitVersion);
	}

	function changeOverviewForegroundPosition(e, position) {
		const newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.overviewForeground.position = position;
		changeUnitVersion(newUnitVersion);
	}

	function changeOverviewForegroundScale(e) {
		const newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.overviewForeground.scale = e.target.value;
		changeUnitVersion(newUnitVersion);
	}

	function removeOverviewForeground() {
		changeOverviewForeground(undefined);
	}

	async function revertOverviewForeground() {
		let newUnitOverviewForegrounds = JSON.parse(JSON.stringify(unitOverviewForegrounds));
		const newUnitOverviewForegroundsIndex = newUnitOverviewForegrounds.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(unitVersion._id)
		);
		if (newUnitOverviewForegroundsIndex === -1) return false;

		const response = await APIRequest("/image/" + unitVersion?.overviewForeground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		newUnitOverviewForegrounds[newUnitOverviewForegroundsIndex].image = response.data.image;
		setUnitOverviewForegrounds(newUnitOverviewForegrounds);
		return true;
	}

	async function saveOverviewForeground() {
		if (!unitVersion?.overviewForeground || !unitOverviewForegrounds) return false;

		let newUnitOverviewForegrounds = JSON.parse(JSON.stringify(unitOverviewForegrounds));
		const newUnitOverviewForegroundsIndex = newUnitOverviewForegrounds.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(unitVersion._id)
		);
		if (newUnitOverviewForegroundsIndex === -1 || newUnitOverviewForegrounds[newUnitOverviewForegroundsIndex]?.image?.image === "NO_IMAGE")
			return false;

		const newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.overviewForeground.scale = parseFloat(newUnitVersion.overviewForeground.scale);
		changeUnitVersion(newUnitVersion);

		const unit_response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "overviewForeground"],
			newValue: unitVersion.overviewForeground,
		});
		if (!unit_response || unit_response?.errors) return false;

		const response = await APIRequest("/image/" + unitVersion?.overviewForeground?.image, "PATCH", {
			newValue: newUnitOverviewForegrounds[newUnitOverviewForegroundsIndex]?.image?.image,
			story_id: story._id,
			unit_id: unit._id,
		});
		if (!response || response?.errors) return false;
		addImagesToRecentImages([response?.data?.image]);
		return true;
	}

	return {
		unit_type,
		isAuthorizedToEdit,
		unitVersion,
		unitOverviewForegrounds,
		changeOverviewForeground,
		changeOverviewForegroundAlignment,
		changeOverviewForegroundPosition,
		changeOverviewForegroundScale,
		removeOverviewForeground,
		revertOverviewForeground,
		saveOverviewForeground,
	};
};
