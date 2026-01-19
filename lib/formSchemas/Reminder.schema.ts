import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const reminderFormSchema = z.object({
	reminderLabel: z.string().min(1, "Body text is required!"),
	description: z
		.string()
		.max(500, "Description should be at most 500 characters!")
		.optional(),
	time: z.string().datetime(),
});

export type ReminderFormData = z.infer<typeof reminderFormSchema>;

export const useReminderForm = (reminder?: IReminder) =>
	useForm({
		resolver: zodResolver(reminderFormSchema),
		defaultValues: {
			reminderLabel: reminder?.reminderLabel || "",
			description: reminder?.description || "",
			time: reminder?.time || "",
		},
	});
