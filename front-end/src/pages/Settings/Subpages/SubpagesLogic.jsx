// Packages
import { useContext, useEffect, useState } from "react";

// Components
import { Account } from "./Account/Account";
import { SecurityPrivacy } from "./SecurityPrivacy/SecurityPrivacy";
import { Appearance } from "./Appearance/Appearance";
import { Connections } from "./Connections/Connections";
import { Cookies } from "./Cookies/Cookies";

// Logic

// Context
import { SettingsContext } from "../SettingsContext";

// Services

// Styles

// Assets

export const SubpagesLogic = () => {
	const { openSubpageID } = useContext(SettingsContext);
	const [subpage, setSubpage] = useState(null);

	useEffect(() => {
		switch (openSubpageID) {
			case "account":
				setSubpage(<Account />);
				break;
			case "security&privacy":
				setSubpage(<SecurityPrivacy />);
				break;
			case "appearance":
				setSubpage(<Appearance />);
				break;
			case "connections":
				setSubpage(<Connections />);
				break;
			case "cookies":
				setSubpage(<Cookies />);
				break;
			default:
				setSubpage(null);
		}
	}, [setSubpage, openSubpageID]);

	return { subpage };
};
