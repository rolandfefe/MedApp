"use client";

import useLoadMore from "@/hooks/useLoadMore";
import {
	getReferrals,
	getReferralsByPatient,
} from "@/lib/actions/referral.actions";
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

interface Props extends IPagination {
	referrals: IReferral[];
	setReferrals: Dispatch<SetStateAction<IReferral[]>>;
}

interface ActionReturnType {
	referrals: IReferral[];
	hasNextPage: boolean;
	nextPage: number | undefined;
}

const ReferralContext = createContext<Props | null>(null);

export const useReferrals = () => {
	const context = useContext(ReferralContext);

	if (!context)
		throw new Error("Element MUST be child of '<ReferralsProvider />'");

	return context;
};

export const ReferralsProvider = ({
	referralsInit,
	children,
	variant,
	...props
}: {
	referralsInit: IReferral[];
	variant: "Patient" | "Doctor";
} & ComponentProps<"div">) => {
	const [referrals, setReferrals] = useState<IReferral[]>([]);
	const [nextPg, setNextPg] = useState<number>();
	const [hasNextPg, setHasNextPg] = useState<boolean>(true);

	const { currentPatient, currentDoctor: doctor } = useCurrent();

	const fetchAction =
		variant === "Doctor"
			? async (page: number) =>
					await getReferrals({
						from: doctor!.id,
						to: doctor!.id,
						page,
					})
			: async (page: number) =>
					await getReferralsByPatient({
						patient: currentPatient!.id,
						page,
					});

	const loader = async () => {
		const { referrals: _r, hasNextPage, nextPage } = await fetchAction(nextPg!);

		setReferrals((prev) => uniqBy([..._r, ...prev], "id"));
		setNextPg(nextPage!);
		setHasNextPg(hasNextPage);
	};

	const { ref: loadRef, isLoading } = useLoadMore({ loader, hasNextPg });

	const sync = useEffectEvent(async () => {
		const _r = await Promise.all(
			[...Array(nextPg)].map(
				async (_, i) => (await fetchAction(i + 1)).referrals
			)
		);

		setReferrals(uniqBy(flattenDeep(_r), "id"));
	});

	useEffect(() => {
		sync();
	}, [referralsInit]);

	const contextValues: Props = {
		referrals,
		setReferrals,
		isLoading,
		loadRef,
	};

	return (
		<ReferralContext.Provider value={contextValues}>
			<div {...props}>{children}</div>
		</ReferralContext.Provider>
	);
};
