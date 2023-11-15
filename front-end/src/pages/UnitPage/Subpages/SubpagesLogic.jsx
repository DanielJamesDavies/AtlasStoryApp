// Packages
import { useState, useContext, useEffect, useRef } from "react";

// Components
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Psychology } from "./Subpages/Psychology/Psychology";
import { Biography } from "./Subpages/Biography/Biography";
import { Abilities } from "./Subpages/Abilities/Abilities";
import { Physical } from "./Subpages/Physical/Physical";
import { Relationships } from "./Subpages/Relationships/Relationships";
import { Plot } from "./Subpages/Plot/Plot";
import { Soundtrack } from "./Subpages/Soundtrack/Soundtrack";
import { Details } from "./Subpages/Details/Details";
import { Events } from "./Subpages/Events/Events";
import { Miscellaneous } from "./Subpages/Miscellaneous/Miscellaneous";
import { Development } from "./Subpages/Development/Development";
import { Settings } from "./Subpages/Settings/Settings";
import { Custom } from "./Subpages/Custom/Custom";

// Logic

// Context
import { UnitPageContext } from "../UnitPageContext";

// Services

// Styles

// Assets

export const SubpagesLogic = () => {
	const { unit_type, openSubpageID, allSubpages, unit } = useContext(UnitPageContext);

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
			if (!allSubpages.find((e) => e.id === openSubpageID)?.unit_types?.includes(unit_type)) return null;
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
				case "plot":
					return <Plot />;
				case "soundtrack":
					return <Soundtrack />;
				case "details":
					return <Details />;
				case "events":
					return <Events />;
				case "miscellaneous":
					return <Miscellaneous />;
				case "development":
					return <Development />;
				case "settings":
					return <Settings />;
				default:
					return <Custom />;
			}
		}
		setSubpage(getSubpage());
	}, [unit_type, openSubpageID, allSubpages]);

	return { subpageContainerRef, subpage, unit };
};
