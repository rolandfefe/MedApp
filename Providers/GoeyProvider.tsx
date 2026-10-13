"use client";

import { GooeyToaster } from "goey-toast";
import { ComponentProps, ReactNode } from "react";
import "goey-toast/styles.css";
import { useTheme } from "next-themes";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function GoeyProvider({
	children,
	...props
}: { children: ReactNode } & ComponentProps<typeof GooeyToaster>) {
	const { theme: _theme, systemTheme } = useTheme();
	const isSMScreen = useMediaQuery("(width <= 640px)");

	const theme = _theme === "system" ? systemTheme : _theme;

	return (
		<>
			<GooeyToaster
				{...props}
				theme={theme as "light" | "dark"}
				position={isSMScreen ? "top-center" : "bottom-right"}
			/>
			{children}
		</>
	);
}
