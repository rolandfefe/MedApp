"use client";

import useLoadMore from "@/hooks/useLoadMore";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { flattenDeep, uniqBy } from "lodash-es";
import {
	ComponentProps,
	createContext,
	useContext,
	useEffect,
	useEffectEvent,
	useState,
} from "react";

interface Props extends IPagination {
	doctors: IDoctor[];
}

const DoctorsContext = createContext<Props | null>(null);

export const useDoctors = () => {
	const context = useContext(DoctorsContext);

	if (!context)
		throw new Error("Element is not child of `<DoctorsProvider/>`!");

	return context;
};

export const DoctorsProvider = ({
	doctorsInit,
	children,
	...props
}: {
	doctorsInit: IDoctor[];
} & ComponentProps<"div">) => {
	const [doctors, setDoctors] = useState<IDoctor[]>(doctorsInit);
	const [nextPg, setNextPg] = useState<number>(2);
	const [hasNextPg, setHasNextPg] = useState<boolean>(true);

	const loader = async () => {
		const {
			doctors: _d,
			hasNextPage,
			nextPage: _npg,
		} = await getDoctors({ page: nextPg });

		setDoctors((prev) => uniqBy([...prev, ..._d], "id"));
		setHasNextPg(hasNextPage);
		setNextPg(_npg!);
	};

	const { ref: loadRef, isLoading } = useLoadMore({ loader, hasNextPg });

	const contextValue: Props = { doctors, loadRef, isLoading };

	const syncHandler = useEffectEvent(async () => {
		const _doctors = await Promise.all(
			[...Array(nextPg)].map(
				async (_, i) =>
					(
						await getDoctors({
							page: i + 1,
						})
					).doctors
			)
		);

		setDoctors(uniqBy(flattenDeep(_doctors), "id"));
	});



	

	useEffect(() => {
		console.log("🔃Doctors");

		syncHandler();
	}, [doctorsInit]);

	return (
		<DoctorsContext.Provider value={contextValue}>
			<div {...props}>{children}</div>
		</DoctorsContext.Provider>
	);
};
