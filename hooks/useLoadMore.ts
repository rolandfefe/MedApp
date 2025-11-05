import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useEffectEvent, useTransition } from "react";

export default function useLoadMore({
	loader,
	hasNextPg,
}: {
	loader: () => Promise<void>;
	hasNextPg: boolean;
}) {
	const [ref, entry] = useIntersectionObserver();
	const [isLoading, startLoadTransition] = useTransition();

	const loadHandler = useEffectEvent(() =>
		startLoadTransition(async () => await loader())
	);

	useEffect(() => {
		console.log("isIntersecting: ", entry?.isIntersecting);
		if (entry?.isIntersecting && hasNextPg) loadHandler();
	}, [entry?.isIntersecting, hasNextPg]);

	return { ref, isLoading };
}

export type IntersectingRef = ReturnType<typeof useIntersectionObserver>[0];
