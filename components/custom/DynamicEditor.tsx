"use client";

import { useMediaQuery } from "@uidotdev/usehooks";
import { Editor } from "../blocks/editor-00/editor";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";

import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { NotebookTabs } from "lucide-react";
import MyBtn from "./MyBtn";
import Heading from "./Heading";
import { ScrollArea } from "../ui/scroll-area";

export default function DynamicEditor({
	onSerializedChange,
	editorSerializedState,
	className,
	children,
}: {
	editorSerializedState?: SerializedEditorState<SerializedLexicalNode>;
	onSerializedChange: Dispatch<
		SetStateAction<SerializedEditorState<SerializedLexicalNode> | undefined>
	>;
	className?: string;
	children?: ReactNode;
}) {
	const isSmScreen = useMediaQuery("(width <= 640px)");

	return (
		<>
			{isSmScreen ? (
				<Drawer>
					<DrawerTrigger asChild>
						{children ? (
							children
						) : (
							<MyBtn size="lg" variant="invert" className="w-full">
								Open Editor <NotebookTabs />
							</MyBtn>
						)}
					</DrawerTrigger>
					<DrawerContent className="!min-h-[95vh]">
						<DrawerHeader>
							<DrawerTitle className="flex">
								<Heading className="text-lg text-primary text-center">
									Rich Editor <NotebookTabs />
								</Heading>
							</DrawerTitle>
							<DrawerDescription className="hidden">
								rich editor
							</DrawerDescription>
						</DrawerHeader>

						<ScrollArea className="h-[82vh]">
							<Editor
								editorSerializedState={editorSerializedState}
								onSerializedChange={onSerializedChange}
								className={className}
							/>
						</ScrollArea>
					</DrawerContent>
				</Drawer>
			) : (
				<Editor
					editorSerializedState={editorSerializedState}
					onSerializedChange={onSerializedChange}
					className={className}
				/>
			)}
		</>
	);
}
