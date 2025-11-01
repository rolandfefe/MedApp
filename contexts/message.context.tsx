"use client";

import {
	ComponentProps,
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

interface Props {
	msgs: IMessage[];
	refMsg?: IMessage;
	updateMsg?: IMessage;
	setMsgs: Dispatch<SetStateAction<IMessage[]>>;
	setRefMsg: Dispatch<SetStateAction<IMessage | undefined>>;
	setUpdateMsg: Dispatch<SetStateAction<IMessage | undefined>>;
	// setMsgs: (msgs: IMessage[]) => void;
	// setRefMsg: (msg: IMessage) => void;
	// setUpdateMsg: (msg: IMessage) => void;
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
	...props
}: { children: ReactNode; msgsInit: IMessage[] } & ComponentProps<"div">) => {
	const [msgs, setMsgs] = useState<IMessage[]>(msgsInit);
	const [refMsg, setRefMsg] = useState<IMessage>();
	const [updateMsg, setUpdateMsg] = useState<IMessage>();

	// const setRefMsg = (msg: IMessage) => _setRefMsg(msg);
	// const setUpdateMsg = (msg: IMessage) => _setUpdateMsg(msg);
	// const setMsgs = (m: IMessage[]) => _setMsgs(m);

	const contextValues: Props = {
		msgs,
		setMsgs,
		refMsg,
		setRefMsg,
		updateMsg,
		setUpdateMsg,
	};

	return (
		<MsgContext.Provider value={contextValues}>
			<div {...props}>{children}</div>
		</MsgContext.Provider>
	);
};
