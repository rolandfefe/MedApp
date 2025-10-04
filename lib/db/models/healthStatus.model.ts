import { ePainType, eTenScale } from "@/types/enums/enums";
import { model, models, Schema } from "mongoose";

const vitalsSchema = new Schema<IVitals>({
	bloodPressure: String,
	heartRate: String,
	temperature: String,
	respiratoryRate: String,
	oxygenSaturation: String,
	height: String,
	weight: String,
	bmi: String,
});

const healthStatusSchema = new Schema<IHealthStatus>(
	{
		patient: {
			type: Schema.Types.ObjectId,
			ref: "Patient",
			required: true,
			immutable: true,
		},
		vitals: {
			type: vitalsSchema,
			required: true,
		},
		complaint: String,
		symptoms: [
			{
				description: { type: String, required: true },
				severity: { type: String, enum: eTenScale, required: true },
				duration: String,
				onset: { type: Date, required: true },
			},
		],
		pain: [
			{
				location: { type: String, required: true },
				intensity: { type: String, enum: eTenScale, required: true },
				type: { type: String, enum: ePainType, required: true },
				aggravatingFactors: [String],
				relievingFactors: [String],
			},
		],
	},
	{ timestamps: true }
);

export default models?.HealthStatus ||
	model<IHealthStatus>("HealthStatus", healthStatusSchema);
