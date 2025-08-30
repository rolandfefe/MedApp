import {
	eAllergySeverity,
	eAppointmentTypes,
	eArticleCategories,
	eArticleType,
	eGender,
	eLicenseType,
	eMaritalStatus,
	eMedicalDegreeTypes,
	eMedicalSpecialties,
	eMethodOfDrugAdministration,
	eWeekDays,
} from "@/constants/enums";

export {};

declare global {
	interface IUser {
		_id?: string;
		clerkId: string;
		username: string;
		fname?: string;
		lname?: string;
		email: string;
		imageUrl?: string;

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IPatient {
		_id?: string;
		user: IUser | string;
		DOB: string;
		gender: eGender;
		maritalStatus?: eMaritalStatus;
		occupation?: string;
		ethnicity?: string;
		race?: string;
		languagesSpoken: eLanguages[];

		emergencyContacts: {
			name: string;
			relationship: string;
			phone: string;
			priority: number;
		}[];

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IDoctor {
		_id?: string;
		user: IUser | string;
		DOB: Date;
		gender: eGender;
		bio?: string;
		languagesSpoken: eLanguages[];

		// Professional Credentials & Qualifications
		credentials: {
			medicalDegree: {
				type: eMedicalDegreeTypes;
				institution: string;
				date: Date;
			};
			licenses: IMedicalLicense[];
			boardCertifications?: IBoardCertification[];
			hospitalAffiliations: IHospitalAffiliation[];
			residencies: Array<{
				specialty: string;
				hospital: string;
				startDate: Date;
				endDate?: Date;
			}>;
			isVerified: boolean;
		};

		// Specialties & Expertise
		specialties: {
			primary: eMedicalSpecialties;
			secondary?: eMedicalSpecialties[];
			procedures: string[]; // List of procedures they are qualified to perform
		};

		contactInfo: {
			officePhone: string;
			officeEmail?: string;
			mobilePhone?: string; // For on-call purposes
			pager?: string;
		};

		// Professional Schedule & Availability
		schedule: {
			officeHours: Array<{
				dayOfWeek: eWeekDays;
				startTime: string; // in HH:MM format
				endTime: string;
				isAvailable: boolean;
			}>;
			averageAppointmentDuration: string;
			isAcceptingNewPatients: boolean;
			nextAvailableAppointmentDate?: Date;
		};

		// Professional Metrics & Performance (For internal/admin use)
		metrics?: {
			rating?: number[]; // 0-100 scale
			numberOfPatients: number;
			yearsOfExperience: number;
			readmissionRate?: number;
		};

		// ? System Access & Administrative Data
		// systemAccess: {
		// 	role:
		// 		| "admin"
		// 		| "physician"
		// 		| "resident"
		// 		| "fellow"
		// 		| "nurse-practitioner";
		// 	ehrSystemUsername: string;
		// 	permissions: string[]; // e.g., ['prescribe_medications', 'view_all_records', 'order_labs']
		// 	isActive: boolean;
		// };

		createdAt?: Date;
		updatedAt?: Date;
	}

	// Supporting Interfaces for more complex structures

	interface IMedicalLicense {
		licenseNumber: string;
		state: string;
		issuingState: string; // or country/province
		expirationDate?: Date;
		active: boolean;
		licenseType: eLicenseType;
	}

	interface IBoardCertification {
		boardName: string; // e.g., 'American Board of Internal Medicine'
		specialty: string; // e.g., 'Internal Medicine'
		subSpecialty?: string; // e.g., 'Cardiovascular Disease'
		certificationId: string;
		initialCertificationDate: Date;
		expirationDate?: Date; // Time-limited certifications
		status: "active" | "expired" | "not-certified";
	}

	interface IHospitalAffiliation {
		name: string;
		startDate: Date;
		endDate?: Date; // If the affiliation has ended
		department: string;
		role: string; // e.g., 'Attending Physician', 'Chief of Surgery'
		privilegeDetails?: string[]; // Specific procedures they are privileged for
	}

	interface IHistory {
		_id?: string;
		patient: IPatient | string;

		pastConditions: Array<{
			condition: string;
			diagnosisDate?: Date;
			resolved: boolean;
			resolutionDate?: Date;
		}>;
		surgicalHistory: Array<{
			procedure: string;
			date: Date;
			facility?: string;
		}>;
		familyHistory: Array<{
			condition: string;
			relation: string;
			notes?: string;
		}>;

		// socialHistory
		smoking: {
			status: "never" | "former" | "current";
			years?: number;
			quitDate?: Date;
		};
		alcohol: {
			status: "never" | "occasional" | "regular";
			drinksPerWeek?: number;
			type?: string;
		};
		substanceUse?: {
			substances: string[];
			frequency?: string;
			lastUse?: Date;
		};
		exercise?: string; // e.g., "3 times per week"
		diet?: string; // e.g., "vegetarian", "Mediterranean"

		// Allergies
		allergies: IAllergy[];

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IAllergy {
		_id?: string;

		substance: string;
		reaction: string;
		severity: eAllergySeverity;
		onsetDate?: Date;
		documentedBy: string;
		lastReactionDate?: Date;

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IMedication {
		_id?: string;
		name: string;
		prescribedBy: IDoctor | IUser;
		dosage: string;
		frequency: string;
		route: eMethodOfDrugAdministration;
		startDate: Date;
		endDate?: Date;
		active: boolean;

		reason?: string;
		instructions?: string;
		sideEffects?: string[];

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IVitals {
		_id?: string;

		bloodPressure?: string;
		heartRate?: number;
		temperature?: number;
		respiratoryRate?: number;
		oxygenSaturation?: number;
		height?: number;
		weight?: number;
		bmi?: number;

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IArticle {
		_id: string;
		title: string;
		subtitle?: string;
		authors: IDoctor[];

		// Publication Metadata
		publication?: {
			publisher: string;
			version?: string;
			Date: Date;
		};

		content: {
			body: Array<{
				sectionTitle: string;
				sectionContent: string;
			}>;
			supplementaryMaterials?: Array<{
				title: string;
				url: string;
			}>;
			figures: Array<{
				caption: string;
				url: string;
				type: "image" | "chart" | "graph" | "table";
			}>;
			references?: Array<{
				citation: string; // Full APA/AMA/Vancouver format citation
			}>;
		};

		validation: {
			peerReviewed: boolean;
			conflictOfInterestStatement: string;
			isVerified: boolean;
		};

		licensing: {
			copyright: string; // e.g., "© 2023 American Medical Association"
			licenseType: string; // e.g., "CC-BY-NC 4.0"
			isOpenAccess: boolean;
		};

		// Metadata for discoverability and administration
		meta: {
			articleType: eArticleType;
			categories: eArticleCategories; // MeSH terms or other categories

			reads: IUser[] | string[];
			likes: IUser[] | string[];
			dislikes: IUser[] | string[];
		};
	}

	interface IAppointment {
		_id?: string;

		patient: IPatient | string;
		doctor: IDoctor | string;
		starTime: Date;
		endTime: Date;
		// Appointment Details
		type:eAppointmentTypes;
		status: eAppointmentStatus;
		reason: string; // Chief complaint or reason for appointment
		chiefComplaint?: string; // More formal medical description

		// Clinical Context
		vitalsRecorded?: boolean;
		vitals?: IVitals;
		nurseNotes?: string;
		preAppointmentQuestionnaireCompleted?: boolean;

		// Recurring Appointments
		isRecurring: boolean;
		recurrencePattern?: {
			frequency: "daily" | "weekly" | "bi-weekly" | "monthly";
			interval: number;
			endDate?: Date;
			exceptions: Date[]; // Dates where the recurrence doesn't happen
		};
		originalAppointmentId?: string; // For rescheduled appointments

		// Communication & Reminders
		reminders: {
			sent: {
				sms: boolean;
				email: boolean;
				push: boolean;
			};
			lastReminderSentAt?: Date;
			confirmation: {
				method: "auto" | "manual" | "none";
				confirmed: boolean;
				confirmedAt?: Date;
				confirmedBy?: "patient" | "staff" | "system";
			};
		};

		// Cancellation & No-Show Details
		cancellation?: {
			cancelledAt: Date;
			cancelledBy: "patient" | "doctor" | "staff" | "system";
			reason: string;
		};

		// Follow-up & Outcomes
		followUpInstructions?: string;
		refAppointment?: IAppointment | string;
		referral?: {
			specialistId?: string;
			specialistName?: string;
			reason: string;
		};

		createdAt: Date;
		updatedAt: Date;
	}

	// Supporting Interfaces for Complex Types

	interface IRecurrencePattern {
		frequency: "daily" | "weekly" | "bi-weekly" | "monthly";
		interval: number;
		daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
		dayOfMonth?: number;
		endDate?: Date;
		occurrenceCount?: number;
		exceptions: Date[];
	}

	interface IAppointmentReminder {
		type: "sms" | "email" | "push" | "voice";
		scheduledTime: Date; // When to send the reminder
		sent: boolean;
		sentAt?: Date;
		deliveryStatus?: "pending" | "delivered" | "failed";
		failureReason?: string;
	}

	interface IAppointmentBillingDetails {
		insuranceProviderId?: string;
		insurancePlanId?: string;
		subscriberId?: string;
		groupNumber?: string;
		estimatedCost?: number;
		patientResponsibility?: number;
		paidAmount?: number;
		paymentMethod?: "cash" | "card" | "check" | "hsa" | "insurance";
		invoiceId?: string;
	}

	interface IAppointmentClinicalContext {
		preAppointmentNotes?: string;
		medicationsReviewed?: boolean;
		allergiesReviewed?: boolean;
		requiredLabs?: string[];
		requiredImaging?: string[];
		templateUsed?: string; // EHR template name
	}
}
