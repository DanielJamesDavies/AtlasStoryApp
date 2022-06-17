// Packages
import { useContext, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../CharacterContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const CharacterImagesLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter, characterImages, setCharacterImages, characterVersion, changeCharacterVersion } =
		useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const characterImagesContainerRef = useRef();

	useEffect(() => {
		const characterImagesContainerRefCurrent = characterImagesContainerRef?.current;

		function onCharacterImagesContainerScroll(e) {
			if (characterImagesContainerRefCurrent.children[0].scrollTop !== 0) e.stopPropagation();
		}

		characterImagesContainerRefCurrent?.addEventListener("wheel", onCharacterImagesContainerScroll);
		return () => characterImagesContainerRefCurrent?.removeEventListener("wheel", onCharacterImagesContainerScroll);
	}, [characterImagesContainerRef]);

	const addImageInputRef = useRef();

	async function onAddImageToCharacterImages(e) {
		const image = await getImageFromFile(e.target.files[0]);
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");

		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		let newCharacter = JSON.parse(JSON.stringify(character));
		newCharacter.data.images.push(new_id_response.data._id);

		setCharacter((oldCharacter) => {
			let newCharacter2 = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter2.data.images = newCharacter.data.images;
			return newCharacter;
		});

		setCharacterImages((oldCharacterImages) => {
			let newCharacterImages = JSON.parse(JSON.stringify(oldCharacterImages));
			newCharacterImages.push({ _id: new_id_response.data._id, image: image.data });
			return newCharacterImages;
		});

		return true;
	}

	function removeCharacterImage(image_id) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const imageIndex = newCharacter.data.images.findIndex((e) => e === image_id);
			if (imageIndex === -1) return newCharacter;
			newCharacter.data.images.splice(imageIndex, 1);
			return newCharacter;
		});

		setCharacterImages((oldCharacterImages) => {
			let newCharacterImages = JSON.parse(JSON.stringify(oldCharacterImages));
			const imageIndex = newCharacterImages.findIndex((e) => e._id === image_id);
			if (imageIndex === -1) return newCharacterImages;
			newCharacterImages.splice(imageIndex, 1);
			return newCharacterImages;
		});
	}

	async function revertCharacterImages() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "images"],
		});

		if (!response || response?.errors || !response?.data?.value) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.images = response.data.value;
			return newCharacter;
		});

		if (response?.data?.images) setCharacterImages(response.data.images);

		return true;
	}

	async function saveCharacterImages() {
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "images"],
			newValue: { character_images: character.data.images, images: characterImages },
		});
		if (!response || response?.errors) return false;

		if (response?.data?.character) {
			setCharacter((oldCharacter) => {
				let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
				newCharacter.data.images = response.data.character.data.images;
				newCharacter.data.versions = newCharacter.data.versions.map((version) => {
					version.gallery = version.gallery.filter(
						(galleryItem) => newCharacter.data.images.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
					);
					return version;
				});
				return newCharacter;
			});

			let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
			newCharacterVersion.gallery = newCharacterVersion.gallery.filter(
				(galleryItem) =>
					response.data.character.data.images.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
			);
			changeCharacterVersion(newCharacterVersion);
		}

		return true;
	}

	return {
		isAuthorizedToEdit,
		character,
		characterImagesContainerRef,
		addImageInputRef,
		onAddImageToCharacterImages,
		removeCharacterImage,
		revertCharacterImages,
		saveCharacterImages,
	};
};
