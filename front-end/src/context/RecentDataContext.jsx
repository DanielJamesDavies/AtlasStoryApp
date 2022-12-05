import React, { createContext, useRef } from "react";

export const RecentDataContext = createContext();

const RecentDataProvider = ({ children }) => {
	const recentImages = useRef([]);

	function addImagesToRecentImages(newImages) {
		const limit = 150;
		let newRecentImages = JSON.parse(JSON.stringify(recentImages)).current;
		newRecentImages = newImages.concat(newRecentImages.filter((e) => newImages.findIndex((e2) => e2?._id === e?._id) === -1));
		if (newRecentImages.length > limit) newRecentImages = newRecentImages.slice(0, limit);
		recentImages.current = newRecentImages;
	}

	return <RecentDataContext.Provider value={{ recentImages, addImagesToRecentImages }}>{children}</RecentDataContext.Provider>;
};

export default RecentDataProvider;
