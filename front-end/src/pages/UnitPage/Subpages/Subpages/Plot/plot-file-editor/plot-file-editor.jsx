// Packages
import { useState, useRef, useEffect, useCallback } from "react";
import {
	MDXEditor,
	toolbarPlugin,
	headingsPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	markdownShortcutPlugin,
	linkPlugin,
	linkDialogPlugin,
	imagePlugin,
	UndoRedo,
	BoldItalicUnderlineToggles,
	ListsToggle,
	InsertThematicBreak,
	InsertImage,
	CodeToggle,
	Separator,
	CreateLink,
	currentBlockType$,
	applyBlockType$,
	useCellValues,
	usePublisher,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { FaChevronDown } from "react-icons/fa";

// Components

// Logic
import { PlotFileEditorLogic } from "./plot-file-editor-logic";

// Context

// Services

// Styles
import "./plot-file-editor.css";

// Assets

// ── Block type options ────────────────────────────────────────────────────────

const BLOCK_TYPES = [
	{ value: "paragraph", label: "Paragraph" },
	{ value: "quote", label: "Quote" },
	{ value: "h1", label: "Heading 1" },
	{ value: "h2", label: "Heading 2" },
	{ value: "h3", label: "Heading 3" },
	{ value: "h4", label: "Heading 4" },
	{ value: "h5", label: "Heading 5" },
	{ value: "h6", label: "Heading 6" },
];

// ── Custom block type selector (no Radix) ─────────────────────────────────────

const CustomBlockTypeSelect = () => {
	const [currentBlockType] = useCellValues(currentBlockType$);
	const applyBlockType = usePublisher(applyBlockType$);
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		const onMouseDown = (e) => {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", onMouseDown);
		return () => document.removeEventListener("mousedown", onMouseDown);
	}, []);

	const currentLabel = BLOCK_TYPES.find((b) => b.value === currentBlockType)?.label ?? "Paragraph";

	return (
		<div ref={containerRef} className='plot-editor-block-select'>
			<button
				className='plot-editor-block-select-trigger'
				onMouseDown={(e) => {
					e.preventDefault();
					setIsOpen((o) => !o);
				}}
			>
				<span>{currentLabel}</span>
				<FaChevronDown className='plot-editor-block-select-chevron' />
			</button>
			{isOpen && (
				<div className='plot-editor-block-select-dropdown'>
					{BLOCK_TYPES.map(({ value, label }) => (
						<button
							key={value}
							className={`plot-editor-block-select-option${currentBlockType === value ? " plot-editor-block-select-option-active" : ""}`}
							onMouseDown={(e) => {
								e.preventDefault();
								applyBlockType(value);
								setIsOpen(false);
							}}
						>
							{label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

// ── Editor ────────────────────────────────────────────────────────────────────

export const PlotFileEditor = ({ currentFile, onSave, isAuthorizedToEdit, editorRef, nameRef }) => {
	const fallbackEditorRef = useRef(null);
	const _editorRef = editorRef || fallbackEditorRef;
	const fallbackNameRef = useRef(null);
	const _nameRef = nameRef || fallbackNameRef;

	const { imageUploadHandler, imagePreviewHandler } = PlotFileEditorLogic();

	const handleSave = useCallback(() => {
		onSave(_editorRef.current?.getMarkdown() ?? "", _nameRef.current?.value);
	}, [onSave, _editorRef, _nameRef]);

	// Ctrl/Cmd+S to save
	useEffect(() => {
		const onKeyDown = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "s") {
				e.preventDefault();
				handleSave();
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [handleSave]);

	if (!currentFile) return null;

	return (
		<div className='plot-file-editor'>
			<input
				ref={_nameRef}
				className='plot-file-editor-title-input'
				defaultValue={currentFile.name}
				placeholder='File name...'
				readOnly={!isAuthorizedToEdit}
			/>
			<MDXEditor
				key={String(currentFile._id)}
				ref={_editorRef}
				className='plot-file-editor-mdx'
				markdown={currentFile.content || ""}
				readOnly={!isAuthorizedToEdit}
				plugins={[
					toolbarPlugin({
						toolbarContents: () => (
							<>
								<UndoRedo />
								<Separator />
								<BoldItalicUnderlineToggles />
								<CodeToggle />
								<Separator />
								<CustomBlockTypeSelect />
								<Separator />
								<ListsToggle />
								<InsertThematicBreak />
								<Separator />
								<CreateLink />
								<InsertImage />
							</>
						),
					}),
					headingsPlugin(),
					listsPlugin(),
					quotePlugin(),
					thematicBreakPlugin(),
					markdownShortcutPlugin(),
					linkPlugin(),
					linkDialogPlugin(),
					imagePlugin({ imageUploadHandler, imagePreviewHandler }),
				]}
			/>
		</div>
	);
};
