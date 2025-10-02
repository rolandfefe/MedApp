import { model, models, Schema } from "mongoose";

const referralSchema = new Schema<IReferral>({}, { timestamps: true });

export default models?.Referral || model<IReferral>("Referral", referralSchema);
