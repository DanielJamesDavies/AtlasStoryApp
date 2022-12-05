import { createContext, useState, useEffect, useContext } from "react";
import { APIContext } from "./APIContext";
import { RecentDataContext } from "./RecentDataContext";

export const LightboxContext = createContext();

const LightboxProvider = ({ children }) => {
	const [lightboxImageIDs, setLightboxImageIDs] = useState([]);
	const [lightboxImages, setLightboxImages] = useState([]);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const { APIRequest } = useContext(APIContext);
	const { recentImages } = useContext(RecentDataContext);

	useEffect(() => {
		async function getLightboxImages() {
			setLightboxImages([]);

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
						newImage = image_response.data.image;
					}
					newImage.caption = image?.caption;
					return newImage;
				})
			);
			newLightboxImages = newLightboxImages.filter((e) => e !== false);

			setLightboxImages(newLightboxImages);
		}
		getLightboxImages();
	}, [lightboxImageIDs, setLightboxImages, APIRequest, recentImages]);

	return (
		<LightboxContext.Provider
			value={{ lightboxImageIDs, setLightboxImageIDs, lightboxImages, setLightboxImages, lightboxIndex, setLightboxIndex }}
		>
			{children}
		</LightboxContext.Provider>
	);
};

export default LightboxProvider;
