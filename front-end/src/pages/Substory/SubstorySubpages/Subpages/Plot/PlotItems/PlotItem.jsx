// Packages
import { FaPlus, FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { Text } from "../../../../../../components/Text/Text";
import { TextInput } from "../../../../../../components/TextInput/TextInput";
import { MultiLineTextInput } from "../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";
import { PlotItemAddToGroupMenu } from "./PlotItemAddToGroupMenu";

// Logic
import { PlotItemLogic } from "./PlotItemLogic";

// Context

// Services

// Styles
import "./PlotItem.css";

// Assets

export const PlotItem = ({ item, removePlotItem, cluster, isEditing }) => {
	const { changeItemLabel, changeItemText, isDisplayingPlotItemAddToGroupMenu, showPlotItemAddToGroupMenu, hidePlotItemAddToGroupMenu } =
		PlotItemLogic({ item });

	if (!isEditing)
		return (
			<div className='substory-subpage-plot-item'>
				<ContentItem hasBg={true}>
					<div className='substory-subpage-plot-item-label'>{item?.label}</div>
					<Text className='substory-subpage-plot-item-text' value={item?.text} />
				</ContentItem>
			</div>
		);

	return (
		<div className='substory-subpage-plot-item'>
			<ContentItem hasBg={true}>
				<div className='substory-subpage-plot-item-content'>
					<TextInput
						className='substory-subpage-plot-item-label'
						seamless={true}
						label='Plot Item Label'
						value={item?.label}
						onChange={changeItemLabel}
						aiTools={false}
					/>
					<MultiLineTextInput
						className='substory-subpage-plot-item-text'
						seamless={true}
						label='Plot Item Text'
						value={item?.text.join("\n")}
						onChange={changeItemText}
						aiTools={true}
					/>
				</div>
				<div className='substory-subpage-plot-item-btns-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => removePlotItem(item._id)} />
					{!cluster?.isAll || item?.isUnsaved ? null : (
						<IconBtn icon={<FaPlus />} iconName='plus' seamless={true} size='s' onClick={() => showPlotItemAddToGroupMenu(item._id)} />
					)}
				</div>
				<PlotItemAddToGroupMenu
					itemID={item._id}
					cluster={cluster}
					isDisplayingPlotItemAddToGroupMenu={isDisplayingPlotItemAddToGroupMenu}
					hidePlotItemAddToGroupMenu={hidePlotItemAddToGroupMenu}
				/>
			</ContentItem>
		</div>
	);
};
