import Image from "next/image";

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1 className="text-2xl sm:text-3xl font-semibold font-mono text-center">
					⚕️Health App💉
				</h1>

				<ol className="font-mono list-inside list-decimal text-sm/6 text-left">
					<li className="mb-2 tracking-[-.01em]">Ready for development</li>
					<li className="tracking-[-.01em]">Deployed on Vercel</li>
					<li className="tracking-[-.01em]">
						Developer:{" "}
						<code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
							⚕️Code-Medic💊
						</code>
					</li>
					<li className="tracking-[-.01em]">
						Client:{" "}
						<code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
							Roland Willabo
						</code>
					</li>
				</ol>

				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<a
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
						href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Read our docs
					</a>
				</div>
			</main>
		</div>
	);
}
