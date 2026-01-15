"use client";

import { getVerdicts } from "@/lib/actions/verdict.actions";
import {
	ComponentProps,
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useEffectEvent,
	useState,
} from "react";
import { useCurrent } from "./Current.context";
import { flattenDeep, uniqBy } from "lodash";
import useLoadMore from "@/hooks/useLoadMore";

interface Props extends IPagination {
	verdicts: IVerdict[];
	setVerdicts: Dispatch<SetStateAction<IVerdict[]>>;
}

const VerdictContext = createContext<Props | null>(null);

export const useVerdicts = () => {
	const context = useContext(VerdictContext);

	if (!context)
		throw new Error("Element MUST be child of '<VerdictContext />'");

	return context;
};

export const VerdictsProvider = ({
	verdictsInit,
	children,
	...props
}: { verdictsInit: IVerdict[] } & ComponentProps<"div">) => {
	const [verdicts, setVerdicts] = useState<IVerdict[]>(verdictsInit ?? []);
	const [nextPg, setNextPg] = useState<number>();
	const [hasNextPg, setHasNextPg] = useState<boolean>(true);
	const { currentPatient, currentDoctor } = useCurrent();

	const loader = async () => {
		const {
			verdicts: _v,
			hasNextPage,
			nextPage,
		} = await getVerdicts({
			patient: currentPatient!.id,
			doctor: currentDoctor!.id,
			page: nextPg,
		});

		setVerdicts((prev) => uniqBy([..._v, ...prev], "id"));
		setNextPg(nextPage!);
		setHasNextPg(hasNextPage);
	};

	const { ref: loadRef, isLoading } = useLoadMore({ loader, hasNextPg });

	const sync = useEffectEvent(async () => {
		const _v = await Promise.all(
			[...Array(nextPg)].map(
				async (_, i) =>
					(
						await getVerdicts({
							patient: currentPatient!.id,
							doctor: currentDoctor!.id,
							page: i + 1,
						})
					).verdicts
			)
		);

		setVerdicts(uniqBy(flattenDeep(_v), "id"));
	});

	useEffect(() => {
		sync();
	}, [verdictsInit]);

	const contextValue: Props = {
		verdicts,
		setVerdicts,
		loadRef,
		isLoading,
	};

	return (
		<VerdictContext.Provider value={contextValue}>
			<div {...props}>{children}</div>
		</VerdictContext.Provider>
	);
};
