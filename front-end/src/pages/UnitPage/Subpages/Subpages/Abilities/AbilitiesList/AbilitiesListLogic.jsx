// Packages
import { useContext, useState, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilitiesListLogic = ({ currAbility, changeAbility, switchAbility }) => {
	const {
		unit_type,
		isAuthorizedToEdit,
		story,
		unit,
		unitVersion,
		changeUnitVersion,
		unitVersionItemCopying,
		changeUnitVersionItemCopying,
		pasteVersionItemCopying,
		subpageContainerRef,
		getSubpageItemTopOffset,
	} = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const [abilitiesPasted, setAbilitiesPasted] = useState([]);

	async function addAbility() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newUnitVersion.abilities.push({
			_id: new_id_response.data._id,
			name: "New Ability",
			primaryStatistic: { label: "", value: "" },
			items: [],
			statistics: { values: [], maxValue: 12 },
		});
		changeUnitVersion(newUnitVersion);
	}

	function removeAbility(e, index) {
		e.stopPropagation();
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		if (currAbility?._id === newUnitVersion.abilities[index]._id) switchAbility(newUnitVersion.abilities[0]._id);
		newUnitVersion.abilities.splice(index, 1);
		changeUnitVersion(newUnitVersion);
	}

	const [isReorderingAbilities, setIsReorderingAbilities] = useState(false);
	function toggleIsReorderingAbilities() {
		setIsReorderingAbilities((oldIsReorderingAbilities) => !oldIsReorderingAbilities);
	}

	function reorderAbilities(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempAbility = newUnitVersion.abilities.splice(res.from, 1)[0];
		newUnitVersion.abilities.splice(res.to, 0, tempAbility);
		changeUnitVersion(newUnitVersion);
	}

	async function revertAbilities() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.abilities = response.data.value.map((ability) => {
			const abilityIndex = newUnitVersion.abilities.findIndex((e) => e._id === ability._id);
			if (abilityIndex !== -1) return newUnitVersion.abilities[abilityIndex];
			return ability;
		});
		changeUnitVersion(newUnitVersion);

		return true;
	}

	async function saveAbilities() {
		if (!unit?._id) return;
		const newUnitVersion = JSON.parse(JSON.stringify(unitVersion));

		let shouldSaveClusterItems = false;

		const newAbilitiesPasted = JSON.parse(JSON.stringify(abilitiesPasted));
		const newAbilityPastedIndex = newAbilitiesPasted?.findIndex((e) => e?.version === newUnitVersion?._id);
		if (newAbilityPastedIndex !== -1) {
			const newAbilityPasted = newAbilitiesPasted[newAbilityPastedIndex]?.abilities;
			if (JSON.stringify(newAbilityPasted) === JSON.stringify(newUnitVersion?.abilities)) {
				shouldSaveClusterItems = true;
			}
		}

		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", newUnitVersion._id, "abilities"],
			newValue: newUnitVersion.abilities,
			shouldSaveClusterItems,
		});
		if (!response) return false;
		return true;
	}

	function onClickAbility(ability) {
		switchAbility(ability._id);
	}

	const [abilitiesListItemsRefCurrent, abilitiesListItemsRef] = useState(undefined);
	function onAbilitiesListScroll(e) {
		if (abilitiesListItemsRefCurrent?.scrollTop === 0) return;
		e.stopPropagation();
	}

	function copyVersionValue() {
		changeUnitVersionItemCopying(["abilities"]);
	}

	function pasteVersionValue() {
		const newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const newAbilities = pasteVersionItemCopying(["abilities"]);
		if (newAbilities === false) return false;

		setAbilitiesPasted((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?.version === newUnitVersion._id);
			if (index === -1) {
				newValue.push({ version: newUnitVersion._id, abilities: JSON.parse(JSON.stringify(newAbilities)) });
			} else {
				newValue[index].abilities = JSON.parse(JSON.stringify(newAbilities));
			}
			return newValue;
		});

		changeAbility((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(newAbilities?.[0]));
			newValue.character_version_id = newUnitVersion?._id;
			return newValue;
		});
	}

	const abilitiesListRef = useRef();
	useEffect(() => {
		async function getTopOffset(e) {
			if (abilitiesListRef?.current) {
				if (window?.innerWidth > 750) {
					abilitiesListRef.current.style.marginTop =
						getSubpageItemTopOffset(abilitiesListRef?.current?.clientHeight, e?.deltaY || 0) + "px";
				} else {
					abilitiesListRef.current.style.marginTop = "0px";
				}
			}
		}
		getTopOffset();
		const subpageContainerRefCurrent = subpageContainerRef?.current;
		if (subpageContainerRefCurrent) subpageContainerRefCurrent?.addEventListener("scroll", getTopOffset);
		return () => subpageContainerRefCurrent?.removeEventListener("scroll", getTopOffset);
	}, [currAbility, subpageContainerRef, abilitiesListRef, getSubpageItemTopOffset]);

	return {
		isAuthorizedToEdit,
		unitVersion,
		addAbility,
		removeAbility,
		isReorderingAbilities,
		toggleIsReorderingAbilities,
		reorderAbilities,
		revertAbilities,
		saveAbilities,
		onClickAbility,
		abilitiesListItemsRef,
		onAbilitiesListScroll,
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue,
		abilitiesListRef,
	};
};
