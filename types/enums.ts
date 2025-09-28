export enum eGender {
	MALE = "Male",
	FEMALE = "Female",
	OTHER = "Other",
}

export enum eMaritalStatus {
	SINGLE = "Single",
	MARRIED = "Married",
	DIVORCED = "Divorced",
	WIDOWED = "Widowed",
	SEPARATED = "Separated",
}

export enum eArticleType {
	RESEARCH = "Research",
	REVIEW = "Review",
	CASE_REPORT = "Case-report",
	EDITORIAL = "Editorial",
	LETTER = "Letter",
}

export enum eAllergySeverity {
	MILD = "Mild",
	MODERATE = "Moderate",
	SEVERE = "Severe",
}

export enum eMethodOfDrugAdministration {
	ORAL = "Oral",
	TOPICAL = "Topical",
	INJECTION = "Injection",
	INHALATION = "Inhalation",
	OTHER = "Other",
}

export enum eWeekDays {
	MONDAY = "Monday",
	TUESDAY = "Tuesday",
	WEDNESDAY = "Wednesday",
	THURSDAY = "Thursday",
	FRIDAY = "Friday",
	SATURDAY = "Saturday",
	SUNDAY = "Sunday",
}

export enum eLicenseType {
	PERMANENT = "Permanent",
	TRAINING = "Training",
	PROVISIONAL = "Provisional",
}

export enum eLicenseStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
	SUSPENDED = "suspended",
	REVOKED = "revoked",
	EXPIRED = "expired",
}

export enum eCertificationStatus {
	ACTIVE = "active",
	EXPIRED = "expired",
	NOT_CERTIFIED = "not-certified",
}

export enum eRating {
	ONE = "1",
	TWO = "2",
	THREE = "3",
	FOUR = "4",
	FIVE = "5",
}

export enum eMedicalSpecialties {
	GeneralPractice = "General Practice",
	InternalMedicine = "Internal Medicine",
	Pediatrics = "Pediatrics",
	ObstetricsGynecology = "Obstetrics & Gynecology",
	Cardiology = "Cardiology",
	Endocrinology = "Endocrinology",
	Gastroenterology = "Gastroenterology",
	Pulmonology = "Pulmonology",
	Nephrology = "Nephrology",
	Neurology = "Neurology",
	Psychiatry = "Psychiatry",
	Dermatology = "Dermatology",
	Ophthalmology = "Ophthalmology",
	Otolaryngology = "Otolaryngology (ENT)",
	Orthopedics = "Orthopedic Surgery",
	Rheumatology = "Rheumatology",
	Hematology = "Hematology",
	Oncology = "Oncology",
	InfectiousDisease = "Infectious Disease",
	Immunology = "Immunology",
	Allergy = "Allergy",
	Urology = "Urology",
	SurgeryGeneral = "General Surgery",
	SurgeryPlastic = "Plastic Surgery",
	SurgeryCardiothoracic = "Cardiothoracic Surgery",
	SurgeryNeurosurgery = "Neurosurgery",
	SurgeryVascular = "Vascular Surgery",
	Anesthesiology = "Anesthesiology",
	Radiology = "Radiology",
	NuclearMedicine = "Nuclear Medicine",
	Pathology = "Pathology",
	EmergencyMedicine = "Emergency Medicine",
	CriticalCare = "Critical Care",
	FamilyMedicine = "Family Medicine",
	Geriatrics = "Geriatrics",
	SportsMedicine = "Sports Medicine",
	OccupationalMedicine = "Occupational Medicine",
	PalliativeCare = "Palliative Care",
	Dentistry = "Dentistry",
	Other = "Other",
}

export enum eMedicalDegreeTypes {
	MD = "MD",
	DO = "DO",
	MBBS = "MBBS",
	MBChB = "MBChB",
	DDS = "DDS",
	DMD = "DMD",
	PhD = "PhD",
	Other = "Other",
}

export enum eAppointmentTypes {
	Consultation = "Consultation",
	FollowUp = "Follow Up",
	NewPatient = "New Patient",
	AnnualExam = "Annual Exam",
	PostOp = "Post Op",
	Procedure = "Procedure",
	Telemedicine = "Telemedicine",
	PhoneConsult = "Phone Consult",
}

