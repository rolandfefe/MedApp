import { BotMessageSquare, Headset, Home, Star } from "lucide-react";

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
