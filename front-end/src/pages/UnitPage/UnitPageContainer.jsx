// Packages

// Components
import { UnitPage } from "./UnitPage";

// Logic

// Context
import UnitPageProvider from "./UnitPageContext";

// Services

// Styles

// Assets

export const UnitPageContainer = ({ story_uid, unit_uid, unit_type, unit_type_title, type_url_key }) => {
	return (
		<UnitPageProvider
			story_uid={story_uid}
			unit_uid={unit_uid}
			unit_type={unit_type}
			unit_type_title={unit_type_title}
			type_url_key={type_url_key}
		>
			<UnitPage />
		</UnitPageProvider>
	);
};
