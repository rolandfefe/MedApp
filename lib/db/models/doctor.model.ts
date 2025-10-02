import {
	IBoardCertification,
	IHospitalAffiliation,
	IMedicalLicense,
} from "@/types/doctor";
import {
	eCertificationStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
	eRating,
} from "@/types/enums";
import { model } from "mongoose";
import { models, Schema } from "mongoose";

const licenseSchema = new Schema<IMedicalLicense>({
	licenseNumber: { type: String, required: true, immutable: true },
	type: { type: String, enum: eLicenseType, required: true },
	issuingState: { type: String, required: true },
	status: {
		type: String,
		enum: eLicenseStatus,
		default: eLicenseStatus.ACTIVE,
	},
	expirationDate: { type: Date, required: true },
});

const boardCertificationsSchema = new Schema<IBoardCertification>({
	boardName: { type: String, required: true },
	certificationId: {
		type: String,
		required: true,
		immutable: true,
		unique: true,
	},
	status: {
		type: String,
		enum: eCertificationStatus,
		default: eCertificationStatus.ACTIVE,
	},
	date: { type: Date, required: true },
	expirationDate: Date,
});

const hospitalAffiliationSchema = new Schema<IHospitalAffiliation>({
	name: { type: String, required: true },
	department: { type: String, required: true },
	roles: [{ type: String, required: true }],
	startDate: { type: Date, required: true },
	endDate: Date,
});

const credentialsSchema = new Schema<IDoctor["credentials"]>({
	medicalCertifications: [
		{
			type: { type: String, enum: eMedicalCertificationTypes, required: true },
			institution: { type: String, required: true },
			date: { type: Date, required: true },
			name: { type: String, required: true },
		},
	],
	licenses: [{ type: licenseSchema, required: true }],
	boardCertifications: [boardCertificationsSchema],
	hospitalAffiliations: [{ type: hospitalAffiliationSchema, required: true }],
	isVerified: { type: Boolean, default: true }, // ! true for now
});

const metricsSchema = new Schema<IDoctor["metrics"]>({
	numberOfPatients: { type: Number, default: 0 },
	readmissionRate: { type: Number, default: 0 },
	experience: Number, // years
	ratings: [
		{
			user: { type: Schema.Types.ObjectId, ref: "User" },
			rating: { type: String, enum: eRating, required: true },
		},
	],
});

const doctorSchema = new Schema<IDoctor>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true,
			// unique: true, // ! Not Restrict users from creating 2 doctor profiles.
		},
		DOB: {
			type: Date,
			required: true,
		},
		gender: {
			type: String,
			enum: eGender,
			required: true,
		},
		languages: [String],
		bio: { type: String, maxLength: 5000 },
		credentials: { type: credentialsSchema, required: true },
		specialties: [
			{
				primary: { type: String, enum: eMedicalSpecialties, required: true },
				secondary: { type: String, enum: eMedicalSpecialties },
				procedures: [{ type: String, required: true }],
			},
		],

		contact: {
			officePhone: { type: String, required: true },
			officeEmail: { type: String, required: true },
			mobilePhone: String,
		},

		metrics: metricsSchema,
	},
	{ timestamps: true }
);

export default models?.Doctor || model<IDoctor>("Doctor", doctorSchema);
