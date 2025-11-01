"use client";

import { ComponentProps, createContext, useContext } from "react";

interface Props {
	currentUser?: IUser;
	currentPatient?: IPatient;
	currentDoctor?: IDoctor;
}

const CurrentContext = createContext<Props | null>(null);

export const useCurrent = () => {
	const context = useContext(CurrentContext);

	if (!context) throw new Error("Ensure element is child of CurrentProvider");

	return context;
};

export const CurrentProvider = ({
	user,
	patient,
	doctor,
	children,
	...props
}: {
	user?: IUser;
	patient?: IPatient;
	doctor?: IDoctor;
} & ComponentProps<"div">) => {
	const contextValue: Props = {
		currentUser: user,
		currentPatient: patient,
		currentDoctor: doctor,
	};

	return (
		<CurrentContext.Provider value={contextValue}>
			<div {...props}>{children}</div>
		</CurrentContext.Provider>
	);
};
