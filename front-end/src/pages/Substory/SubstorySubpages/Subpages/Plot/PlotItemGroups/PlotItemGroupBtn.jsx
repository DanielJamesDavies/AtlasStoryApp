// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";
import { TextInput } from "../../../../../../components/TextInput/TextInput";

// Logic

// Context

// Services

// Styles
import "./PlotItemGroupBtn.css";

// Assets

export const PlotItemGroupBtn = ({ group, index, currGroupID, onClickItemGroup, removeItemGroup, changeItemGroupName, isEditing }) => {
	return (
		<div
			className={
				group._id === currGroupID
					? "substory-subpage-plot-item-group-btn substory-subpage-plot-item-group-btn-active"
					: "substory-subpage-plot-item-group-btn"
			}
			onClick={() => onClickItemGroup(group)}
		>
			<div className='substory-subpage-plot-item-group-btn-number'>{index + 1}</div>
			{!isEditing ? (
				<div className='substory-subpage-plot-item-group-btn-name'>{group?.name}</div>
			) : (
				<TextInput
					className='substory-subpage-plot-item-group-btn-name'
					seamless={true}
					value={group?.name}
					onChange={(e) => changeItemGroupName(e, group)}
				/>
			)}
			{!isEditing || group._id === "all" ? null : (
				<IconBtn
					className='substory-subpage-plot-item-group-btn-remove-btn'
					icon={<FaTimes />}
					iconName='times'
					size='s'
					seamless={true}
					onClick={(e) => removeItemGroup(e, group)}
				/>
			)}
		</div>
	);
};
