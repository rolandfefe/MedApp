"use client";

import { useVerdicts } from "@/contexts/Verdicts.context";

export default function VerdictsFeed() {
	const { isLoading, loadRef, verdicts } = useVerdicts();

	console.log("Pat verdicts", verdicts);

	return <div>VerdictsFeed</div>;
}
