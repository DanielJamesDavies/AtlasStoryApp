// Packages

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { SliderInput } from "../../../../../components/SliderInput/SliderInput";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { FontSizeLogic } from "./FontSizeLogic";

// Context

// Services

// Styles
import "./FontSize.css";

// Assets

export const FontSize = () => {
	const { fontSize, changeFontSize, fontSizes, errors } = FontSizeLogic();

	return (
		<ContentItem className='settings-item settings-item-font-size-container' size='s' hasBg={true}>
			<div className='settings-item-title'>Font Size</div>
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
		</ContentItem>
	);
};
