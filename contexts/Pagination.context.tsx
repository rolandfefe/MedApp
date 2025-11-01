"use client";

import {
	ComponentProps,
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface Props {
	doctors: IDoctor[];
	patients: IPatient[];
	appointments: IAppointment[];
	// ! Test actions
	setDoctors: Dispatch<SetStateAction<IDoctor[]>>;
	setPatients: Dispatch<SetStateAction<IPatient[]>>;
	setAppointments: Dispatch<SetStateAction<IAppointment[]>>;
	// setDoctors: (d?: IDoctor[]) => void;
	// setPatients: (p?: IPatient[]) => void;
	// setAppointments: (a?: IAppointment[]) => void;
}

const PaginationContext = createContext<Props | null>(null);

export const usePagination = () => {
	const context = useContext(PaginationContext);

	if (!context)
		throw new Error("Ensure element is a child of PaginationProvider!");

	return context;
};

export const PaginationProvider = ({
	patientsInit = [],
	doctorsInit = [],
	appointmentsInit = [],
	children,
	...props
}: {
	doctorsInit?: IDoctor[];
	patientsInit?: IPatient[];
	appointmentsInit?: IAppointment[];
} & ComponentProps<"div">) => {
	const [doctors, setDoctors] = useState<IDoctor[]>(doctorsInit);
	const [patients, setPatients] = useState<IPatient[]>(patientsInit);
	const [appointments, setAppointments] =
		useState<IAppointment[]>(appointmentsInit);

	const contextValue: Props = {
		doctors,
		setDoctors,
		patients,
		setPatients,
		appointments,
		setAppointments,
	};

	return (
		<PaginationContext.Provider value={contextValue}>
			<div {...props}>{children}</div>
		</PaginationContext.Provider>
	);
};
