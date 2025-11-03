"use client";

import { getMsgs } from "@/lib/actions/message.actions";
import { flattenDeep, uniqBy } from "lodash-es";
import {
	ComponentProps,
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useEffectEvent,
	useState,
} from "react";

interface Props {
	msgs: IMessage[];
	refMsg?: IMessage;
	editMsg?: IMessage;
	nextPg: number;
	setMsgs: Dispatch<SetStateAction<IMessage[]>>;
	setRefMsg: Dispatch<SetStateAction<IMessage | undefined>>;
	setEditMsg: Dispatch<SetStateAction<IMessage | undefined>>;
	setNextPg: Dispatch<SetStateAction<number>>;
	// setMsgs: (msgs: IMessage[]) => void;
	// setRefMsg: (msg: IMessage) => void;
	// seteditMsg: (msg: IMessage) => void;
}

const MsgContext = createContext<Props | null>(null);

export const useMsg = () => {
	const context = useContext(MsgContext);

	if (!context) throw new Error("useMsg must be used within a MsgProvider.");

	return context;
};

export const MsgProvider = ({
	children,
	msgsInit,
	appointment,
	...props
}: {
	children: ReactNode;
	msgsInit: IMessage[];
	appointment: IAppointment;
} & ComponentProps<"div">) => {
	const [msgs, setMsgs] = useState<IMessage[]>(msgsInit);
	const [refMsg, setRefMsg] = useState<IMessage>();
	const [editMsg, setEditMsg] = useState<IMessage>();
	const [nextPg, setNextPg] = useState<number>(2);

	// const setRefMsg = (msg: IMessage) => _setRefMsg(msg);
	// const seteditMsg = (msg: IMessage) => _seteditMsg(msg);
	// const setMsgs = (m: IMessage[]) => _setMsgs(m);

	console.log("PAGE: ",nextPg);

	const sync = useEffectEvent(async () => {
		const [..._m] = await Promise.all(
			[...Array(nextPg)].map(
				async (pg) =>
					(
						await getMsgs({
							appointment: appointment.id,
							page: pg + 1,
						})
					).msgs
			)
		);

		setMsgs(uniqBy(flattenDeep(_m), "id"));
	});

	useEffect(() => {
		console.log("🔃Msgs change detected");
		sync();
	// }, []);
	}, [msgsInit]);

	const contextValues: Props = {
		msgs,
		setMsgs,
		refMsg,
		setRefMsg,
		editMsg,
		setEditMsg,
		nextPg,
		setNextPg,
	};

	return (
		<MsgContext.Provider value={contextValues}>
			<div {...props}>{children}</div>
		</MsgContext.Provider>
	);
};
