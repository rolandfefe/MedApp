"use client";

import useLoadMore from "@/hooks/useLoadMore";
import { getPatients } from "@/lib/actions/patient.actions";
import { eGender, eMaritalStatus } from "@/types/enums/enums";
import { flattenDeep, uniqBy } from "lodash-es";
import {
	ComponentProps,
	createContext,
	useContext,
	useEffect,
	useEffectEvent,
	useState,
} from "react";

interface Props extends IPagination {
	patients: IPatient[];
}

const PatientContext = createContext<Props | null>(null);

export const usePatient = () => {
	const context = useContext(PatientContext);

	if (!context)
		throw new Error("Ensure element is a child of PatientProvider!");

	return context;
};

export const PatientProvider = ({
	patientsInit = [],
	children,
	gender,
	maritalStatus,
	...props
}: {
	patientsInit?: IPatient[];
	gender?: eGender;
	maritalStatus?: eMaritalStatus;
} & ComponentProps<"div">) => {
	const [patients, setPatients] = useState<IPatient[]>(patientsInit);
	const [nextPg, setNextPg] = useState<number>(2);
	const [hasNextPg, setHasNextPg] = useState<boolean>(true);

	const loader = async () => {
		const {
			patients: _p,
			hasNextPage,
			nextPage: _npg,
		} = await getPatients({ gender, maritalStatus, page: nextPg });

		setPatients((prev) => uniqBy([...prev, ..._p], "id"));
		setHasNextPg(hasNextPage);
		setNextPg(_npg!);
	};

	const { ref: loadRef, isLoading } = useLoadMore({ loader, hasNextPg });

	const contextValue: Props = {
		patients,
		loadRef,
		isLoading,
	};

	const syncHandler = useEffectEvent(async () => {
		const _patients = await Promise.all(
			[...Array(nextPg)].map(
				async (_, i) =>
					(
						await getPatients({ gender, maritalStatus, page: i + 1 })
					).patients
			)
		);

		setPatients(uniqBy(flattenDeep(_patients), "id"));
	});

	useEffect(() => {
		syncHandler();
	}, [patientsInit]);

	return (
		<PatientContext.Provider value={contextValue}>
			<div {...props}>{children}</div>
		</PatientContext.Provider>
	);
};
