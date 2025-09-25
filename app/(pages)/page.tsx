import Image from "next/image";

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Image
					src="/assets/logo_transparent.png"
					alt="logo"
					priority
					width={999}
					height={999}
					className="w-24 mx-auto"
				/>
				<h1 className="text-primary text-2xl sm:text-3xl font-semibold font-mono text-center">
					⚕️MedNet💉
				</h1>

				<ol className="font-mono list-inside list-decimal text-sm/6 text-left">
					<li className="mb-2 tracking-[-.01em]">Ready for development</li>
					<li className="tracking-[-.01em]">Deployed on Vercel</li>
					<li className="tracking-[-.01em] text-primary">
						Developer:{" "}
						<code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
							⚕️Code-Medic💊
						</code>
					</li>
					<li className="tracking-[-.01em]">
						Client:{" "}
						<code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
							Roland S. Willabo
						</code>
					</li>
				</ol>
			</main>
		</div>
	);
}
