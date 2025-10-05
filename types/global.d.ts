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
	eLifeStyleStatus,
	eMaritalStatus,
	eMedicalCertificationTypes,
	eMedicalSpecialties,
	eMessageStatus,
	eMethodOfDrugAdministration,
	ePatientConsent,
	eRating,
	eReminderVariants,
	eTenScale,
	eWeekDays,
} from "@/types/enums/enums";
import {
	IBoardCertification,
	IHospitalAffiliation,
	IMedicalLicense,
} from "./doctor";
import { IAllergy, ISocialHistory } from "./history";
import { IPaymentInfo } from "./appointment";

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

		credentials: {
			medicalCertifications: Array<{
				type: eMedicalCertificationTypes;
				institution: string;
				name: string;
				date: Date | string;
			}>;
			licenses: IMedicalLicense[];
			boardCertifications?: IBoardCertification[];
			hospitalAffiliations: IHospitalAffiliation[];
			isVerified?: boolean;
		};

		specialties: Array<{
			primary: eMedicalSpecialties;
			secondary?: eMedicalSpecialties;
			procedures: string[];
		}>;

		contact: {
			officePhone: string;
			officeEmail: string;
			mobilePhone?: string;
		};

		metrics?: {
			ratings?: { user: IUser | string; rating: eRating }[]; // 0-100 scale
			numberOfPatients?: number;
			experience?: number;
			readmissionRate?: number;
		};
	}

	interface ISchedule extends Base {
		doctor: IDoctor | string;
		officeHours: Array<{
			dayOfWeek: eWeekDays;
			startTime: string; // in HH:MM format
			endTime?: string;
			isAvailable: boolean;
		}>;
		averageAppointmentDuration: string;
		isAcceptingNewPatients: boolean;
		nextAvailableAppointmentDate?: Date | string;
	}

	interface IHistory extends Base {
		patient: IPatient | string;

		diseaseHistory: Array<{
			name: string;
			diagnosisDate: Date | string;
			resolved: boolean;
			resolutionDate?: Date | string;
		}>;
		surgicalHistory: Array<{
			procedure: string;
			date: Date | string;
			facility: string;
		}>;
		familyHistory: Array<{
			condition: string;
			relation: string;
			notes?: string;
		}>;
		socialHistory: ISocialHistory;
		allergies: IAllergy[];

		exercise?: string; // e.g., "3 times per week"
		diet?: string; // e.g., "vegetarian", "Mediterranean"
		notes?: string;
	}

	interface IMedication extends Base {
		name: string;
		doctor: IDoctor | IUser;
		dosage: string;
		frequency: string;
		route: eMethodOfDrugAdministration;
		startDate: Date | string;
		endDate?: Date | string;
		active: boolean;

		reason?: string;
		instructions?: string;
		sideEffects?: string[];
	}

	interface IVitals {
		bloodPressure?: string;
		heartRate?: string;
		temperature?: string;
		respiratoryRate?: string;
		oxygenSaturation?: string;
		height?: string;
		weight?: string;
		bmi?: string;
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
			Date: Date | string;
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
		diagnosis?: IDiagnosis;

		recurrencePlan?: IRecurrencePlan | string;
		referral?: IReferral;
		reminders?: IReminder[];
		healthStatus?: IHealthStatus; // Current reviewed status.

		reason: string;
		type: eAppointmentTypes;
		status?: eAppointmentStatus;

		// Communication & Reminders
		confirmation?: {
			isConfirmed: boolean;
			confirmedAt?: Date | string;
			confirmedBy?: IUser | string;
		};

		cancellation?: {
			cancelledAt: Date | string;
			cancelledBy: IUser | string;
			reason: string;
		};

		startTime?: Date | string; // ? Optional Allow flexibility
		endTime?: Date | string;

		//Consultation details
		payment?: IPaymentInfo;
		online?: {
			url: string;
			accessCode?: string;
		};

		followUpInstructions?: string[];
		doctorNotes?: string;
		patientNotes?: string;
		isEmergency?: boolean;
		consentLevels: ePatientConsent[];
		imgs: string[];
	}

	// ! Forms Basis of patient follow up
	/**
	 * Ensure Health Status & Vitals is at least 2week upto date lest retest
	 */
	interface IHealthStatus extends Base {
		patient: IPatient | string;
		vitals: IVitals;

		complaint?: string;
		symptoms?: Array<{
			description: string;
			onset: Date | string;
			severity: eTenScale; // 10 scale
			duration?: string;
		}>;

		pain?: Array<{
			location: string;
			intensity: eTenScale; // 0-10 scale
			type: ePainType;
			aggravatingFactors?: string[];
			relievingFactors?: string[];
		}>;
	}

	// ? Allow constant follow up on the patients
	interface IRecurrencePlan extends Base {
		supervisor: IPatient | IDoctor | string;
		name: string;
		frequency: eRecurrenceFrequency;
		interval: number;
		weekDays?: eWeekDays[];
		// dayOfMonth?: number;
		startDate: Date | string;
		endDate?: Date | string;
		occurrenceCount?: number;
		exceptions: Date[] | string[];
	}

	interface IReferral extends Base {
		appointment: IAppointment | string;

		reason: string;
	}

	interface IReminder extends Base {
		user: IUser | string;

		variant: eReminderVariants;
		item: IAppointment | IMedication | string;
		body: string;

		scheduledTime: Date | string;
		sent: boolean;
		status?: "pending" | "sent" | "failed";
	}

	interface IDiagnosis extends Base {
		appointment: IAppointment | string;
		patient: IPatient | string;
		doctor: IDoctor | string;

		chiefComplaint?: string; // More formal medical description

		preAppointmentNotes?: string;
		medicationsReviewed?: boolean;
		templateUsed?: string; // EHR template name

		onsetDate: Date | string;
		dateResolved?: Date | string;

		healthStatus: IHealthStatus | string;

		// Presenting Information
		historyOfPresentIllness: string;

		differentialDiagnosis: IDifferentialDiagnosis[];
		status: eDiagnosticStatus;

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
				scheduledDate: Date | string;
				status: "recommended" | "scheduled" | "completed";
			}>;
			therapies?: Array<{
				type: string; // e.g., "Physical Therapy", "Occupational Therapy"
				frequency: string;
				duration: string;
			}>;
			lifestyleRecommendations?: string[];
		};

		recurrencePlan?: IRecurrencePlan;

		// Patient Education & Communication
		patientExplanation: string; // How the diagnosis was explained to the patient in layman's terms
		patientMaterialsProvided?: string[]; // e.g., ["brochure_on_hypertension", "website_link"]

		// Verification & Sign-off
		dateFinalized?: Date | string;
		isConfirmed: boolean;
		requiresSecondOpinion: boolean;
		secondOpinionClinicianId?: string;

		// Metadata
		createdBy: IDoctor | string;
		updatedBy: IDoctor | string;
	}

	interface IMessage extends Base {
		appointment: IAppointment | string;
		body: string;
		status?: eMessageStatus;
		refMessage?: IMessage | string;
		from: IUser | string;
	}

	interface CustomJwtSessionClaims extends Base {
		metadata: {
			onboardingComplete?: boolean;
		};
	}
}
