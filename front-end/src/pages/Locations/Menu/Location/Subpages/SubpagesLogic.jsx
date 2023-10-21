// Packages
import { useState, useContext, useEffect, useRef } from "react";

// Components
import { Description } from "./Subpages/Description/Description";
import { Properties } from "./Subpages/Properties/Properties";
import { Regions } from "./Subpages/Regions/Regions";
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Miscellaneous } from "./Subpages/Miscellaneous/Miscellaneous";
import { Development } from "./Subpages/Development/Development";
import { Settings } from "./Subpages/Settings/Settings";

// Logic

// Context
import { LocationContext } from "../LocationContext";

// Services

// Styles

// Assets

export const LocationSubpagesLogic = () => {
	const { openSubpageID } = useContext(LocationContext);

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
				case "description":
					return <Description />;
				case "properties":
					return <Properties />;
				case "regions":
					return <Regions />;
				case "gallery":
					return <Gallery />;
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
