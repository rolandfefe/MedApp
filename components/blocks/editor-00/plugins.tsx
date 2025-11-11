import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import {
	CHECK_LIST,
	ELEMENT_TRANSFORMERS,
	MULTILINE_ELEMENT_TRANSFORMERS,
	TEXT_FORMAT_TRANSFORMERS,
	TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ComponentPickerMenuPlugin } from "@/components/editor/plugins/component-picker-menu-plugin";
import { ParagraphPickerPlugin } from "@/components/editor/plugins/picker/paragraph-picker-plugin";
import { HeadingPickerPlugin } from "@/components/editor/plugins/picker/heading-picker-plugin";
import { QuotePickerPlugin } from "@/components/editor/plugins/picker/quote-picker-plugin";
import { AlignmentPickerPlugin } from "@/components/editor/plugins/picker/alignment-picker-plugin";
import {
	DynamicTablePickerPlugin,
	TablePickerPlugin,
} from "@/components/editor/plugins/picker/table-picker-plugin";
import { CheckListPickerPlugin } from "@/components/editor/plugins/picker/check-list-picker-plugin";
import { NumberedListPickerPlugin } from "@/components/editor/plugins/picker/numbered-list-picker-plugin";
import { BulletedListPickerPlugin } from "@/components/editor/plugins/picker/bulleted-list-picker-plugin";
import { DividerPickerPlugin } from "@/components/editor/plugins/picker/divider-picker-plugin";
import { ImagePickerPlugin } from "@/components/editor/plugins/picker/image-picker-plugin";
import { ColumnsLayoutPickerPlugin } from "@/components/editor/plugins/picker/columns-layout-picker-plugin";
import { TablePlugin } from "@/components/editor/plugins/table-plugin";
import { LayoutPlugin } from "@/components/editor/plugins/layout-plugin";
import { FloatingTextFormatToolbarPlugin } from "@/components/editor/plugins/floating-text-format-plugin";
import { LinkPlugin } from "@/components/editor/plugins/link-plugin";
import { FloatingLinkEditorPlugin } from "@/components/editor/plugins/floating-link-editor-plugin";
import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin";
import { ListMaxIndentLevelPlugin } from "@/components/editor/plugins/list-max-indent-level-plugin";
import { DraggableBlockPlugin } from "@/components/editor/plugins/draggable-block-plugin";
import { TABLE } from "@/components/editor/transformers/markdown-table-transformer";
import { IMAGE } from "@/components/editor/transformers/markdown-image-transformer";
import { HR } from "@/components/editor/transformers/markdown-hr-transformer";
import { ImagesPlugin } from "@/components/editor/plugins/images-plugin";

export function Plugins() {
	const [floatingAnchorElem, setFloatingAnchorElem] =
		useState<HTMLDivElement | null>(null);

	const [isLinkEditMode, setIsLinkEditMode] = useState(false);

	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	return (
		<div className="relative">
			{/* toolbar plugins */}
			<div className="relative">
				<RichTextPlugin
					contentEditable={
						<div className="">
							<div className="" ref={onRef}>
								<ContentEditable
									placeholder={"Start typing (press / for commands) ..."}
								/>
							</div>
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				{/* editor plugins */}

				{/* <TablePlugin  /> //! Fix */}
				<LayoutPlugin />

				<ClickableLinkPlugin />
				<AutoLinkPlugin />
				<LinkPlugin />
				<ListPlugin />

				<FloatingLinkEditorPlugin
					anchorElem={floatingAnchorElem}
					isLinkEditMode={isLinkEditMode}
					setIsLinkEditMode={setIsLinkEditMode}
				/>

				<FloatingTextFormatToolbarPlugin
					anchorElem={floatingAnchorElem}
					setIsLinkEditMode={setIsLinkEditMode}
				/>

				<DraggableBlockPlugin anchorElem={floatingAnchorElem} />
				<ComponentPickerMenuPlugin
					baseOptions={[
						ParagraphPickerPlugin(),
						HeadingPickerPlugin({ n: 1 }),
						HeadingPickerPlugin({ n: 2 }),
						HeadingPickerPlugin({ n: 3 }),
						// TablePickerPlugin(), //! Fix
						// DynamicTablePickerPlugin({q}), // test
						CheckListPickerPlugin(),
						NumberedListPickerPlugin(),
						BulletedListPickerPlugin(),
						QuotePickerPlugin(),
						DividerPickerPlugin(),
						ImagePickerPlugin(),
						ColumnsLayoutPickerPlugin(),
						AlignmentPickerPlugin({ alignment: "left" }),
						AlignmentPickerPlugin({ alignment: "center" }),
						AlignmentPickerPlugin({ alignment: "right" }),
						AlignmentPickerPlugin({ alignment: "justify" }),
					]}
					dynamicOptionsFn={DynamicTablePickerPlugin}
				/>

				<MarkdownShortcutPlugin
					transformers={[
						TABLE,
						HR,
						IMAGE,
						CHECK_LIST,
						...ELEMENT_TRANSFORMERS,
						...MULTILINE_ELEMENT_TRANSFORMERS,
						...TEXT_FORMAT_TRANSFORMERS,
						...TEXT_MATCH_TRANSFORMERS,
					]}
				/>

				<ImagesPlugin />
				<ListMaxIndentLevelPlugin />
				<HorizontalRulePlugin />
			</div>
			{/* actions plugins */}
		</div>
	);
}

Plugins.renderer = () => {
	return (
		<div className="relative">
			<div className="relative">
				<RichTextPlugin
					contentEditable={
						<div className="">
							<div className="">
								<ContentEditable
									placeholder={"Start typing (Press / for commands)..."}
								/>
							</div>
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
			</div>
		</div>
	);
};
