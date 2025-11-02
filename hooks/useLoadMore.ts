import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useEffectEvent } from "react";

export default function useLoadMore({
	loader,
}: {
	loader: () => Promise<void>;
}) {
	const [ref, entry] = useIntersectionObserver();

	const loadHandler = useEffectEvent(loader);

	useEffect(() => {
		console.log(entry?.isIntersecting);
		if (entry?.isIntersecting) loadHandler();
	}, [entry?.isIntersecting]);

	return { ref };
}
