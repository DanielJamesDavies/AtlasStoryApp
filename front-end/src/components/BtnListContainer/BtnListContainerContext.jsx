import { createContext, useState } from "react";

export const BtnListContainerContext = createContext();

export const BtnListContainerProvider = ({ children }) => {
	const [isBtnListOpen, setIsBtnListOpen] = useState(false);

	return <BtnListContainerContext.Provider value={{ isBtnListOpen, setIsBtnListOpen }}>{children}</BtnListContainerContext.Provider>;
};

export default BtnListContainerProvider;
