import { useState, useRef, useEffect } from "react";
import { useMention } from "../../hooks/useMention";
import { FormattingToolbar } from "./FormattingToolbar";
import { MentionMenu } from "./MentionMenu";

export const RichTextEditor = ({ onContentChange, initialContent = "" }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialContent);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    insertUnorderedList: false,
    insertOrderedList: false,
  });

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

  // Get HTML content with font preserved
  const getContentWithFont = () => {
    if (!editorRef.current) return "";
    
    let html = editorRef.current.innerHTML;
    
    // If editor has a font set but content doesn't have explicit font styles,
    // ensure font is preserved
    if (selectedFont && html && html.trim()) {
      // Check if content has any font-family styles or font tags
      const hasFontInContent = html.includes('font-family') || 
                               html.includes('face=') || 
                               html.match(/<font[^>]*>/i);
      
      // Check if content is already wrapped in a div with font-family
      const isWrapped = html.trim().startsWith('<div style="font-family:');
      
      if (!hasFontInContent && !isWrapped) {
        // Wrap content in a div with font-family to preserve it
        html = `<div style="font-family: ${selectedFont}">${html}</div>`;
      } else if (isWrapped && selectedFont) {
        // Update existing wrapper's font if it exists
        html = html.replace(
          /<div style="font-family:[^"]*"/i,
          `<div style="font-family: ${selectedFont}"`
        );
      }
    }
    
    return html;
  };

  // Check current format state
  const checkFormatState = () => {
    if (!editorRef.current) return;
    
    // Check if editor has focus
    const isFocused = document.activeElement === editorRef.current;
    if (!isFocused) return;
    
    setFormatState({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
      justifyFull: document.queryCommandState("justifyFull"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
    });
  };

  // Handle editor content changes
  const handleEditorChange = (e) => {
    const html = getContentWithFont();
    setContent(html);
    handleInput(e);
    checkFormatState();
    if (onContentChange) {
      onContentChange(html);
    }
  };

  // Format text using document.execCommand (toggles automatically)
  const formatText = (command, value = null) => {
    // For alignment commands, unset other alignments first if they're active
    if (command.startsWith("justify")) {
      const alignmentCommands = ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"];
      alignmentCommands.forEach((cmd) => {
        if (cmd !== command && document.queryCommandState(cmd)) {
          document.execCommand(cmd, false, null);
        }
      });
    }
    
    // Execute the command (execCommand toggles by default)
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    
    // Update format state after a short delay to ensure state is updated
    setTimeout(() => {
      checkFormatState();
    }, 0);
    
    // Trigger change event
    const html = getContentWithFont();
    setContent(html);
    if (onContentChange) {
      onContentChange(html);
    }
  };

  // Apply font family
  const applyFont = (fontFamily) => {
    // Use execCommand to apply font - this should create proper HTML
    document.execCommand("fontName", false, fontFamily);
    
    // Also apply style attribute to ensure font persists
    // Wrap selection or apply to current container
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      if (!range.collapsed) {
        // Wrap selected content with span having font-family style
        try {
          const selectedContent = range.extractContents();
          const span = document.createElement("span");
          span.style.fontFamily = fontFamily;
          span.appendChild(selectedContent);
          range.insertNode(span);
          
          // Select the inserted span
          range.selectNodeContents(span);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (e) {
          // Fallback to execCommand if wrapping fails
          console.warn("Font wrapping failed, using execCommand:", e);
        }
      } else {
        // For collapsed selection, ensure parent has font or wrap next typed text
        let container = range.startContainer;
        if (container.nodeType === Node.TEXT_NODE) {
          container = container.parentElement;
        }
        
        // If we're at the root level, wrap current content
        if (container === editorRef.current || !container) {
          // Check if content exists
          if (editorRef.current.textContent.trim()) {
            // Wrap all content in a div with font
            const wrapper = document.createElement("div");
            wrapper.style.fontFamily = fontFamily;
            while (editorRef.current.firstChild) {
              wrapper.appendChild(editorRef.current.firstChild);
            }
            editorRef.current.appendChild(wrapper);
          } else {
            // Set default font for empty editor
            editorRef.current.style.fontFamily = fontFamily;
          }
        } else {
          // Apply font to current container
          container.style.fontFamily = fontFamily;
        }
      }
    }
    
    setSelectedFont(fontFamily);
    setShowFontMenu(false);
    editorRef.current?.focus();
    
    // Trigger change event
    const html = getContentWithFont();
    setContent(html);
    if (onContentChange) {
      onContentChange(html);
    }
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
    <div className="w-full">
      <div className="border border-gray-200 rounded bg-white overflow-hidden">
        {/* Formatting Toolbar */}
        <FormattingToolbar
          onFormat={formatText}
          selectedFont={selectedFont}
          fonts={fonts}
          showFontMenu={showFontMenu}
          setShowFontMenu={setShowFontMenu}
          onFontSelect={applyFont}
          formatState={formatState}
        />

        {/* Editor */}
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onMouseUp={checkFormatState}
            onKeyUp={checkFormatState}
            onClick={checkFormatState}
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
