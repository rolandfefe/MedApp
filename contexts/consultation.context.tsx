"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";

interface ContextProps {
	appointment: IAppointment;
	referrals: IReferral[];
	patientHistory: IHistory;
}

const ConsultationContext = createContext<ContextProps | null>(null);

export const useConsultation = () => {
	const context = useContext(ConsultationContext);

	if (!context)
		throw new Error(
			"use consultation should be used in s consultation Provider."
		);

	return context;
};

export const ConsultationProvider = ({
	children,
	...props
}: { children: ReactNode } & ContextProps) => {
	const contextValue = props;

	return (
		<ConsultationContext.Provider value={contextValue}>
			{children}
		</ConsultationContext.Provider>
	);
};
