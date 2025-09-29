import {
	ArrowBigRightDash,
	ArrowDownRightFromCircle,
	BotMessageSquare,
	Headset,
	HeartPulse,
	Home,
	NotebookText,
	PanelsTopBottom,
	Pill,
	Star,
	UserCircle,
} from "lucide-react";

export const LANDING_NAV_ITEMS = [
	{
		name: "Home",
		link: "/home",
		icon: <Home size={20} />,
	},
	{
		name: "Reviews",
		link: "#Reviews",
		icon: <Star size={20} />,
	},
	{
		name: "Feedback",
		link: "#Feedback",
		icon: <BotMessageSquare size={20} />,
	},
	{
		name: "Support",
		link: "#Support",
		icon: <Headset size={20} />,
	},
];

export const getDoctorNavItems = (id: IDoctor["_id"]) => [
	{
		name: "Dashboard",
		link: `/doctor/${id}`,
		icon: <PanelsTopBottom size={20} />,
	},
	{
		name: "Appointments",
		link: `/doctor/${id}/appointments`,
		icon: <Headset size={20} />,
	},
	{
		name: "Profile",
		link: `/doctor/${id}/profile`,
		icon: <UserCircle size={20} />,
	},
	{
		name: "Referrals",
		link: `/doctor/${id}/referrals`,
		icon: <ArrowBigRightDash size={20} />,
	},
	{
		name: "Follow ups",
		link: `/doctor/${id}/follow-ups`,
		icon: <ArrowDownRightFromCircle size={20} />,
	},
];

export const PATIENT_NAV_ITEMS = [
	{
		name: "Landing",
		link: "/",
		icon: <Home size={20} />,
	},
	{
		name: "Home",
		link: "/home",
		icon: <Home size={20} />,
	},
	{
		name: "Appointments",
		link: "/appointments",
		icon: <Headset size={20} />,
	},
	{
		name: "Follow ups",
		link: "/follow-ups",
		icon: <ArrowDownRightFromCircle size={20} />,
	},
	{
		name: "History",
		link: "/history",
		icon: <NotebookText size={20} />,
	},
	{
		name: "Medications",
		link: "/medications",
		icon: <Pill size={20} />,
	},
	{
		name: "Vitals",
		link: "/vitals",
		icon: <HeartPulse size={20} />,
	},
	// {
	// 	name: "Profile",
	// 	link: "/profile",
	// 	icon: <UserCircle size={20} />,
	// },
	{
		name: "Referrals",
		link: "/referrals",
		icon: <ArrowBigRightDash size={20} />,
	},
];

export const ADMIN_NAV_ITEMS = [
	{
		name: "Appointments",
		link: "",
		icon: <Headset size={20} />,
	},
];
