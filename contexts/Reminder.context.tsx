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
	};

	setReminder: Dispatch<SetStateAction<IReminder | undefined>>;
	setReminders: Dispatch<
		SetStateAction<{
			appointments: IReminder[];
			medications: IReminder[];
			personal: IReminder[];
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
	children,
	remindersInit = { appointments: [], medications: [], personal: [] },
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
			<div {...props} >{children}</div>
		</RemindersContext.Provider>
	);
};
