// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const DateLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeDate(e, key, time_index) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			if (e.target.value.length > 2 && key === "time") return newUnit;
			if (key === "time") {
				if (time_index === 0) {
					newUnit.data.date.time = e.target.value + ":" + newUnit.data.date[key].split(":")[1];
				} else {
					newUnit.data.date.time = newUnit.data.date[key].split(":")[0] + ":" + e.target.value;
				}
			} else {
				newUnit.data.date[key] = e.target.value;
			}
			return newUnit;
		});
	}

	async function revertDate() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "date"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.date = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveDate() {
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "date"],
			newValue: unit.data.date,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	const dateTimeHoursRef = useRef();
	const dateTimeMinutesRef = useRef();

	const dateDayRef = useRef();
	const dateMonthRef = useRef();
	const dateYearRef = useRef();

	function onKeyDownTimeInput(e, time_index) {
		if (e?.code === "ArrowDown") {
			dateDayRef?.current?.focus();
			return false;
		}

		if (time_index === 0) {
			if (
				(!["Backspace", "ArrowLeft", "CapsLock", "ArrowRight"].includes(e?.code) && unit?.data?.date?.time?.split(":")[0].length >= 2) ||
				(e?.code === "ArrowRight" && e?.target?.selectionStart >= 2)
			) {
				dateTimeMinutesRef?.current?.focus();
				if (e?.code === "ArrowRight" && e?.target?.selectionStart >= 2)
					setTimeout(() => dateTimeMinutesRef?.current?.setSelectionRange(0, 0), 1);
			}
		} else if (time_index === 1) {
			if (
				(e?.code === "Backspace" && unit?.data?.date?.time?.split(":")[1].length === 0) ||
				(e?.code === "ArrowLeft" && e?.target?.selectionStart === 0)
			) {
				dateTimeHoursRef?.current?.focus();
				setTimeout(() => dateTimeHoursRef?.current?.setSelectionRange(2, 2), 1);
			}
		}
	}

	function onKeyDownDateInput(e, key) {
		let action = "none";
		if (e?.code === "ArrowUp") action = "up";
		if (e?.code === "ArrowDown") action = "down";

		switch (key) {
			case "day":
				switch (action) {
					case "up":
						dateTimeMinutesRef?.current?.focus();
						break;
					case "down":
						dateMonthRef?.current?.focus();
						break;
					default:
						break;
				}
				break;
			case "month":
				switch (action) {
					case "up":
						dateDayRef?.current?.focus();
						break;
					case "down":
						dateYearRef?.current?.focus();
						break;
					default:
						break;
				}
				break;
			case "year":
				switch (action) {
					case "up":
						dateMonthRef?.current?.focus();
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}
	}

	return {
		isAuthorizedToEdit,
		unit_type,
		unit,
		changeDate,
		revertDate,
		saveDate,
		dateTimeHoursRef,
		dateDayRef,
		dateMonthRef,
		dateYearRef,
		dateTimeMinutesRef,
		onKeyDownTimeInput,
		onKeyDownDateInput,
	};
};
