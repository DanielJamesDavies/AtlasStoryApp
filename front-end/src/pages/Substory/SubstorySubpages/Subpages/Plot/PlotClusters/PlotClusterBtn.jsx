// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";
import { TextInput } from "../../../../../../components/TextInput/TextInput";

// Logic

// Context

// Services

// Styles
import "./PlotClusterBtn.css";

// Assets

export const PlotClusterBtn = ({ cluster, currCluster, onClickCluster, removeCluster, changeClusterName, isEditing }) => {
	return (
		<div
			className={
				cluster._id === currCluster._id
					? "substory-subpage-plot-cluster-btn substory-subpage-plot-cluster-btn-active"
					: "substory-subpage-plot-cluster-btn"
			}
			onClick={() => onClickCluster(cluster)}
		>
			{!isEditing ? (
				<div className='substory-subpage-plot-cluster-btn-name'>{cluster?.name}</div>
			) : (
				<TextInput
					className='substory-subpage-plot-cluster-btn-name'
					seamless={true}
					value={cluster?.name}
					onChange={(e) => changeClusterName(e, cluster)}
				/>
			)}
			{!isEditing || cluster._id === "all" ? null : (
				<IconBtn
					className='substory-subpage-plot-cluster-btn-remove-btn'
					icon={<FaTimes />}
					iconName='times'
					size='s'
					seamless={true}
					onClick={(e) => removeCluster(e, cluster)}
				/>
			)}
		</div>
	);
};
