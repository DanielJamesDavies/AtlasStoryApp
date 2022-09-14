// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";

// Services

// Styles

// Assets

export const PlotItemLogic = ({ item }) => {
	const { substory, setSubstory } = useContext(SubstoryContext);

	function changeItemLabel(e) {
		let newSubstory = JSON.parse(JSON.stringify(substory));
		const itemIndex = newSubstory?.data?.plot?.items?.findIndex((e) => e._id === item._id);
		if (itemIndex === -1) return;
		newSubstory.data.plot.items[itemIndex].label = e.target.value;
		setSubstory(newSubstory);
	}

	function changeItemText(e) {
		let newSubstory = JSON.parse(JSON.stringify(substory));
		const itemIndex = newSubstory?.data?.plot?.items?.findIndex((e) => e._id === item._id);
		if (itemIndex === -1) return;
		newSubstory.data.plot.items[itemIndex].text = e.target.value.split("\n");
		setSubstory(newSubstory);
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
