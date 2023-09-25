// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const UnitImagesLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, unitImages, setUnitImages, unitVersion, changeUnitVersion } =
		useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const unitImagesContainerRef = useRef();

	useEffect(() => {
		const unitImagesContainerRefCurrent = unitImagesContainerRef?.current;

		function onunitImagesContainerScroll(e) {
			if (unitImagesContainerRefCurrent.children[0].scrollTop !== 0) e.stopPropagation();
		}

		unitImagesContainerRefCurrent?.addEventListener("wheel", onunitImagesContainerScroll);
		return () => unitImagesContainerRefCurrent?.removeEventListener("wheel", onunitImagesContainerScroll);
	}, [unitImagesContainerRef]);

	const addImageInputRef = useRef();

	async function onAddImageToUnitImages(e) {
		const image = await getImageFromFile(e.target.files[0]);
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.images.push(new_id_response.data._id);

		setUnit((oldUnit) => {
			let newUnit2 = JSON.parse(JSON.stringify(oldUnit));
			newUnit2.data.images = newUnit.data.images;
			return newUnit;
		});

		setUnitImages((oldUnitImages) => {
			let newUnitImages = JSON.parse(JSON.stringify(oldUnitImages));
			newUnitImages.push({ _id: new_id_response.data._id, image: image.data, isUnsaved: true });
			return newUnitImages;
		});

		return true;
	}

	function removeUnitImage(image_id) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const imageIndex = newUnit.data.images.findIndex((e) => e === image_id);
			if (imageIndex === -1) return newUnit;
			newUnit.data.images.splice(imageIndex, 1);
			return newUnit;
		});

		setUnitImages((oldunitImages) => {
			let newunitImages = JSON.parse(JSON.stringify(oldunitImages));
			const imageIndex = newunitImages.findIndex((e) => e._id === image_id);
			if (imageIndex === -1) return newunitImages;
			newunitImages.splice(imageIndex, 1);
			return newunitImages;
		});
	}

	const [isReorderingunitImages, setIsReorderingunitImages] = useState(false);
	function toggleIsReorderingunitImages() {
		setIsReorderingunitImages((oldIsReorderingunitImages) => !oldIsReorderingunitImages);
	}

	function reorderUnitImages(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const tempImage = newUnit.data.images.splice(res.from, 1)[0];
			newUnit.data.images.splice(res.to, 0, tempImage);
			return newUnit;
		});
	}

	async function revertUnitImages() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "images"],
		});

		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.images = response.data.value;
			return newUnit;
		});

		if (response?.data?.images) setUnitImages(response.data.images);

		return true;
	}

	async function saveUnitImages() {
		if (!unit?._id) return;
		let newValue = { images: unitImages };
		newValue[unit_type + "_images"] = unit.data.images;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "images"],
			newValue,
		});
		if (!response || response?.errors) return false;

		setUnitImages((oldunitImages) => {
			let newunitImages = JSON.parse(JSON.stringify(oldunitImages));
			newunitImages = newunitImages.map((image) => {
				let newImage = JSON.parse(JSON.stringify(image));
				if (newImage.isUnsaved !== undefined) delete newImage.isUnsaved;
				return newImage;
			});
			return newunitImages;
		});

		if (response?.data[unit_type]) {
			setUnit((oldUnit) => {
				let newUnit = JSON.parse(JSON.stringify(oldUnit));
				newUnit.data.images = response.data[unit_type].data.images;
				if (newUnit?.data?.versions) {
					newUnit.data.versions = newUnit.data.versions.map((version) => {
						version.gallery = version.gallery.filter(
							(galleryItem) => newUnit.data.images.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
						);
						return version;
					});
				}
				return newUnit;
			});

			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			if (newUnitVersion) {
				newUnitVersion.gallery = newUnitVersion.gallery.filter(
					(galleryItem) =>
						response.data[unit_type].data.images.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
				);
				changeUnitVersion(newUnitVersion);
			}
		}

		return true;
	}

	return {
		isAuthorizedToEdit,
		unit,
		unitImagesContainerRef,
		addImageInputRef,
		onAddImageToUnitImages,
		removeUnitImage,
		isReorderingunitImages,
		toggleIsReorderingunitImages,
		reorderUnitImages,
		revertUnitImages,
		saveUnitImages,
	};
};
