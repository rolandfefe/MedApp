import { model, models, Schema } from "mongoose";

const diagnosisSchema = new Schema<IDiagnosis>({}, { timestamps: true });

export default models?.Diagnosis ||
	model<IDiagnosis>("Diagnosis", diagnosisSchema);
