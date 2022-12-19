// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";

// Services

// Styles

// Assets

export const HeaderLogic = () => {
	const { isAuthorizedToEdit, story, character, characters, selectedCharacterRelationshipsCharacterId } = useContext(CharacterContext);

	const [secondCharacter, setSecondCharacter] = useState(false);
	useEffect(() => {
		function getSecondCharacter() {
			if (!characters || !selectedCharacterRelationshipsCharacterId) return false;
			let newSecondCharacter = characters.find((e) => e._id === selectedCharacterRelationshipsCharacterId);
			setSecondCharacter(newSecondCharacter);
		}
		getSecondCharacter();
	}, [setSecondCharacter, selectedCharacterRelationshipsCharacterId, characters]);

	const headerRef = useRef();

	useEffect(() => {
		const headerRefCurrent = headerRef?.current;
		const onWheel = (e) => (headerRefCurrent?.scrollTop !== 0 ? e.stopPropagation() : null);
		if (headerRefCurrent) headerRefCurrent.addEventListener("wheel", onWheel);
		return () => (headerRefCurrent ? headerRefCurrent.removeEventListener("wheel", onWheel) : null);
	}, [headerRef]);

	function changeRelationshipType() {}

	return { isAuthorizedToEdit, headerRef, story, character, secondCharacter, changeRelationshipType };
};
