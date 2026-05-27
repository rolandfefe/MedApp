import React, { Dispatch, SetStateAction, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SearchFilter } from "./smart-search";
import { cn } from "@/lib/utils";

export default function DropdownFilter({
	filter,
	toggleFilter,
	activeFilters,
	setActiveFilters,
}: {
	filter: SearchFilter;
	toggleFilter: (filterKey: string) => void;
	activeFilters: string[];
	setActiveFilters: Dispatch<SetStateAction<string[]>>;
}) {
	const [selected, setSelected] = useState<string | number>();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(
					activeFilters.includes(filter.key)
						? "bg-primary/10 border-primary/20 text-primary"
						: "bg-muted border-border text-muted-foreground hover:bg-muted/80"
				)}
			>
				{selected ?? filter.label}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{Object.entries(filter.itemsEnum!).map(([k, v]) => (
					<DropdownMenuItem
						onClick={() => {
							toggleFilter(filter.key);
							setSelected(v);
						}}
						key={k}
					>
						{v}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
