// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";

// Services

// Styles

// Assets

export const PlotItemLogic = ({ item }) => {
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

	return { changeItemLabel, changeItemText, isDisplayingPlotItemAddToGroupMenu, showPlotItemAddToGroupMenu, hidePlotItemAddToGroupMenu };
};
