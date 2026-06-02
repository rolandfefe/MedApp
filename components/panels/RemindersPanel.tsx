import { AlarmClock, Headset, Pill, PlusCircle, User } from "lucide-react";
import { ReactNode } from "react";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ReminderForm from "../forms/ReminderForm";
import RemindersFeed from "../Feeds/RemindersFeed";
import { eReminderVariants } from "@/types/enums/enums";

export default function RemindersPanel({
	children,
	reminders,
}: {
	children: ReactNode;
	reminders: IReminder[];
}) {
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

			<SheetContent side="left" className="sm:max-w-200! sm:w-110!">
				<SheetHeader className="">
					<SheetTitle>
						<Heading className="text-2xl sm:text-3xl text-primary">
							<AlarmClock />
							Reminders
						</Heading>
					</SheetTitle>
					<SheetDescription className="hidden">set reminders.</SheetDescription>
				</SheetHeader>
				<Separator />

				<Tabs defaultValue="Appointments" className="p-2">
					<div className="flex items-center gap-x-2 justify-between">
						<TabsList className="text-sm collapsible-tabs">
							<TabsTrigger
								value="Personal"
								// className="data-[state=active]:collapsible-tab"
							>
								<User size={20} />
								<span>Personal</span>
							</TabsTrigger>
							<TabsTrigger
								value="Appointments"
								// className="data-[state=active]:collapsible-tab"
							>
								<Headset size={20} />
								<span>Appointments</span>
							</TabsTrigger>
							<TabsTrigger
								value="Medications"
								// className="data-[state=active]:collapsible-tab"
							>
								<Pill size={20} />
								<span>Medications</span>
							</TabsTrigger>
							<TabsTrigger
								value="New"
								className="data-[state=inactive]:!text-primary"
							>
								<PlusCircle />
								<span className="sm:!hidden">Add</span>
							</TabsTrigger>
						</TabsList>
						{/* <TabsList className="collapsibletabs">
						</TabsList> */}
					</div>

					<ScrollArea className="h-[97vh]">
						<TabsContent value="Appointments">
							<RemindersFeed variant={eReminderVariants.APPOINTMENT} />
						</TabsContent>
						<TabsContent value="Medications">
							<RemindersFeed variant={eReminderVariants.MEDICATION} />
						</TabsContent>
						<TabsContent value="Personal">
							<RemindersFeed variant={eReminderVariants.PERSONAL} />
						</TabsContent>
						<TabsContent value="New">
							<ReminderForm />
						</TabsContent>
					</ScrollArea>
				</Tabs>
			</SheetContent>
		</Sheet>
	);
}
