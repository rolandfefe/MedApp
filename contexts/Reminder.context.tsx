"use client";

import ReminderPopup from "@/components/layouts/ReminderPopup";
import {
	ComponentProps,
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface Props {
	reminder?: IReminder;
	reminders: {
		appointments: IReminder[];
		medications: IReminder[];
		personal: IReminder[];
		followUp: IReminder[];
	};

	setReminder: Dispatch<SetStateAction<IReminder | undefined>>;
	setReminders: Dispatch<
		SetStateAction<{
			appointments: IReminder[];
			medications: IReminder[];
			personal: IReminder[];
			followUp: IReminder[];
		}>
	>;
}

const RemindersContext = createContext<Props | null>(null);

export const useReminders = () => {
	const context = useContext(RemindersContext);

	if (!context)
		throw new Error(`Ensure Component is Descendant of <RemindersProvider />`);

	return context;
};

export const RemindersProvider = ({
	remindersInit = {
		appointments: [],
		medications: [],
		personal: [],
		followUp: [],
	},
	...props
}: { remindersInit: Props["reminders"] } & ComponentProps<"div">) => {
	const [reminder, setReminder] = useState<IReminder>();
	const [reminders, setReminders] = useState<Props["reminders"]>(remindersInit);

	const contextValue: Props = {
		reminder,
		setReminder,
		reminders,
		setReminders,
	};

	return (
		<RemindersContext.Provider value={contextValue}>
			<div {...props} />

			<ReminderPopup
				reminders={[
					...reminders.appointments,
					...reminders.followUp,
					...reminders.medications,
					...reminders.personal,
				]}
			/>
		</RemindersContext.Provider>
	);
};
