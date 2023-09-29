// Packages
import { FaAngleDoubleUp, FaCog, FaCopy, FaExclamationTriangle, FaFont, FaListUl, FaTimes } from "react-icons/fa";
import { IconBtn } from "../IconBtn/IconBtn";

// Components

// Logic
import { AIToolsLogic } from "./AIToolsLogic";

// Context

// Services

// Styles
import "./AITools.css";

// Assets

export const AITools = ({ type, context, isDisplayingButtons }) => {
	const {
		GPT_API_Key,
		aiToolsContainerRef,
		aiToolsStyles,
		gpt_messages,
		onImproveBtnClick,
		onSummarizeBtnClick,
		clearGptMessages,
		onCopyBtnClick,
	} = AIToolsLogic({ type, context });

	if (!GPT_API_Key || GPT_API_Key.trim().length === 0) return null;
	return (
		<div
			ref={aiToolsContainerRef}
			className={
				isDisplayingButtons || gpt_messages.length !== 0 ? "ai-tools-container ai-tools-container-is-displaying" : "ai-tools-container"
			}
		>
			<div className='ai-tools' style={aiToolsStyles} onClick={(e) => e.stopPropagation()}>
				<div
					className={
						isDisplayingButtons || gpt_messages.length !== 0 ? "ai-tools-buttons ai-tools-buttons-is-displaying" : "ai-tools-buttons"
					}
				>
					{!(type === "text") ? null : (
						<IconBtn
							className='ai-tools-menu-btn'
							seamless={true}
							icon={<FaFont />}
							iconName='angleDoubleUp'
							iconSmall={<FaAngleDoubleUp />}
							onClick={onImproveBtnClick}
							label='Improve'
						/>
					)}
					{!(type === "text") ? null : (
						<IconBtn
							className='ai-tools-menu-btn'
							seamless={true}
							icon={<FaListUl />}
							iconName='listUl'
							iconSmall={<FaFont />}
							onClick={onSummarizeBtnClick}
							label='Summarize'
						/>
					)}
				</div>
				<div className='ai-tools-responses'>
					{!(type === "text" && gpt_messages.length > 0) ? null : (
						<div className='ai-tools-responses-gpt-messages-container'>
							<div className='ai-tools-responses-gpt-messages-close-btn-container'>
								<IconBtn
									className='ai-tools-responses-gpt-messages-close-btn'
									seamless={true}
									icon={<FaTimes />}
									iconName='copy'
									size='s'
									onClick={clearGptMessages}
									label='Copy Text'
								/>
							</div>
							<div className='ai-tools-responses-gpt-messages'>
								{gpt_messages.map((message, index) => (
									<div
										key={index}
										className={
											message?.role === "function"
												? gpt_messages.filter((e) => e.id === message.id).length < 2
													? "ai-tools-responses-gpt-message ai-tools-responses-gpt-message-function ai-tools-responses-gpt-message-function-running"
													: "ai-tools-responses-gpt-message ai-tools-responses-gpt-message-function"
												: message?.role === "error"
												? "ai-tools-responses-gpt-message ai-tools-responses-gpt-message-error"
												: message?.role === "user"
												? "ai-tools-responses-gpt-message ai-tools-responses-gpt-message-user"
												: "ai-tools-responses-gpt-message"
										}
									>
										{message?.role === "function" ? (
											<>
												<div className='ai-tools-responses-gpt-message-content-container'>
													<FaCog />
													<div className='ai-tools-responses-gpt-message-content'>{message?.content}</div>
												</div>
											</>
										) : message?.role === "error" ? (
											<>
												<div className='ai-tools-responses-gpt-message-content-container'>
													<FaExclamationTriangle />
													<div className='ai-tools-responses-gpt-message-content'>{message?.content}</div>
												</div>
											</>
										) : (
											<>
												<div className='ai-tools-responses-gpt-message-content-container'>
													<div className='ai-tools-responses-gpt-message-content'>{message?.content}</div>
													<div className='ai-tools-responses-gpt-message-buttons'>
														<IconBtn
															className='ai-tools-responses-gpt-message-copy-btn'
															seamless={true}
															icon={<FaCopy />}
															iconName='copy'
															size='s'
															onClick={() => onCopyBtnClick(message?.content)}
															label='Copy Text'
														/>
													</div>
												</div>
											</>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
