// Packages

// Components
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsFontSizeLogic } from "./UserSettingsFontSizeLogic";

// Context

// Services

// Styles
import "./UserSettingsFontSize.css";
import { SliderInput } from "../../../../components/SliderInput/SliderInput";

// Assets

export const UserSettingsFontSize = () => {
	const { fontSize, changeFontSize, fontSizes, errors } = UserSettingsFontSizeLogic();

	return (
		<>
			<div className='user-settings-font-size-container'>
				<div className='user-settings-font-size-input-container'>
					<SliderInput
						value={fontSizes.findIndex((e) => JSON.stringify(e?.id) === JSON.stringify(fontSize))}
						step='1'
						min='0'
						max={fontSizes.length - 1}
						onChange={(e) => changeFontSize(e.target.value)}
						enableSlider={true}
						hasThumb={true}
						label={fontSizes.find((e) => JSON.stringify(e?.id) === JSON.stringify(fontSize))?.label}
					/>
				</div>
			</div>
			<ErrorMessage errors={errors} attribute='font-size' />
			<ErrorMessage errors={errors} />
		</>
	);
};
