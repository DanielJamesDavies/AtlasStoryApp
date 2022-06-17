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
	const { isAuthorizedToEdit, story, character, setCharacter, setCharacterImages } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const characterImagesRef = useRef();

	useEffect(() => {
		const characterImagesRefCurrent = characterImagesRef?.current;

		function onCharacterImagesContainerScroll(e) {
			if (characterImagesRefCurrent.scrollTop !== 0) e.stopPropagation();
		}

		characterImagesRefCurrent?.addEventListener("wheel", onCharacterImagesContainerScroll);
		return () => characterImagesRefCurrent?.removeEventListener("wheel", onCharacterImagesContainerScroll);
	}, [characterImagesRef]);

	const addImageInputRef = useRef();

	async function onAddImageInputChange(e) {
		const image = await getImageFromFile(e.target.files[0]);
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const create_image_response = await APIRequest("/image/", "POST", {
			image: image.data,
			story_id: story._id,
			character_id: character._id,
		});
		if (!create_image_response || create_image_response?.errors || !create_image_response?.data?.image?._id) return false;

		let newCharacterImages = JSON.parse(JSON.stringify(character))?.data?.images;
		newCharacterImages.push(create_image_response.data.image._id);

		const character_response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "images"],
			newValue: newCharacterImages,
		});
		if (!character_response || character_response?.errors) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.images = newCharacterImages;
			return newCharacter;
		});

		setCharacterImages((oldCharacterImages) => {
			let newCharacterImages = JSON.parse(JSON.stringify(oldCharacterImages));
			newCharacterImages.push(create_image_response.data.image);
			return newCharacterImages;
		});

		return true;
	}

	return {
		isAuthorizedToEdit,
		character,
		characterImagesRef,
		addImageInputRef,
		onAddImageInputChange,
	};
};
