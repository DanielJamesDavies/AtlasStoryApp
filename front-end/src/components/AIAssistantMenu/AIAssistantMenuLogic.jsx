// Packages
import { useState, useContext, useRef, useCallback, useEffect } from "react";

// Components

// Logic
import { AIAssistantMicrophoneLogic } from "./AIAssistantMicrophoneLogic";
import { AIAssistantGetCommandsLogic } from "./AIAssistantGetCommandsLogic";
import { AIAssistantExecuteCommandsLogic } from "./AIAssistantExecuteCommandsLogic";

// Context
import { AppContext } from "../../context/AppContext";
import { AIContext } from "../../context/AIContext";
import { StoryContext } from "../../context/StoryContext";

// Services

// Styles

// Assets

export const AIAssistantMenuLogic = () => {
	const { isDisplayingAiAssistant } = useContext(AppContext);
	const { GPT_API_Key, AI_Whisper_Request, AI_TTS_Request } = useContext(AIContext);
	const { story, isAuthorizedToEdit, storyCharacters, hasGotStoryCharacters, storyGroups, storyCharacterTypes, storySubstories } =
		useContext(StoryContext);

	const [isRunningAssistant, setIsRunningAssistant] = useState(false);
	const isRunningAssistantRef = useRef(false);
	const [isAssistantExecuting, setIsAssistantExecuting] = useState(false);
	const [isHoveringOverAssistantContainer, setIsHoveringOverAssistantContainer] = useState(false);
	const [isHoveringOverToggleInputBtn, setIsHoveringOverToggleInputBtn] = useState(false);

	const microphone = useRef(false);
	const inputIsMicrophone = useRef(true);
	const [inputIsMicrophoneState, setInputIsMicrophone] = useState(true);
	const [assistantTextInput, setAssistantTextInput] = useState("");

	const [messages, setMessages] = useState([]);

	const { getAudioFile } = AIAssistantMicrophoneLogic({ microphone });
	const { getCommands } = AIAssistantGetCommandsLogic();
	const { executeCommands } = AIAssistantExecuteCommandsLogic({ isRunningAssistantRef });

	useEffect(() => {
		isRunningAssistantRef.current = JSON.parse(JSON.stringify(isRunningAssistant));
		if (!isRunningAssistant) {
			setIsAssistantExecuting(false);
		}
	}, [isRunningAssistant]);

	const getAllUnits = useCallback(() => {
		let units = [];
		units = units.concat(
			storyCharacters?.map((e) => {
				return { _id: e?._id, uid: e?.uid, name: e?.data?.name, type: "character", page_letter: "c" };
			})
		);
		units = units.concat(
			storyGroups?.map((e) => {
				return { _id: e?._id, uid: e?.uid, name: e?.data?.name, type: "group", page_letter: "g" };
			})
		);
		units = units.concat(
			storyCharacterTypes?.map((e) => {
				return { _id: e?._id, uid: e?.uid, name: e?.data?.name, type: "character_type", page: "characters" };
			})
		);
		units = units.concat(
			storySubstories?.map((e) => {
				return { _id: e?._id, uid: e?.uid, name: e?.data?.title, type: "plot", page_letter: "p" };
			})
		);
		return units;
	}, [storyCharacters, storyGroups, storyCharacterTypes, storySubstories]);

	const getResponseText = useCallback((commands, isAuthorizedToEdit) => {
		if (!isAuthorizedToEdit && commands.filter((e) => e?.authorization_required).length !== 0) {
			return "I'm sorry. I am not authorized to fulfil that request";
		}

		const agreement_words = ["Sure!", "Certainly.", "Of course!"];

		let response_text = agreement_words[Math.floor(Math.random() * agreement_words.length)] + " " + commands.at(-1).desc;

		let response_audio_text = JSON.parse(JSON.stringify(response_text));

		response_audio_text = response_audio_text?.replaceAll("!", "!. .");
		response_audio_text = response_audio_text?.replaceAll(".", ".. .");
		response_audio_text = response_audio_text?.replaceAll(",", ".. .");
		response_audio_text = response_audio_text?.replaceAll("to", "2");

		return { response_text, response_audio_text };
	}, []);

	const addMessage = useCallback(
		(content, role) => {
			setMessages((oldValue) =>
				oldValue.filter((e, i) => !(i === oldValue.length - 1 && e?.role === "user" && role === "user")).concat([{ role, content }])
			);
		},
		[setMessages]
	);

	const runSequence = useCallback(
		async (input_text, newInputIsMicrophone) => {
			if (!isRunningAssistantRef.current) return false;

			if (!story?.uid) return setIsRunningAssistant(false);

			if (!microphone.current && newInputIsMicrophone) microphone.current = navigator.mediaDevices.getUserMedia({ audio: true });

			setAssistantTextInput("");

			let audio_file = false;
			if (newInputIsMicrophone) {
				audio_file = await getAudioFile();
			}

			if (JSON.stringify(newInputIsMicrophone) !== JSON.stringify(inputIsMicrophone.current)) return false;

			if (!isRunningAssistantRef.current) return false;

			setIsAssistantExecuting(true);

			const pronunciations = story?.data?.pronunciations;

			let units = getAllUnits();

			// Get Speech Input
			if (newInputIsMicrophone) {
				input_text = (
					await AI_Whisper_Request(
						audio_file,
						units?.map((e) => e?.name)
					)
				)?.text;
				if (!input_text) return setIsRunningAssistant(false);
			}

			addMessage(input_text, "user");

			if (!isRunningAssistantRef.current) return false;

			// Get Commands
			const commands = await getCommands(input_text, units);
			if (commands?.length === 0) return setIsRunningAssistant(false);

			if (!isRunningAssistantRef.current) return false;

			// Speak
			const { response_text, response_audio_text } = getResponseText(commands, isAuthorizedToEdit);
			if (response_audio_text.length < 150) {
				try {
					const response_audio = await AI_TTS_Request(response_audio_text, pronunciations);

					if (!isRunningAssistantRef.current) return false;

					const ctx = new AudioContext();
					const source = ctx.createBufferSource();
					source.buffer = response_audio;

					const gain_node = ctx.createGain();
					gain_node.gain.value = 0.1;
					gain_node.connect(ctx.destination);
					source.connect(gain_node);
					source.start();
				} catch {}
			}

			addMessage(response_text, "assistant");

			// Execute Commands
			await executeCommands(commands, input_text);

			setIsAssistantExecuting(false);

			if (inputIsMicrophone.current) {
				runSequence("", true);
			}
		},
		[
			isRunningAssistantRef,
			microphone,
			AI_Whisper_Request,
			AI_TTS_Request,
			story,
			getAllUnits,
			getAudioFile,
			getCommands,
			getResponseText,
			setIsAssistantExecuting,
			isAuthorizedToEdit,
			inputIsMicrophone,
			setAssistantTextInput,
			addMessage,
			executeCommands,
		]
	);

	function toggleRunAssistant() {
		const newIsRunningAssistant = JSON.parse(JSON.stringify(isRunningAssistant)) ? false : true;
		isRunningAssistantRef.current = newIsRunningAssistant;
		setIsRunningAssistant(newIsRunningAssistant);

		if (newIsRunningAssistant) {
			setIsHoveringOverAssistantContainer(false);
			if (inputIsMicrophone.current) {
				runSequence("", true);
			}
		} else {
			setMessages([]);
		}
	}

	function onMouseEnterRunBtn() {
		setIsHoveringOverAssistantContainer(true);
	}

	function onMouseLeaveRunBtn() {
		setIsHoveringOverAssistantContainer(false);
	}

	function toggleInput() {
		setIsHoveringOverToggleInputBtn(false);
		inputIsMicrophone.current = inputIsMicrophone.current ? false : true;
		setInputIsMicrophone(inputIsMicrophone.current);
		if (inputIsMicrophone.current && isRunningAssistant) {
			runSequence("", true);
		}
	}

	function onMouseEnterToggleInputBtn() {
		setIsHoveringOverToggleInputBtn(true);
	}

	function onMouseLeaveToggleInputBtn() {
		setIsHoveringOverToggleInputBtn(false);
	}

	function changeAssistantTextInput(e) {
		setAssistantTextInput(e.target.value);
	}

	function onKeyDownAssistantTextInput(e) {
		if (e?.code === "Enter") {
			const newInput = JSON.parse(JSON.stringify(assistantTextInput));
			if (newInput.trim().length !== 0 && !inputIsMicrophone.current && isRunningAssistant && !isAssistantExecuting) {
				runSequence(newInput, false);
			}
		}
	}

	return {
		isDisplayingAiAssistant,
		story,
		hasGotStoryCharacters,
		storyGroups,
		storyCharacterTypes,
		storySubstories,
		GPT_API_Key,
		inputIsMicrophoneState,
		toggleInput,
		isRunningAssistant,
		toggleRunAssistant,
		isAssistantExecuting,
		isHoveringOverAssistantContainer,
		onMouseEnterRunBtn,
		onMouseLeaveRunBtn,
		isHoveringOverToggleInputBtn,
		onMouseEnterToggleInputBtn,
		onMouseLeaveToggleInputBtn,
		assistantTextInput,
		changeAssistantTextInput,
		onKeyDownAssistantTextInput,
		messages,
	};
};
