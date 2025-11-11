"use client";

import useLoadMore from "@/hooks/useLoadMore";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { getCurrentPatientAppointments } from "@/lib/actions/utils.actions";
import { eAppointmentStatus, eAppointmentTypes } from "@/types/enums/enums";
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
	appointments: IAppointment[];
}

const AppointmentsContext = createContext<Props | null>(null);

export const useAppointments = () => {
	const context = useContext(AppointmentsContext);

	if (!context)
		throw new Error("Element is not child of `<AppointmentsProvide />`");

	return context;
};

export const AppointmentsProvider = ({
	appointmentsInit,
	fetchAction,
	children,
	...props
}: {
	appointmentsInit: IAppointment[];
	fetchAction: typeof getCurrentPatientAppointments;
	// fetchAction: () => Promise<ReturnType<typeof getAppointments>>;
} & ComponentProps<"div">) => {
	const [appointments, setAppointments] =
		useState<IAppointment[]>(appointmentsInit);
	const [nextPg, setNextPg] = useState<number>(2);
	const [hasNextPg, setHasNextPg] = useState<boolean>(true);

	const loader = async () => {
		const {
			appointments: _a,
			hasNextPage,
			nextPage: _npg,
		} = await fetchAction({ page: nextPg });

		setAppointments((prev) => uniqBy([...prev, ..._a], "id"));
		setHasNextPg(hasNextPage);
		setNextPg(_npg!);
	};

	const { ref: loadRef, isLoading } = useLoadMore({ loader, hasNextPg });

	const value: Props = {
		appointments,
		isLoading,
		loadRef,
	};

	const syncHandler = useEffectEvent(async () => {
		const _appointments = await Promise.all(
			[...Array(nextPg)].map(
				async (_, i) =>
					(
						await fetchAction({
							page: i + 1,
						})
					).appointments
			)
		);

		setAppointments(uniqBy(flattenDeep(_appointments), "id"));
	});

	useEffect(() => {
		console.log("🔃Appointments");
		syncHandler();
	}, [appointmentsInit]);

	return (
		<AppointmentsContext.Provider value={value}>
			<div {...props}>{children}</div>
		</AppointmentsContext.Provider>
	);
};
