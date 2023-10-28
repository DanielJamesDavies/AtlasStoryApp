// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";

// Services

// Styles

// Assets

export const PlotItemLogic = ({ item, plot_index }) => {
	const { unit, setUnit } = useContext(UnitPageContext);

	function changeItemLabel(e) {
		let newUnit = JSON.parse(JSON.stringify(unit));
		const itemIndex = newUnit?.data?.plot?.items?.findIndex((e) => e._id === item._id);
		if (itemIndex === -1) return;
		newUnit.data.plot.items[itemIndex].label = e.target.value;
		setUnit(newUnit);
	}

	function changeItemText(e) {
		let newUnit = JSON.parse(JSON.stringify(unit));
		const itemIndex = newUnit?.data?.plot?.items?.findIndex((e) => e._id === item._id);
		if (itemIndex === -1) return;
		newUnit.data.plot.items[itemIndex].text = e.target.value.split("\n");
		setUnit(newUnit);
	}

	const [isDisplayingPlotItemAddToGroupMenu, setIsDisplayingPlotItemAddToGroupMenu] = useState(false);

	function showPlotItemAddToGroupMenu() {
		setIsDisplayingPlotItemAddToGroupMenu(true);
	}

	function hidePlotItemAddToGroupMenu() {
		setIsDisplayingPlotItemAddToGroupMenu(false);
	}

	function reorderItemImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newUnit = JSON.parse(JSON.stringify(unit));
		const tempItemImage = newUnit.data.plot.items[plot_index].images.splice(res.from, 1)[0];
		newUnit.data.plot.items[plot_index].images.splice(res.to, 0, tempItemImage);
		setUnit(newUnit);
	}

	function changeImageCaption(e, index) {
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.items[plot_index].images[index].caption = e.target.value;
		setUnit(newUnit);
	}

	function removeItemImage(index) {
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.items[plot_index].images.splice(index, 1);
		setUnit(newUnit);
	}

	return {
		changeItemLabel,
		changeItemText,
		isDisplayingPlotItemAddToGroupMenu,
		showPlotItemAddToGroupMenu,
		hidePlotItemAddToGroupMenu,
		reorderItemImages,
		changeImageCaption,
		removeItemImage,
	};
};
