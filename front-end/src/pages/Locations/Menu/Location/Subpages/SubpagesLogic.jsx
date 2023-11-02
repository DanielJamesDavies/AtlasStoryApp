// Packages
import { useState, useContext, useEffect, useRef } from "react";

// Components
import { Description } from "./Subpages/Description/Description";
import { Properties } from "./Subpages/Properties/Properties";
import { Regions } from "./Subpages/Regions/Regions";
import { Places } from "./Subpages/Places/Places";
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Miscellaneous } from "./Subpages/Miscellaneous/Miscellaneous";
import { Development } from "./Subpages/Development/Development";
import { Settings } from "./Subpages/Settings/Settings";

// Logic

// Context
import { LocationContext } from "../LocationContext";
import { LocationsContext } from "../../../LocationsContext";

// Services

// Styles

// Assets

export const LocationSubpagesLogic = () => {
	const {
		setIsSelectingSurfaceMapComponents,
		setRegionSelectingSurfaceMapComponentsFor,
		setIsDrawingSurfaceMapComponents,
		setIsDeletingSurfaceMapComponents,
		setIsPositioningSurfaceMapPlace,
	} = useContext(LocationsContext);
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
			setIsSelectingSurfaceMapComponents(false);
			setRegionSelectingSurfaceMapComponentsFor(false);
			setIsDrawingSurfaceMapComponents(false);
			setIsDeletingSurfaceMapComponents(false);
			setIsPositioningSurfaceMapPlace(false);

			switch (openSubpageID) {
				case "description":
					return <Description />;
				case "properties":
					return <Properties />;
				case "regions":
					return <Regions />;
				case "places":
					return <Places />;
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
	}, [
		openSubpageID,
		setIsSelectingSurfaceMapComponents,
		setRegionSelectingSurfaceMapComponentsFor,
		setIsDrawingSurfaceMapComponents,
		setIsDeletingSurfaceMapComponents,
		setIsPositioningSurfaceMapPlace,
	]);

	return { subpageContainerRef, subpage };
};
