"use client";

import {
	ComponentProps,
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

interface Props {
	msgs: IMessage[];
	setMsgs: (msgs: IMessage[]) => void;
	refMsg?: IMessage;
	setRefMsg: (msg: IMessage) => void;
	updateMsg?: IMessage;
	setUpdateMsg: (msg: IMessage) => void;
}

const MsgContext = createContext<Props | null>(null);

/**
 * @definition Hook to control all Message functions in the context
 * */
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
	const [msgs, _setMsgs] = useState<IMessage[]>(msgsInit);
	const [refMsg, _setRefMsg] = useState<IMessage>();
	const [updateMsg, _setUpdateMsg] = useState<IMessage>();

	const setRefMsg = useCallback(
		(msg: IMessage) => _setRefMsg(msg),
		[_setRefMsg]
	);

	const setUpdateMsg = useCallback(
		(msg: IMessage) => _setUpdateMsg(msg),
		[_setUpdateMsg]
	);

	const setMsgs = (m: IMessage[]) => _setMsgs(m);

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
