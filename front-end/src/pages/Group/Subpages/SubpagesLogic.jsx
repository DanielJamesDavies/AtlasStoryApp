// Packages
import { useState, useContext, useEffect, useRef } from "react";

// Components
import { Profile } from "./Subpages/Profile/Profile";
import { Gallery } from "./Subpages/Gallery/Gallery";
import { Miscellaneous } from "./Subpages/Miscellaneous/Miscellaneous";
import { Development } from "./Subpages/Development/Development";
import { Settings } from "./Subpages/Settings/Settings";

// Logic

// Context
import { GroupContext } from "../GroupContext";

// Services

// Styles

// Assets

export const GroupSubpagesLogic = () => {
	const { openSubpageID } = useContext(GroupContext);

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
				case "profile":
					return <Profile />;
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
