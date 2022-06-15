// Packages
import { useState, useContext, useEffect } from "react";

// Components
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Psychology } from "./Subpages/Psychology/Psychology";
import { Settings } from "./Subpages/Settings/Settings";

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services

// Styles

// Assets

export const CharacterSubpagesLogic = () => {
	const { openSubpageID } = useContext(CharacterContext);
	const [subpage, setSubpage] = useState(null);

	useEffect(() => {
		function getSubpage() {
			switch (openSubpageID) {
				case "gallery":
					return <Gallery />;
				case "psychology":
					return <Psychology />;
				case "efforts":
					return null;
				case "abilities":
					return null;
				case "physical":
					return null;
				case "relationships":
					return null;
				case "miscellaneous":
					return null;
				case "development":
					return null;
				case "settings":
					return <Settings />;
				default:
					return null;
			}
		}
		setSubpage(getSubpage());
	}, [openSubpageID]);

	return { subpage };
};
