"use client";

import { eReminderStatus, eReminderVariants } from "@/types/enums/enums";
import {
	AlarmClock,
	ChevronsUpDown,
	Filter,
	PlusCircle,
	XCircle,
} from "lucide-react";
import { ReactNode, useState } from "react";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import RemindersFeed from "../Feeds/RemindersFeed";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

export default function RemindersPanel({ children }: { children: ReactNode }) {
	const [TAB, setTab] = useState<eReminderVariants | "New" | "All">("All");
	const [status, setStatus] = useState<eReminderStatus>();

	return (
		<Sheet>
			<SheetTrigger
				nativeButton={false}
				render={
					<div>
						{children || (
							<MyBtn size="icon" variant={"outline"}>
								<AlarmClock />
							</MyBtn>
						)}
					</div>
				}
			/>

			<SheetContent side="left" className="w-screen! sm:max-w-200! sm:w-110! gap-0!">
				<SheetHeader className="pb-0">
					<SheetTitle>
						<Heading className="text-2xl sm:text-3xl text-primary">
							<AlarmClock />
							Reminders
						</Heading>
					</SheetTitle>
					<SheetDescription className="hidden">set reminders.</SheetDescription>
				</SheetHeader>
				<Separator />

				<section className="p-2 md:p-3">
					<div className="flex items-center gap-x-3 justify-between mb-3">
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<MyBtn size="sm" variant={"secondary"}>
										<ChevronsUpDown />
										{TAB}
									</MyBtn>
								}
							/>

							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => setTab("All")}>
									All
								</DropdownMenuItem>
								{Object.values(eReminderVariants).map((v) => (
									<DropdownMenuItem key={v} onClick={() => setTab(v)}>
										{v}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger
								// className={"absolute -top-10 left-1/2 -translate-x-1/2 z-50"}
								render={
									<MyBtn
										variant="secondary"
										size="sm"
										className={cn(status && "text-primary")}
									>
										<Filter />
										{status ?? "Filter Status"}
									</MyBtn>
								}
							/>

							<DropdownMenuContent side="top">
								{Object.values(eReminderStatus).map((s) => (
									<DropdownMenuItem key={s} onClick={() => setStatus(s)}>
										{s}
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => setStatus(undefined)}>
									<XCircle />
									Clear
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<MyBtn
							size={"sm"}
							variant={"secondary"}
							onClick={() => setTab("New")}
							className="text-primary"
						>
							<PlusCircle /> New
						</MyBtn>
					</div>

					<ScrollArea className="h-[84vh]">
						<RemindersFeed TAB={TAB} status={status} className="pb-40" />
					</ScrollArea>
				</section>
			</SheetContent>
		</Sheet>
	);
}
