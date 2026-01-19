import {
	ReminderFormData,
	useReminderForm,
} from "@/lib/formSchemas/Reminder.schema";
import React, { useTransition } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import MyBtn from "../custom/MyBtn";
import { AlarmClockPlusIcon } from "lucide-react";
import ToastErrCard from "../cards/ToastErrCard";
import toast from "react-hot-toast";
import { FieldErrors } from "react-hook-form";
import { Spinner } from "../ui/spinner";
import { createReminder } from "@/lib/actions/reminder.actions";
import moment from "moment";
import { useCurrent } from "@/contexts/Current.context";

export default function ReminderForm() {
	const [isPending, startTransition] = useTransition();
	const { currentUser } = useCurrent();

	const form = useReminderForm();

	const submitHandler = (data: ReminderFormData) => {
		console.log(data);

		const cleanData: IReminder = {
			...data,
			user: currentUser.id,
		};

		startTransition(async () => {
			await createReminder(cleanData);

			toast.success(
				`${data.reminderLabel} reminder set at ${moment(data.time).format("")}`
			);
		});
	};

	const errHandler = async (err: FieldErrors<ReminderFormData>) => {
		console.log("err: ", err);
		toast.custom(
			(t) => (
				<ToastErrCard t={t}>
					<div>
						{Object.entries(err).map(([k, v]) => (
							<p key={k} className={"text-sm text-secondary-foreground"}>
								<span className="font-medium text-destructive">{k}: </span>
								<code>{v.message}</code>
							</p>
						))}
					</div>
				</ToastErrCard>
			),
			{ id: "9c247bf4" }
		);
	};

	return (
		<div>
			<Form {...form}>
				<form className="space-y-4">
					<FormField
						control={form.control}
						name="reminderLabel"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Label</FormLabel>

								<FormControl>
									<Input {...field} placeholder="Enter Reminder label..." />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										placeholder="Enter description for your reminder..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="time"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>

								<FormControl>
									<Input
										type="datetime-local"
										{...field}
										placeholder="Select time..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>

				<MyBtn
					disabled={isPending}
					size="lg"
					onClick={form.handleSubmit(submitHandler, errHandler)}
				>
					{isPending ? <Spinner /> : <AlarmClockPlusIcon />}
					Set Reminder
				</MyBtn>
			</Form>
		</div>
	);
}