export enum eAppointmentStatus {
	SCHEDULED = "Scheduled",
	CONFIRMED = "Confirmed",
	CANCELLED = "Cancelled",
	ARRIVED = "Arrived",
	IN_PROGRESS = "In Progress",
	COMPLETED = "Completed",
	NO_SHOW = "No Show",
	RESCHEDULED = "Rescheduled",
}

export enum eMessageStatus {
	SENT = "Sent",
	RECEIVED = "Received",
	READ = "Read",
}

export enum eReminderVariants {
	APPOINTMENT = "Appointment",
	MEDICATION = "Medication",
}

export enum eConfidenceLevel {
	RULED_OUT = "Ruled-out",
	LOW = "Low",
	MEDIUM = "Medium",
	HIGH = "High",
	CONFIRMED = "Confirmed",
}

export enum eDiagnosticStatus {
	Active = "Active",
	Provisional = "Provisional",
	RuledOut = "Ruled-out",
	Confirmed = "Confirmed",
	Resolved = "Resolved",
}

export enum eLanguages {
	English = "English",
	MandarinChinese = "Mandarin Chinese",
	Hindi = "Hindi",
	Spanish = "Spanish",
	French = "French",
	ModernStandardArabic = "Modern Standard Arabic",
	Bengali = "Bengali",
	Russian = "Russian",
	Portuguese = "Portuguese",
	Urdu = "Urdu",
	Indonesian = "Indonesian",
	German = "German",
	Japanese = "Japanese",
	Swahili = "Swahili",
	Marathi = "Marathi",
	Mandarin = "Mandarin",
	Telugu = "Telugu",
	Turkish = "Turkish",
	Tamil = "Tamil",
	Italian = "Italian",
	Korean = "Korean",
	Hausa = "Hausa",
	Vietnamese = "Vietnamese",
	Persian = "Persian (Farsi)",
	Polish = "Polish",
	Malay = "Malay",
	Thai = "Thai",
	Ukrainian = "Ukrainian",
	Burmese = "Burmese",
	Yoruba = "Yoruba",
	Igbo = "Igbo",
}

export enum eArticleCategories {
	WellnessAndPrevention = "Wellness & Prevention",
	NutritionAndDiet = "Nutrition & Diet",
	FitnessAndExercise = "Fitness & Exercise",
	MentalHealthAndWellbeing = "Mental Health & Wellbeing",
	CommonIllnesses = "Common Illnesses",
	ChronicDiseaseManagement = "Chronic Disease Management",
	PreventiveCare = "Preventive Care",
	MedicationGuides = "Medication Guides",
	HealthyAgingAndLifeStages = "Healthy Aging & Life Stages",
	MaternalAndChildHealth = "Maternal & Child Health",
	SleepHealth = "Sleep Health",
	UnderstandingTestsAndResults = "Understanding Tests & Results",
	PatientTipsAndAdvice = "Patient Tips & Advice",
	HealthJourneysAndStories = "Health Journeys & Stories",
	HealthMythsAndFacts = "Health Myths & Facts",
	SafetyAndFirstAid = "Safety & First Aid",
	EnvironmentAndHealth = "Environment & Health",
	DigitalHealthAndTelemedicine = "Digital Health & Telemedicine",
	AdvanceCarePlanning = "Advance Care Planning",
	SocialDeterminantsOfHealth = "Social Determinants of Health",
	PainManagement = "Pain Management",
	AlternativeAndComplementaryMedicine = "Alternative & Complementary Medicine",
	TravelHealth = "Travel Health",
	InclusiveHealth = "Inclusive Health",
	ScreenTimeAndDigitalWellness = "Screen Time & Digital Wellness",
	HealthAndMoney = "Health & Money",
	SeasonalHealthTips = "Seasonal Health Tips",
	PetsAndHealth = "Pets & Health",
	WorkLifeAndHealth = "Work, Life & Health",
	HowYourBodyWorks = "How Your Body Works",
}
