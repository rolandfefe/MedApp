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

export default function RemindersPanel({
	children,
	reminders,
}: {
	children: ReactNode;
	reminders: IReminder[];
}) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				{children || (
					<MyBtn size="icon" variant={"outline"}>
						<AlarmClock />
					</MyBtn>
				)}
			</SheetTrigger>

			<SheetContent side="left" className="sm:max-w-100">
				<SheetHeader className="p-2 ">
					<SheetTitle>
						<Heading>
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
								value="Appointments"
								className="data-[state=active]:collapsible-tab"
							>
								<Headset size={20} />
								<span>Appointments</span>
							</TabsTrigger>
							<TabsTrigger
								value="Medications"
								className="data-[state=active]:collapsible-tab"
							>
								<Pill size={20} />
								<span>Medications</span>
							</TabsTrigger>
							<TabsTrigger
								value="Personal"
								className="data-[state=active]:collapsible-tab"
							>
								<User size={20} />
								<span>Personal</span>
							</TabsTrigger>
						</TabsList>
						<TabsList className="collapsible-tabs">
							<TabsTrigger
								value="New"	
								className="data-[state=inactive]:!text-primary"
							>
								<PlusCircle />
								<span className="sm:!hidden">Add</span>
							</TabsTrigger>
						</TabsList>
					</div>

					<ScrollArea className="h-[97vh]">
						<TabsContent value="Appointments">Appointments</TabsContent>
						<TabsContent value="Medications">Medications</TabsContent>
						<TabsContent value="Personal">Personal</TabsContent>
						<TabsContent value="New">
							<ReminderForm />
						</TabsContent>
					</ScrollArea>
				</Tabs>
			</SheetContent>
		</Sheet>
	);
}
