// Packages

// Components
import { SubmitBtn } from "../../../../components/SubmitBtn/SubmitBtn";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { DownloadLogic } from "./DownloadLogic";

// Context

// Services

// Styles
import "./Download.css";

// Assets

export const Download = () => {
	const { downloadAllStoryData, errors } = DownloadLogic();

	return (
		<>
			<SubmitBtn label='Download' className='story-settings-download-btn' onSubmit={downloadAllStoryData} />
			<ErrorMessage errors={errors} />
		</>
	);
};
