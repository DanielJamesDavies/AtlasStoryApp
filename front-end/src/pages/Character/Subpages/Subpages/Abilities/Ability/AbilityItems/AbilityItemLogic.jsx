// Packages

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const AbilityItemLogic = ({ ability, changeAbility, index }) => {
	function changeAbilityItemTitle(e) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.items[index].title = e.target.value;
		changeAbility(newAbility);
	}

	function changeAbilityItemText(e) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.items[index].text = e.target.value.split("\n");
		changeAbility(newAbility);
	}

	function removeAbilityItem() {
		if (ability.length - 1 < index) return;
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.items.splice(index, 1);
		changeAbility(newAbility);
	}

	return { changeAbilityItemTitle, changeAbilityItemText, removeAbilityItem };
};
