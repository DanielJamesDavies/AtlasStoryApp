import { createContext, useState, useEffect, useContext } from "react";

import { APIContext } from "./APIContext";
import { RecentDataContext } from "./RecentDataContext";

import firebaseUrlToLocalUrl from "../services/FirebaseUrlToLocalUrl";

export const LightboxContext = createContext();

const LightboxProvider = ({ children }) => {
	const [lightboxImageIDs, setLightboxImageIDs] = useState([]);
	const [lightboxImages, setLightboxImages] = useState([]);
	const [lightboxImageSizes, setLightboxImageSizes] = useState([]);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const { APIRequest } = useContext(APIContext);
	const { recentImages } = useContext(RecentDataContext);

	useEffect(() => {
		async function getLightboxImages() {
			setLightboxImages([]);
			setLightboxImageSizes([]);

			const newLightboxImageIDs = JSON.parse(JSON.stringify(lightboxImageIDs));

			let newLightboxImages = await Promise.all(
				newLightboxImageIDs.map(async (image) => {
					let imageID = image;
					if (typeof image === "object" && image?.image) imageID = image.image;

					let newImage = false;
					const recentImage = recentImages.current.find((e) => e?._id === imageID);
					if (recentImage) {
						newImage = recentImage;
					} else {
						const image_response = await APIRequest("/image/" + imageID, "GET");
						if (image_response?.errors || !image_response?.data?.image?.image) return false;

						if (image_response?.data?.is_download_url) {
							const { image_url, size } = await firebaseUrlToLocalUrl(image_response?.data?.image?.image, true);
							newImage = { _id: image_response.data.image?._id, image: image_url, size: size };
						} else {
							newImage = image_response.data.image;
						}
					}
					newImage.caption = image?.caption;
					return newImage;
				})
			);
			newLightboxImages = newLightboxImages.filter((e) => e !== false);

			setLightboxImages(newLightboxImages);

			let newLightboxImageSizes = await Promise.all(
				newLightboxImages.map(async (image) => {
					if (image?.size !== undefined) return { _id: image?._id, size: image?.size };

					const image_response = await APIRequest("/image/" + image?._id, "GET");
					if (image_response?.errors || !image_response?.data?.image?.image) return false;

					if (!image_response?.data?.is_download_url) return { _id: image_response.data.image?._id, size: 0 };

					const { size } = await firebaseUrlToLocalUrl(image_response?.data?.image?.image, true);
					return { _id: image?._id, size };
				})
			);

			setLightboxImageSizes(newLightboxImageSizes);
		}
		getLightboxImages();
	}, [lightboxImageIDs, setLightboxImages, APIRequest, recentImages]);

	return (
		<LightboxContext.Provider
			value={{
				lightboxImageIDs,
				setLightboxImageIDs,
				lightboxImages,
				setLightboxImages,
				lightboxImageSizes,
				lightboxIndex,
				setLightboxIndex,
			}}
		>
			{children}
		</LightboxContext.Provider>
	);
};

export default LightboxProvider;
