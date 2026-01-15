"use client";

import useLoadMore from "@/hooks/useLoadMore";
import { flattenDeep, uniqBy } from "lodash";
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
import {
	getPlans,
	getPlansByPatient,
} from "@/lib/actions/recurrencePlan.actions";

interface Props extends IPagination {
	plans: IRecurrencePlan[];
	setPlans: Dispatch<SetStateAction<IRecurrencePlan[]>>;
}

interface ActionReturnType {
	plans: IRecurrencePlan[];
	hasNextPage: boolean;
	nextPage: number | undefined;
}

const PlansContext = createContext<Props | null>(null);

export const usePlans = () => {
	const context = useContext(PlansContext);

	if (!context)
		throw new Error("Component is not child of '<PlansProvider />'");

	return context;
};

export function PlanProvider({
	plansInit,
	children,
	variant,
	...props
}: {
	plansInit: IRecurrencePlan[];
	variant: "Patient" | "Doctor";
} & ComponentProps<"div">) {
	const [plans, setPlans] = useState<IRecurrencePlan[]>(plansInit);
	const [nextPg, setNextPg] = useState<number>();
	const [hasNextPg, setHasNextPg] = useState<boolean>(true);
	const { currentDoctor: doctor, currentPatient } = useCurrent();

	const fetchAction =
		variant === "Doctor"
			? async (page: number) => await getPlans({ supervisor: doctor!.id, page })
			: async (page: number) =>
					await getPlansByPatient({
						patient: currentPatient!.id,
						page,
					});

	const loader = async () => {
		const { plans: _m, hasNextPage, nextPage } = await fetchAction(nextPg!);

		setPlans((prev) => uniqBy([..._m, ...prev], "id"));
		setNextPg(nextPage!);
		setHasNextPg(hasNextPage);
	};

	const { ref: loadRef, isLoading } = useLoadMore({ loader, hasNextPg });

	const sync = useEffectEvent(async () => {
		const _p = await Promise.all(
			[...Array(nextPg)].map(async (_, i) => (await fetchAction(i + 1)).plans)
		);

		setPlans(uniqBy(flattenDeep(_p), "id"));
	});

	useEffect(() => {
		sync();
	}, [plansInit]);

	const contextValues: Props = {
		plans,
		setPlans,
		isLoading,
		loadRef,
	};

	return (
		<PlansContext.Provider value={contextValues}>
			<div {...props}>{children}</div>
		</PlansContext.Provider>
	);
}
