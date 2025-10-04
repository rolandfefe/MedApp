import React, { Dispatch, SetStateAction } from "react";
import { Card, CardContent } from "../ui/card";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "../ui/badge";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronsDownUp } from "lucide-react";

export default function MultiSelectPicker<
	E extends Record<string, string | number>
>({
	enumObj,
	setSelected,
	selected,
	variant,
}: {
	enumObj: E;
	selected?: E[keyof E][];
	setSelected: Dispatch<SetStateAction<E[keyof E][] | undefined>>;
	variant: "Textarea-picker" | "Badge-picker";
}) {
	const selectHandler = (v: E[keyof E]) => {};

	if (variant === "Textarea-picker") {
		return (
			<Card>
				<CardContent>
					<div className="flex items-center gap2">
						<AnimatePresence>
							{selected?.map((v, i) => (
								<motion.div
									key={i}
									layout
									initial={{ opacity: 0, y: 100 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 100 }}
								>
									<Badge variant={"secondary"}>{i}</Badge>
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					<div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								Select Item <ChevronsDownUp />
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								{Object.entries(enumObj).map(([k, v]) => {
									console.log(v);
									return <DropdownMenuItem key={k}>{v}</DropdownMenuItem>;
								})}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardContent>
			</Card>
		);
	} else if (variant === "Badge-picker") {
		return (
			<div className="flex items-center gap-2 flex-wrap">
				{Object.entries(enumObj).map(([k, v]) => (
					<Badge key={k} variant={"secondary"} onClick={() => selectHandler(v)}>
						{v}
					</Badge>
				))}
			</div>
		);
	}
}
