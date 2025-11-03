import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useEffectEvent, useTransition } from "react";

export default function useLoadMore({
	loader,
}: {
	loader: () => Promise<void>;
}) {
	const [ref, entry] = useIntersectionObserver();
	const [isLoading, startLoadTransition] = useTransition();

	const loadHandler = useEffectEvent(() =>
		startLoadTransition(async () => await loader())
	);

	useEffect(() => {
		console.log("isIntersecting: ", entry?.isIntersecting);
		if (entry?.isIntersecting) loadHandler();
	}, [entry?.isIntersecting]);

	return { ref, isLoading };
}
