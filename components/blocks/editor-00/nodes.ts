import { ImageNode } from "@/components/editor/nodes/image-node";
import { LayoutContainerNode } from "@/components/editor/nodes/layout-container-node";
import { LayoutItemNode } from "@/components/editor/nodes/layout-item-node";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import {
	Klass,
	LexicalNode,
	LexicalNodeReplacement,
	ParagraphNode,
	TextNode,
} from "lexical";

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
	[
		HeadingNode,
		ParagraphNode,
		TextNode,
		QuoteNode,
		HeadingNode,
		ParagraphNode,
		TextNode,
    ImageNode,
		QuoteNode,
		TableNode,
		TableRowNode,
		TableCellNode,
		LayoutContainerNode,
		LayoutItemNode,
		LinkNode,
		AutoLinkNode,
		ListNode,
		ListItemNode,
		CodeNode,
		CodeHighlightNode,
		HorizontalRuleNode,
	];
