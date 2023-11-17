// Packages
import { useState, useContext, useRef, useCallback, useEffect } from "react";

// Components

// Logic
import { AIAssistantMicrophoneLogic } from "./AIAssistantMicrophoneLogic";
import { AIAssistantGetCommandsLogic } from "./AIAssistantGetCommandsLogic";

// Context
import { AIContext } from "../../context/AIContext";
import { StoryContext } from "../../context/StoryContext";
import { RoutesContext } from "../../context/RoutesContext";

// Services

// Styles

// Assets

export const AIAssistantMenuLogic = () => {
	const { GPT_API_Key, GPT_Request, AI_Whisper_Request, AI_TTS_Request } = useContext(AIContext);
	const {
		story,
		isAuthorizedToEdit,
		storyCharacters,
		hasGotStoryCharacters,
		storyGroups,
		storyCharacterTypes,
		storySubstories,
		setUnitValueToChange,
		getUnitValue,
	} = useContext(StoryContext);
	const { changeLocation, setRoutesUnitSubpageID, setRoutesIsOnOverviewSection } = useContext(RoutesContext);

	const [isRunningAssistant, setIsRunningAssistant] = useState(false);
	const isRunningAssistantRef = useRef(false);
	const [isAssistantExecuting, setIsAssistantExecuting] = useState(false);
	const [isHoveringOverAssistantContainer, setIsHoveringOverAssistantContainer] = useState(false);
	const [isHoveringOverToggleInputBtn, setIsHoveringOverToggleInputBtn] = useState(false);
	const microphone = useRef(false);
	const inputIsMicrophone = useRef(true);
	const [inputIsMicrophoneState, setInputIsMicrophone] = useState(true);
	const [assistantTextInput, setAssistantTextInput] = useState("");

	const { getAudioFile } = AIAssistantMicrophoneLogic({ microphone });
	const { getCommands } = AIAssistantGetCommandsLogic();

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
			return "I'm sorry.. . I am not authorized to fulfil that request";
		}

		const agreement_words = ["Sure!", "Certainly.", "Of course!"];

		let response_text = agreement_words[Math.floor(Math.random() * agreement_words.length)] + commands.at(-1).desc;

		response_text = response_text?.replaceAll("!", "!. .");
		response_text = response_text?.replaceAll(".", ".. .");
		response_text = response_text?.replaceAll(",", ".. .");
		response_text = response_text?.replaceAll("to", "2");

		return response_text;
	}, []);

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

			if (!isRunningAssistantRef.current) return false;

			// Get Commands
			const commands = await getCommands(input_text, units);
			if (commands?.length === 0) return setIsRunningAssistant(false);

			if (!isRunningAssistantRef.current) return false;

			// Speak
			const response_text = getResponseText(commands, isAuthorizedToEdit);
			if (response_text.length < 150) {
				try {
					const response_audio = await AI_TTS_Request(response_text, pronunciations);

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

			// Execute Commands
			const changeLocationCommand = commands.find((e) => e?.function === "changeLocation");
			if (changeLocationCommand) {
				await changeLocation(...changeLocationCommand?.arguments);
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const changeUnitSubpageCommand = commands.find((e) => e?.function === "changeUnitSubpage");
			if (changeUnitSubpageCommand) {
				setRoutesUnitSubpageID(...changeUnitSubpageCommand?.arguments);
				setRoutesIsOnOverviewSection(false);
			}

			const goToUnitOverviewCommand = commands.find((e) => e?.function === "goToUnitOverview");
			if (goToUnitOverviewCommand) {
				setRoutesIsOnOverviewSection(true);
			}

			const dictateTextCommand = commands.find((e) => e?.function === "dictateText");
			if (dictateTextCommand) {
				setUnitValueToChange({
					unit_id: dictateTextCommand?.arguments[0],
					path: dictateTextCommand?.arguments[1],
					newValue: dictateTextCommand?.arguments[2],
					label: dictateTextCommand?.label,
					text: dictateTextCommand?.text,
					isList: dictateTextCommand?.isList,
					addValue: dictateTextCommand?.addValue,
				});
			}

			const generateTextCommand = commands.find((e) => e?.function === "generateText");
			if (generateTextCommand) {
				let old_value = getUnitValue.current(generateTextCommand?.arguments[0], generateTextCommand?.arguments[1]);
				if (JSON.stringify(typeof old_value) === JSON.stringify("array")) old_value = old_value.join("\n");

				const generated_text_res = (
					await GPT_Request([
						{
							role: "system",
							content:
								"Never describe the question, just answer. Please fulfil the commands of the user message using the content of the text provided. Please ensure all your responses are well written and concise. Never write text such as, 'Here's the revised text:'.",
						},
						{ role: "user", content: "TEXT: " + old_value },
						{
							role: "user",
							content:
								"Please use the same formatting as the TEXT. For example, if there are bullet points in the TEXT, please use bullet points in the revised version.",
						},
						{
							role: "user",
							content: "USER MESSAGE: " + input_text + ".",
						},
						{
							role: "user",
							content:
								"Never write the given text with the revised version unless asked to, just write the revised version. Please make sure to use \n line breaks in your response to split paragraphs if there are multiple paragraphs! Please never apologise, you're doing a great job. Thank you",
						},
					])
				)?.content;

				if (!isRunningAssistantRef.current) return false;

				setUnitValueToChange({
					unit_id: generateTextCommand?.arguments[0],
					path: generateTextCommand?.arguments[1],
					newValue: generateTextCommand?.splitValueIntoArray ? generated_text_res?.split("\n") : generated_text_res,
					isList: generateTextCommand?.isList,
				});
			}

			setIsAssistantExecuting(false);

			if (inputIsMicrophone.current) {
				runSequence("", true);
			}
		},
		[
			isRunningAssistantRef,
			microphone,
			GPT_Request,
			AI_Whisper_Request,
			AI_TTS_Request,
			story,
			changeLocation,
			setRoutesUnitSubpageID,
			setRoutesIsOnOverviewSection,
			getAllUnits,
			getAudioFile,
			getCommands,
			getResponseText,
			setIsAssistantExecuting,
			isAuthorizedToEdit,
			setUnitValueToChange,
			getUnitValue,
			inputIsMicrophone,
			setAssistantTextInput,
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
	};
};
