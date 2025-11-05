"use client";

import useLoadMore from "@/hooks/useLoadMore";
import { getMsgs } from "@/lib/actions/message.actions";
import { extend, flattenDeep, uniqBy } from "lodash-es";
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

interface Props extends IPagination {
	msgs: IMessage[];
	refMsg?: IMessage;
	editMsg?: IMessage;
	setMsgs: Dispatch<SetStateAction<IMessage[]>>;
	setRefMsg: Dispatch<SetStateAction<IMessage | undefined>>;
	setEditMsg: Dispatch<SetStateAction<IMessage | undefined>>;
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
	const [hasNextPg, setHasNextPg] = useState<boolean>(true);

	console.log("PAGE: ", nextPg);

	const loader = async () => {
		const {
			msgs: _m,
			hasNextPage,
			nextPage,
		} = await getMsgs({
			appointment: appointment.id,
			page: nextPg,
		});

		setMsgs((prev) => uniqBy([...prev, ..._m], "id"));
		setNextPg(nextPage!);
		setHasNextPg(hasNextPage);
	};

	const { ref: loadRef, isLoading } = useLoadMore({ loader, hasNextPg });

	const sync = useEffectEvent(async () => {
		const _m = await Promise.all(
			[...Array(nextPg)].map(
				async (_, i) =>
					(
						await getMsgs({
							appointment: appointment.id,
							page: i + 1,
						})
					).msgs
			)
		);

		setMsgs(uniqBy(flattenDeep(_m), "id"));
	});

	useEffect(() => {
		console.log("🔃Msgs");
		sync();
	}, [msgsInit]);

	const contextValues: Props = {
		msgs,
		setMsgs,
		refMsg,
		setRefMsg,
		editMsg,
		setEditMsg,
		nextPg,
		isLoading,
		loadRef,
	};

	return (
		<MsgContext.Provider value={contextValues}>
			<div {...props}>{children}</div>
		</MsgContext.Provider>
	);
};
