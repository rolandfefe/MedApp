import {
	eAllergySeverity,
	eAppointmentStatus,
	eAppointmentTypes,
	eArticleCategories,
	eArticleType,
	eConfidenceLevel,
	eDiagnosticStatus,
	eGender,
	eLicenseStatus,
	eLicenseType,
	eMaritalStatus,
	eMedicalDegreeTypes,
	eMedicalSpecialties,
	eMessageStatus,
	eMethodOfDrugAdministration,
	eRating,
	eReminderVariants,
	eWeekDays,
} from "@/types/enums";
import {
	IBoardCertification,
	IHospitalAffiliation,
	IMedicalLicense,
} from "./doctor";

export {};

declare global {
	interface Base {
		_id?: string;

		createdAt?: Date | string;
		updatedAt?: Date | string;
	}

	interface IUser extends Base {
		clerkId: string;
		username: string;
		fname?: string;
		lname?: string;
		email: string;
		imageUrl?: string;
	}

	interface IPatient extends Base {
		user: IUser | string;
		DOB: Date | string;
		gender: eGender;
		maritalStatus?: eMaritalStatus;
		occupation?: string;
		race?: string;
		languages?: eLanguages[];

		emergencyContacts: {
			name: string;
			relationship: string;
			phone: string;
			priority: eRating;
		}[];
	}

	interface IDoctor extends Base {
		user: IUser | string;
		DOB: Date | string;
		gender: eGender;
		bio?: string;
		languages: eLanguages[];

		// Professional Credentials & Qualifications
		credentials: {
			medicalDegrees: Array<{
				type: eMedicalDegreeTypes;
				institution: string;
				date: Date | string;
			}>;
			licenses: IMedicalLicense[];
			boardCertifications?: IBoardCertification[];
			hospitalAffiliations: IHospitalAffiliation[];
			isVerified: boolean;
		};

		// Specialties & Expertise
		specialties: Array<{
			primary: eMedicalSpecialties;
			secondary?: eMedicalSpecialties[];
			procedures: string[]; // List of procedures they are qualified to perform
		}>;

		contact: {
			officePhone: string;
			officeEmail: string;
			mobilePhone?: string; // For on-call purposes
			pager?: string;
		};

		// Professional Schedule & Availability

		// Professional Metrics & Performance (For internal/admin use)
		metrics?: {
			ratings?: { user: IUser | string; rating: eRating }[]; // 0-100 scale
			numberOfPatients?: number;
			experience?: number;
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
	}

	interface ISchedule extends Base {
		doctor: IDoctor | string;
		officeHours: Array<{
			dayOfWeek: eWeekDays;
			startTime: string; // in HH:MM format
			endTime: string;
			isAvailable: boolean;
		}>;
		averageAppointmentDuration: string;
		isAcceptingNewPatients: boolean;
		nextAvailableAppointmentDate | string?: Date | string;
	}

	interface IHistory extends Base {
		patient: IPatient | string;

		pastConditions: Array<{
			condition: string;
			diagnosisDate | string?: Date | string;
			resolved: boolean;
			resolutionDate | string?: Date | string;
		}>;
		surgicalHistory: Array<{
			procedure: string;
			date: Date | string;
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
			quitDate | string?: Date | string;
		};
		alcohol: {
			status: "never" | "occasional" | "regular";
			drinksPerWeek?: number;
			type?: string;
		};
		substanceUse?: {
			substances: string[];
			frequency?: string;
			lastUse?: Date | string;
		};
		exercise?: string; // e.g., "3 times per week"
		diet?: string; // e.g., "vegetarian", "Mediterranean"

		// Allergies
		allergies: IAllergy[];
	}

	interface IAllergy extends Base {
		substance: string;
		reaction: string;
		severity: eAllergySeverity;
		onsetDate | string?: Date | string;
		documentedBy: string;
		lastReactionDate | string?: Date | string;
	}

	interface IMedication extends Base {
		name: string;
		doctor: IDoctor | IUser;
		dosage: string;
		frequency: string;
		route: eMethodOfDrugAdministration;
		startDate | string: Date | string;
		endDate | string?: Date | string;
		active: boolean;

		reason?: string;
		instructions?: string;
		sideEffects?: string[];
	}

	interface IVitals extends Base {
		bloodPressure?: string;
		heartRate?: number;
		temperature?: number;
		respiratoryRate?: number;
		oxygenSaturation?: number;
		height?: number;
		weight?: number;
		bmi?: number;
	}

	interface IArticle extends Base {
		_id: string;
		title: string;
		subtitle?: string;
		authors: IDoctor[];

		// Publication Metadata
		publication?: {
			publisher: string;
			version?: string;
			Date | string: Date | string;
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

	interface IAppointment extends Base {
		// ? Optional since we want to allow Open appointments
		patient?: IPatient | string;
		doctor?: IDoctor | string;
		starTime: Date | string;
		endTime: Date | string;

		// Appointment Details
		type: eAppointmentTypes;
		status: eAppointmentStatus;
		reason: string; // Chief complaint or reason for appointment
		diagnosis?: IDiagnosis;

		// ? Appointments can be under recurrence plan.
		recurrencePattern?: IRecurrencePlan | string;
		// Communication & Reminders
		reminders: IReminder[];

		confirmation?: {
			isConfirmed: boolean;
			confirmedAt?: Date | string;
			confirmedBy?: "patient" | "staff" | "system";
		};

		cancellation?: {
			cancelledAt: Date | string;
			cancelledBy: "patient" | "doctor" | "staff";
			reason: string;
		};

		// Follow-up & Outcomes
		followUpInstructions?: string;
		referral?: IReferral;

		createdAt: Date | string;
		updatedAt: Date | string;
	}

	// ? Allow constant follow up on the patients
	interface IRecurrencePlan extends Base {
		supervisor: IPatient | IDoctor | string;
		name: string;
		frequency: "daily" | "weekly" | "bi-weekly" | "monthly";
		interval: number;
		weekDays?: eWeekDays[];
		// dayOfMonth?: number;
		startDate | string?: Date | string;
		endDate | string?: Date | string;
		occurrenceCount?: number;
		exceptions: Date | string[];

		createdAt: Date | string;
		updatedAt: Date | string;
	}

	interface IReferral extends Base {
		appointment: IAppointment | string;

		reason: string;

		createdAt: Date | string;
		updatedAt: Date | string;
	}

	interface IReminder extends Base {
		user: IUser | string;

		variant: eReminderVariants;
		item: IAppointment | IMedication | string;
		body: string;

		scheduledTime: Date | string;
		sent: boolean;
		status?: "pending" | "sent" | "failed";

		createdAt: Date | string;
		updatedAt: Date | string;
	}

	interface IDiagnosis extends Base {
		appointment: IAppointment | string;
		patient: IPatient | string;
		doctor: IDoctor | string;

		chiefComplaint?: string; // More formal medical description

		preAppointmentNotes?: string;
		medicationsReviewed?: boolean;
		templateUsed?: string; // EHR template name

		onsetDate | string?: Date | string;
		dateResolved?: Date | string;

		healthStatus: IHealthStatus | string;

		// Presenting Information
		historyOfPresentIllness: string;

		differentialDiagnosis: IDifferentialDiagnosis[];
		status: eDiagnosticStatus;

		createdAt: Date | string;
		updatedAt: Date | string;
		updatedBy: IDoctor | string;
	}

	interface IDifferentialDiagnosis extends Base {
		condition: string;
		icd10Code?: string;
		confidence: eConfidenceLevel;
		reasoning?: string;
		isPrimary: boolean; // Primary vs. secondary/comorbid diagnosis
		laterality?: "left" | "right" | "bilateral"; // For side-specific conditions
		severity?: "mild" | "moderate" | "severe";
		stage?: string; // e.g., "Stage IIB", "Class 3"
		dateConfirmed: Date | string;
	}

	interface IVerdict extends Base {
		diagnosis: IDiagnosis | string; // Links back to the IDiagnosis record
		doctor: IDoctor | string;

		// The Final Diagnosis
		confirmedDiagnoses: IDifferentialDiagnosis[];

		// Clinical Impact & Assessment
		clinicalSummary: string; // Summary of the case and findings
		complications?: string[]; // Any complications identified
		prognosis: {
			outlook: "excellent" | "good" | "fair" | "poor" | "guarded";
			estimatedRecoveryTime?: string; // e.g., "2-4 weeks"
			notes?: string;
		};

		// Treatment Plan Derived from the Verdict
		treatmentPlan: {
			plan: string; // Overall description of the treatment approach
			medications: IMedication[];
			procedures?: Array<{
				type: string;
				scheduledDate | string?: Date | string;
				status: "recommended" | "scheduled" | "completed";
			}>;
			therapies?: Array<{
				type: string; // e.g., "Physical Therapy", "Occupational Therapy"
				frequency: string;
				duration: string;
			}>;
			lifestyleRecommendations?: string[];
		};

		// Follow-up and Monitoring
		followUp: {
			isRequired: boolean;
			frequency?: string; // e.g., "every 3 months"
			nextAppointmentDate | string?: Date | string;
			monitoringInstructions?: string; // What to watch for at home
		};

		// Patient Education & Communication
		patientExplanation: string; // How the diagnosis was explained to the patient in layman's terms
		patientMaterialsProvided?: string[]; // e.g., ["brochure_on_hypertension", "website_link"]

		// Verification & Sign-off
		dateFinalized?: Date | string;
		isConfirmed: boolean;
		requiresSecondOpinion: boolean;
		secondOpinionClinicianId?: string;

		// Metadata
		createdBy: string;
		createdAt: Date | string;
		updatedAt: Date | string;
		updatedBy: string;
	}

	// ! Forms Basis of patient follow up
	interface IHealthStatus extends Base {
		patient: IPatient | string;
		vitals: IVitals | string;

		chiefComplaint?: string;
		symptoms?: Array<{
			description: string;
			onset: Date | string;
			severity: number; // 1-10 scale
			duration?: string;
		}>;

		pain?: {
			location: string;
			intensity: number; // 0-10 scale
			character: string; // sharp, dull, burning, etc.
			aggravatingFactors?: string[];
			relievingFactors?: string[];
		};

		createdAt: Date | string;
		updatedAt: Date | string;
	}

	interface IMessage extends Base {
		appointment: IAppointment | string;
		body: string;
		status: eMessageStatus;
		refMessage?: IMessage | string;

		from: IUser | string;
		to: IUser | string;

		createdAt: Date | string;
		updatedAt: Date | string;
	}

	interface CustomJwtSessionClaims extends Base {
		metadata: {
			onboardingComplete?: boolean;
		};
	}
}
