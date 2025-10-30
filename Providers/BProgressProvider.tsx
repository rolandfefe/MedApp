"use client";

import { ProgressProvider } from "@bprogress/next/app";

const BProgressProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ProgressProvider
			height="3px"
			color="#3dcc43"
			options={{ showSpinner: false }}
			shallowRouting
		>
			{children}
		</ProgressProvider>
	);
};

export default BProgressProvider;
