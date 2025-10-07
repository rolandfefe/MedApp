import {
	eConfidenceLevel,
	eDiagnosisStatus,
	eLaterality,
	eSeverity,
} from "@/types/enums/enums";
import { model, models, Schema } from "mongoose";

const differentialDiagnosisSchema = new Schema({
	// Diagnosis information
	condition: {
		type: String,
		required: true,
		trim: true,
	},
	icd10Code: {
		type: String,
		trim: true,
		match: [/^[A-Za-z0-9.-]+$/, "Please enter a valid ICD-10 code"],
	},

	// Confidence level enum
	confidence: {
		type: String,
		enum: eConfidenceLevel,
		required: true,
	},

	reasoning: {
		type: String,
		required: false,
		trim: true,
	},

	// Diagnostic details
	isPrimary: {
		type: Boolean,
		required: true,
		default: false,
	},

	laterality: {
		type: String,
		enum: eLaterality,
	},

	severity: {
		type: String,
		enum: eSeverity,
	},

	stage: {
		type: String,
		trim: true,
	},

	dateConfirmed: {
		type: Date,
		required: true,
	},
});

const diagnosisSchema = new Schema<IDiagnosis>(
	{
		// Reference fields
		appointment: {
			type: Schema.Types.ObjectId,
			ref: "Appointment",
			required: true,
			unique: true,
			immutable: true,
		},
		patient: {
			type: Schema.Types.ObjectId,
			ref: "Patient",
			required: true,
			immutable: true,
		},
		doctor: {
			type: Schema.Types.ObjectId,
			ref: "Doctor",
			required: true,
			immutable: true,
		},

		// Health status reference
		healthStatus: {
			type: Schema.Types.ObjectId,
			ref: "HealthStatus",
			required: true,
			immutable: true,
		},

		history: {
			type: Schema.Types.ObjectId,
			ref: "History",
			required: true,
			immutable: true,
		},

		// Medical information
		chiefComplaint: {
			type: String,
			trim: true,
		},
		preAppointmentNotes: {
			type: String,
			trim: true,
		},
		medicationsReviewed: {
			type: Boolean,
			default: false,
		},
		templateUsed: {
			type: String,
			trim: true,
		},

		// Date fields
		onsetDate: {
			type: Date,
			required: true,
		},
		dateResolved: {
			type: Date,
			required: false,
		},

		// Clinical information
		historyOfPresentIllness: {
			type: String,
			required: true,
			trim: true,
		},

		// Array of differential diagnoses using the sub-schema
		differentialDiagnosis: [differentialDiagnosisSchema],

		// Status enum (adjust based on your actual eDiagnosticStatus values)
		status: {
			type: String,
			enum: eDiagnosisStatus,
			required: true,
			default: eDiagnosisStatus.Pending,
		},

		// Track who last updated
		updatedBy: {
			type: Schema.Types.ObjectId,
			ref: "Doctor",
		},
	},
	{
		timestamps: true,
	}
);

export default models?.Diagnosis || model("Diagnosis", diagnosisSchema);
