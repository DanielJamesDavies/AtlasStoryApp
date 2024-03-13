// Packages
import { FaFont, FaMicrophone, FaPlay, FaRobot, FaStop } from "react-icons/fa";

// Components
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";

// Logic
import { AIAssistantMenuLogic } from "./AIAssistantMenuLogic";

// Context

// Services

// Styles
import "./AIAssistantMenu.css";

// Assets

export const AIAssistantMenu = () => {
	const {
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
	} = AIAssistantMenuLogic();

	if (
		!isDisplayingAiAssistant ||
		!story ||
		story?.data?.groups?.length !== storyGroups?.length ||
		story?.data?.characterTypes?.length !== storyCharacterTypes?.length ||
		story?.data?.substories?.length !== storySubstories?.length ||
		!hasGotStoryCharacters ||
		!GPT_API_Key ||
		GPT_API_Key.trim().length === 0 ||
		(window.location.pathname.split("/").filter((e) => e.length !== 0).length === 4 &&
			window.location.pathname.split("/").filter((e) => e.length !== 0)[0] === "s" &&
			window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "locations")
	)
		return null;
	return (
		<div
			className={
				"ai-assistant-menu-container" +
				(isRunningAssistant ? " ai-assistant-menu-container-is-running" : "") +
				(isAssistantExecuting ? " ai-assistant-menu-container-is-executing" : "") +
				(isHoveringOverAssistantContainer ? " ai-assistant-menu-container-is-hovering" : "") +
				(inputIsMicrophoneState ? " ai-assistant-menu-container-input-is-microphone" : "")
			}
		>
			<div className='ai-assistant-text-container'>
				<div className='ai-assistant-messages'>
					{messages?.map((message, index) => (
						<div key={index} className={"ai-assistant-message ai-assistant-message-" + message?.role}>
							{message?.content}
						</div>
					))}
				</div>
				<input
					className='ai-assistant-text-input'
					value={assistantTextInput}
					onChange={changeAssistantTextInput}
					onKeyDown={onKeyDownAssistantTextInput}
					placeholder='Type your commands here'
				></input>
			</div>
			<button
				className={
					"ai-assistant-btn ai-assistant-toggle-input-btn" +
					(isHoveringOverToggleInputBtn ? " ai-assistant-toggle-input-btn-is-hovering" : "")
				}
				onClick={toggleInput}
				onMouseEnter={onMouseEnterToggleInputBtn}
				onMouseLeave={onMouseLeaveToggleInputBtn}
			>
				<FaFont className='ai-assistant-toggle-input-btn-svg-text' />
				<FaMicrophone className='ai-assistant-toggle-input-btn-svg-mic' />
			</button>
			<button
				className='ai-assistant-btn ai-assistant-run-btn'
				onClick={toggleRunAssistant}
				onMouseEnter={onMouseEnterRunBtn}
				onMouseLeave={onMouseLeaveRunBtn}
			>
				<FaRobot className='ai-assistant-run-btn-svg-robot' />
				<div className='ai-assistant-run-btn-audio-waves'>
					<div className='ai-assistant-run-btn-audio-wave'></div>
					<div className='ai-assistant-run-btn-audio-wave'></div>
					<div className='ai-assistant-run-btn-audio-wave'></div>
					<div className='ai-assistant-run-btn-audio-wave'></div>
					<div className='ai-assistant-run-btn-audio-wave'></div>
				</div>
				<LoadingCircle center={true} size='s' className='ai-assistant-run-btn-loading-circle' />
				<FaPlay className='ai-assistant-run-btn-svg-play' />
				<FaStop className='ai-assistant-run-btn-svg-stop' />
			</button>
		</div>
	);
};
