import {
	eAppointmentStatus,
	eAppointmentTypes,
	ePatientConsent,
} from "@/types/enums/enums";
import { CollectionConfig } from "payload";

export const Appointments: CollectionConfig = {
	slug: "appointments",
	// ! typescript:  {interface: "IAppointment",},
	fields: [
		{
			name: "patient",
			type: "relationship",
			relationTo: "patients",
			required: true,
		},
		{
			name: "doctor",
			type: "relationship",
			relationTo: "doctors",
			// required: true,
		},
		// {
		// 	name: "diagnosis",
		// 	type: "relationship",
		// 	relationTo: "diagnoses",
		// },

		// ! transferred to Diagnosis
		// {
		// 	name: "healthStatus",
		// 	type: "relationship",
		// 	relationTo: "healthStatuses",
		// },
		// !Could be removed in future
		{
			name: "reminders",
			type: "relationship",
			relationTo: "reminders",
			hasMany: true,
		},
		{ name: "reason", type: "textarea", required: true },
		{
			name: "type",
			type: "select",
			options: Object.entries(eAppointmentTypes).map(([label, value]) => ({
				label,
				value,
			})),
			required: true,
		},
		{
			name: "status",
			type: "select",
			options: Object.entries(eAppointmentStatus).map(([label, value]) => ({
				label,
				value,
			})),
			defaultValue: eAppointmentStatus.SCHEDULED,
		},
		{
			name: "confirmation",
			type: "group",
			fields: [
				{ name: "isConfirmed", type: "checkbox", defaultValue: false },
				{ name: "confirmedAt", type: "date" },
				{ name: "confirmedBy", type: "relationship", relationTo: "users" },
			],
		},
		{
			name: "cancellation",
			type: "group",
			fields: [
				{ name: "cancelledAt", type: "date", defaultValue: new Date() },
				{ name: "cancelledBy", type: "relationship", relationTo: "users" },
				{ name: "reason", type: "textarea" },
			],
		},
		{ name: "startTime", type: "date" },
		{ name: "endTime", type: "date" },

		// Consultation details.
		{ name: "patientNotes", type: "richText" }, // ? Visible to patient
		{ name: "doctorNotes", type: "richText" }, // ? Visible to Other doctors
		// { name: "followUpInstructions", type: "richText" },

		{
			name: "consentLevels",
			type: "select",
			options: Object.entries(ePatientConsent).map(([label, value]) => ({
				label,
				value,
			})),
			defaultValue: [ePatientConsent.HISTORY],
			hasMany: true,
		},

		{ name: "isEmergency", type: "checkbox", defaultValue: "false" },
		// {name: "imgs", type: } // ! image field
		{
			name: "online",
			type: "group",
			defaultValue: {},
			fields: [
				{ name: "url", type: "text" }, // ! should be required
				{ name: "accessCode", type: "text" },
			],
		},
	],
};
