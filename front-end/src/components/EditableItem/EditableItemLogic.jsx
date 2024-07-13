// Packages
import { useEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const EditableItemLogic = ({ isAuthorizedToEdit, buttons, onLongHold, onImageLongHold }) => {
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (!isAuthorizedToEdit) setIsEditing(false);
	}, [isAuthorizedToEdit]);

	function toggleIsEditing() {
		setIsEditing((oldValue) => !oldValue);
	}

	const curr_pos = useRef([]);
	const longHoldTimeout = useRef(false);
	function onMouseDown(e) {
		const start_pos = [e?.clientX, e?.clientY];
		longHoldTimeout.current = setTimeout(() => {
			const mouse_movement_dist = Math.hypot(curr_pos.current[0] - start_pos[0], curr_pos.current[1] - start_pos[1]);
			if (onLongHold !== undefined && mouse_movement_dist < 15) onLongHold();
		}, 500);
	}

	function onMouseMove(e) {
		curr_pos.current = [e?.clientX, e?.clientY];
	}

	function onMouseUp() {
		clearTimeout(longHoldTimeout.current);
	}

	function onMouseLeave() {
		clearTimeout(longHoldTimeout.current);
	}

	const curr_pos_image = useRef([]);
	const longHoldImageTimeout = useRef(false);
	function onImageMouseDown(e) {
		e.stopPropagation();
		const start_pos = [e?.clientX, e?.clientY];
		longHoldImageTimeout.current = setTimeout(() => {
			const mouse_movement_dist = Math.hypot(curr_pos_image.current[0] - start_pos[0], curr_pos_image.current[1] - start_pos[1]);
			if (onImageLongHold !== undefined && mouse_movement_dist < 15) onImageLongHold();
			longHoldImageTimeout.current = false;
		}, 200);
	}

	function onImageMouseMove(e) {
		curr_pos_image.current = [e?.clientX, e?.clientY];
	}

	function onImageMouseUp() {
		clearTimeout(longHoldImageTimeout.current);
		if (longHoldImageTimeout.current === false) {
		}
	}

	function onImageMouseLeave() {
		clearTimeout(longHoldImageTimeout.current);
	}

	async function onKeyDown(e) {
		if (e?.ctrlKey && (e?.key === "s" || e?.key === "S")) {
			e.preventDefault();
			const save_action = buttons.find((e) => e?.event === "save")?.action;
			if (!save_action) return false;
			const save_success = await onSave(save_action);
			if (save_success) setIsEditing(false);
		}
	}

	async function onSave(action) {
		if (action === undefined) return false;
		const res = await action();
		if (res) setIsEditing(false);
	}

	async function onRevert(action) {
		if (action === undefined) return false;
		const res = await action();
		if (res) setIsEditing(false);
	}

	return {
		isEditing,
		toggleIsEditing,
		onKeyDown,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		onMouseLeave,
		onImageMouseDown,
		onImageMouseMove,
		onImageMouseUp,
		onImageMouseLeave,
		onSave,
		onRevert,
	};
};
