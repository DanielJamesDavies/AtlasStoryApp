// Packages
import { useEffect } from "react";
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const SearchResultListItemLogic = ({ searchResult }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { APIRequest } = useContext(APIContext);
	const [icon, setIcon] = useState(false);

	function goToPage(e, path) {
		changeLocation(path, e.button === 1);
	}

	useEffect(() => {
		async function getIcon() {
			let icon_id = false;
			switch (searchResult?.modelType) {
				case "user":
					icon_id = searchResult?.data?.profilePicture;
					break;
				case "story":
					icon_id = searchResult?.data?.icon;
					break;
				default:
					break;
			}
			if (icon?._id === icon_id) return;

			const response = await APIRequest("/image/" + icon_id, "GET");
			if (!response?.data?.image || response?.error) return setIcon(false);
			setIcon({ _id: icon_id, image: response.data.image });
		}
		getIcon();
	}, [icon, setIcon, searchResult]);

	return { goToPage, icon };
};
