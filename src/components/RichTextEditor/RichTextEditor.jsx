import { useState, useRef, useEffect } from "react";
import { useMention } from "../../hooks/useMention";
import { FormattingToolbar } from "./FormattingToolbar";
import { MentionMenu } from "./MentionMenu";

export const RichTextEditor = ({ onContentChange, initialContent = "" }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialContent);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [showFontMenu, setShowFontMenu] = useState(false);

  const {
    showMentionMenu,
    mentionPosition,
    mentionQuery,
    activeTab,
    setActiveTab,
    selectedIndex,
    currentList,
    insertMention,
    handleInput,
    handleMentionKeyDown,
    mentionMenuRef,
  } = useMention(editorRef);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && initialContent && !content) {
      editorRef.current.innerHTML = initialContent;
      setContent(initialContent);
    }
  }, [initialContent]);

  // Handle editor content changes
  const handleEditorChange = (e) => {
    const html = editorRef.current?.innerHTML || "";
    setContent(html);
    handleInput(e);
    if (onContentChange) {
      onContentChange(html);
    }
  };

  // Format text using document.execCommand
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    
    // Trigger change event
    const html = editorRef.current?.innerHTML || "";
    setContent(html);
    if (onContentChange) {
      onContentChange(html);
    }
  };

  // Apply font family
  const applyFont = (fontFamily) => {
    formatText("fontName", fontFamily);
    setSelectedFont(fontFamily);
    setShowFontMenu(false);
  };

  // Handle paste to remove formatting
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Handle Ctrl/Cmd + B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      formatText("bold");
    }
    // Handle Ctrl/Cmd + I for italic
    if ((e.ctrlKey || e.metaKey) && e.key === "i") {
      e.preventDefault();
      formatText("italic");
    }
    // Handle Ctrl/Cmd + U for underline
    if ((e.ctrlKey || e.metaKey) && e.key === "u") {
      e.preventDefault();
      formatText("underline");
    }
    // Handle @ mention keyboard navigation
    if (showMentionMenu) {
      handleMentionKeyDown(e);
    }
  };

  const fonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Impact",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
        {/* Formatting Toolbar */}
        <FormattingToolbar
          onFormat={formatText}
          selectedFont={selectedFont}
          fonts={fonts}
          showFontMenu={showFontMenu}
          setShowFontMenu={setShowFontMenu}
          onFontSelect={applyFont}
        />

        {/* Editor */}
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="min-h-[300px] p-4 focus:outline-none text-gray-800 prose prose-sm max-w-none leading-relaxed"
            style={{ fontFamily: selectedFont }}
            suppressContentEditableWarning={true}
            data-placeholder="Start typing... Type @ to mention someone or something"
          />

          {/* Mention Menu */}
          {showMentionMenu && (
            <MentionMenu
              ref={mentionMenuRef}
              position={mentionPosition}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedIndex={selectedIndex}
              mentionQuery={mentionQuery}
              onSelect={insertMention}
            />
          )}
        </div>

        {/* Placeholder styling */}
        <style>{`
          [contenteditable][data-placeholder]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
            font-style: italic;
          }
          .mention {
            user-select: none;
          }
        `}</style>
      </div>
    </div>
  );
};
