// Packages
import { useState, useContext, useEffect, useRef } from "react";

// Components
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Psychology } from "./Subpages/Psychology/Psychology";
import { Biography } from "./Subpages/Biography/Biography";
import { Abilities } from "./Subpages/Abilities/Abilities";
import { Physical } from "./Subpages/Physical/Physical";
import { Relationships } from "./Subpages/Relationships/Relationships";
import { Miscellaneous } from "./Subpages/Miscellaneous/Miscellaneous";
import { Development } from "./Subpages/Development/Development";
import { Settings } from "./Subpages/Settings/Settings";

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services

// Styles

// Assets

export const CharacterSubpagesLogic = () => {
	const { openSubpageID } = useContext(CharacterContext);

	const subpageContainerRef = useRef();

	useEffect(() => {
		const subpageContainerRefCurrent = subpageContainerRef?.current;
		function onWheel(e) {
			if (subpageContainerRefCurrent?.scrollTop === 0) return;
			e.stopPropagation();
		}
		subpageContainerRefCurrent?.addEventListener("wheel", onWheel);
		return () => subpageContainerRefCurrent?.removeEventListener("wheel", onWheel);
	}, [subpageContainerRef]);

	const [subpage, setSubpage] = useState(null);

	useEffect(() => {
		function getSubpage() {
			switch (openSubpageID) {
				case "gallery":
					return <Gallery />;
				case "psychology":
					return <Psychology />;
				case "biography":
					return <Biography />;
				case "abilities":
					return <Abilities />;
				case "physical":
					return <Physical />;
				case "relationships":
					return <Relationships />;
				case "miscellaneous":
					return <Miscellaneous />;
				case "development":
					return <Development />;
				case "settings":
					return <Settings />;
				default:
					return null;
			}
		}
		setSubpage(getSubpage());
	}, [openSubpageID]);

	return { subpageContainerRef, subpage };
};
