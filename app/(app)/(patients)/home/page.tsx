import ArticlesFeed from "@/components/Feeds/ArticlesFeed";
import Image from "next/image";

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20">
			<ArticlesFeed />
		</div>
	);
}
