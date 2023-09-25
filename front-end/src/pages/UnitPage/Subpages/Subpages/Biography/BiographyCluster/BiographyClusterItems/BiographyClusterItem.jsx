// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../../components/ContentItem/ContentItem";
import { TextInput } from "../../../../../../../components/TextInput/TextInput";
import { Text } from "../../../../../../../components/Text/Text";
import { MultiLineTextInput } from "../../../../../../../components/MultiLineTextInput/MultiLineTextInput";
import { IconBtn } from "../../../../../../../components/IconBtn/IconBtn";

// Logic
import { BiographyClusterItemLogic } from "./BiographyClusterItemLogic";

// Context

// Services

// Styles
import "./BiographyClusterItem.css";

// Assets

export const BiographyClusterItem = ({ biographyCluster, changeBiographyCluster, biographyClusterItem, index, isEditing }) => {
	const { changeBiographyClusterItemTitle, changeBiographyClusterItemText, removeBiographyClusterItem } = BiographyClusterItemLogic({
		biographyCluster,
		changeBiographyCluster,
		index,
	});

	return (
		<div className='unit-page-subpage-biography-cluster-item'>
			<ContentItem hasBg={true}>
				<div className='unit-page-subpage-biography-cluster-item-content'>
					{!isEditing ? (
						<div className='unit-page-subpage-biography-cluster-item-title'>{biographyClusterItem?.title}</div>
					) : (
						<TextInput
							className='unit-page-subpage-biography-cluster-item-title'
							seamless={true}
							label='Title'
							value={biographyClusterItem?.title}
							onChange={changeBiographyClusterItemTitle}
							aiTools={false}
						/>
					)}

					{!isEditing ? (
						<Text className='unit-page-subpage-biography-cluster-item-text' value={biographyClusterItem?.text} />
					) : (
						<MultiLineTextInput
							className='unit-page-subpage-biography-cluster-item-text'
							seamless={true}
							label='Content'
							value={biographyClusterItem?.text?.join("\n")}
							onChange={changeBiographyClusterItemText}
							aiTools={true}
						/>
					)}
				</div>
				{!isEditing ? null : (
					<IconBtn className='' seamless={true} icon={<FaTimes />} iconName='times' size='s' onClick={removeBiographyClusterItem} />
				)}
			</ContentItem>
		</div>
	);
};
