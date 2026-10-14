"use client";

import { getAppointment } from "@/lib/actions/appointment.actions";
import { pusherClient } from "@/lib/pusher/pusher.client";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useEffectEvent,
	useMemo,
	useState,
} from "react";

interface ContextProps {
	appointment: IAppointment;
	referrals: IReferral[];
	patientHistory?: IHistory;
	healthStatus?: IHealthStatus;
	verdict?: IVerdict;
	diagnosis?: IDiagnosis;
	recurrencePlan?: IRecurrencePlan;
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
	appointment,
	...props
}: { children: ReactNode } & ContextProps) => {
	const [_appointment, setAppointment] = useState<IAppointment>(appointment);
	const contextValue = { ...props, appointment: _appointment };

	const pusherChannel = pusherClient.subscribe(`appointment-${appointment.id}`);

	const pusherEvent = useEffectEvent(() => {
		pusherChannel.bind(
			`appointment-${appointment.id}-updated`,
			async (id: string) => {
				const a = await getAppointment(id);
				setAppointment(a);
			}
		);
	});

	useEffect(() => {
		pusherEvent();

		return () => pusherClient.unsubscribe(`appointment-${appointment.id}`);
	}, [pusherChannel]);

	return (
		<ConsultationContext.Provider value={contextValue}>
			{children}
		</ConsultationContext.Provider>
	);
};
