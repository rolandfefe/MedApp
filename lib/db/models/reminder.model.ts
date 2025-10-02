import { model, models, Schema } from "mongoose";

const reminderSchema = new Schema<IReminder>({}, { timestamps: true });

export default models?.Reminder || model<IReminder>("Reminder", reminderSchema);
