// Packages

// Components
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { ContentItem } from "../../../../../../../components/ContentItem/ContentItem";
import { TextInput } from "../../../../../../../components/TextInput/TextInput";

// Logic
import { BiographyClusterNameLogic } from "./BiographyClusterNameLogic";

// Context

// Services

// Styles
import "./BiographyClusterName.css";

// Assets

export const BiographyClusterName = ({ biographyCluster, changeBiographyCluster }) => {
	const { isAuthorizedToEdit, changeBiographyClusterName, revertBiographyClusterName, saveBiographyClusterName } = BiographyClusterNameLogic({
		biographyCluster,
		changeBiographyCluster,
	});

	return (
		<EditableContainer
			className='unit-page-subpage-abilities-biography-cluster-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertBiographyClusterName}
			onSave={saveBiographyClusterName}
			higherEditBtns={true}
		>
			<ContentItem hasBg={false} size='m' margin='none'>
				<div className='unit-page-subpage-abilities-biography-cluster-name'>{biographyCluster?.name}</div>
			</ContentItem>
			<ContentItem hasBg={false} size='m' margin='none'>
				<TextInput
					className='unit-page-subpage-abilities-biography-cluster-name'
					label='BiographyCluster Name'
					seamless={true}
					autoResize={true}
					value={biographyCluster?.name}
					onChange={changeBiographyClusterName}
				/>
			</ContentItem>
		</EditableContainer>
	);
};
