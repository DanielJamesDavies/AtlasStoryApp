// Packages

// Components
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
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
			className='character-subpage-abilities-biography-cluster-name-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertBiographyClusterName}
			onSave={saveBiographyClusterName}
		>
			<div className='character-subpage-abilities-biography-cluster-name'>{biographyCluster?.name}</div>
			<TextInput
				className='character-subpage-abilities-biography-cluster-name'
				label='BiographyCluster Name'
				seamless={true}
				autoResize={true}
				value={biographyCluster?.name}
				onChange={changeBiographyClusterName}
			/>
		</EditableContainer>
	);
};
