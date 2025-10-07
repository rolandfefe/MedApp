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
	...props
}: { children: ReactNode } & ComponentProps<"div">) => {
	const [_refMsg, _setRefMsg] = useState<IMessage>();
	const [_updateMsg, _setUpdateMsg] = useState<IMessage>();

	const setRefMsg = useCallback(
		(msg: IMessage) => _setRefMsg(msg),
		[_setRefMsg]
	);

	const setUpdateMsg = useCallback(
		(msg: IMessage) => _setUpdateMsg(msg),
		[_setUpdateMsg]
	);

	const contextValues = useMemo<Props>(
		() => ({
			refMsg: _refMsg,
			setRefMsg,
			updateMsg: _updateMsg,
			setUpdateMsg,
		}),
		[_refMsg, _updateMsg, setRefMsg, setUpdateMsg]
	);

	return (
		<MsgContext.Provider value={contextValues}>
			<div {...props}>{children}</div>
		</MsgContext.Provider>
	);
};
