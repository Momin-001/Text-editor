import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const FormattingToolbar = ({
  onFormat,
  selectedFont,
  fonts,
  showFontMenu,
  setShowFontMenu,
  onFontSelect,
  formatState = {},
}) => {
  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
      {/* Font Selection */}
      <DropdownMenu.Root open={showFontMenu} onOpenChange={setShowFontMenu}>
        <DropdownMenu.Trigger asChild>
          <button
            className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors min-w-[120px] text-left bg-white text-gray-700"
            type="button"
          >
            {selectedFont}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white rounded border border-gray-200 p-1 min-w-[200px] z-50 max-h-[300px] overflow-y-auto"
            sideOffset={5}
            align="start"
          >
            {fonts.map((font) => (
              <DropdownMenu.Item
                key={font}
                className="px-3 py-1.5 text-xs hover:bg-blue-50 rounded cursor-pointer outline-none text-gray-700 focus:bg-blue-50"
                onSelect={() => onFontSelect(font)}
                style={{ fontFamily: font }}
              >
                {font}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Bold */}
      <button
        type="button"
        onClick={() => onFormat("bold")}
        className={`px-3 py-1.5 text-xs font-bold border rounded transition-colors ${
          formatState.bold
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Bold (Ctrl+B)"
      >
        B
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => onFormat("italic")}
        className={`px-3 py-1.5 text-xs italic border rounded transition-colors ${
          formatState.italic
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Italic (Ctrl+I)"
      >
        I
      </button>

      {/* Underline */}
      <button
        type="button"
        onClick={() => onFormat("underline")}
        className={`px-3 py-1.5 text-xs underline border rounded transition-colors ${
          formatState.underline
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Underline (Ctrl+U)"
      >
        U
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Align Left */}
      <button
        type="button"
        onClick={() => onFormat("justifyLeft")}
        className={`px-3 py-1.5 text-xs border rounded transition-colors flex items-center justify-center ${
          formatState.justifyLeft
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Align Left"
      >
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-3"
        >
          <rect x="0" y="1" width="12" height="1.5" fill="currentColor" />
          <rect x="0" y="4" width="8" height="1.5" fill="currentColor" />
          <rect x="0" y="7" width="10" height="1.5" fill="currentColor" />
          <rect x="0" y="10" width="6" height="1.5" fill="currentColor" />
        </svg>
      </button>

      {/* Align Center */}
      <button
        type="button"
        onClick={() => onFormat("justifyCenter")}
        className={`px-3 py-1.5 text-xs border rounded transition-colors flex items-center justify-center ${
          formatState.justifyCenter
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Align Center"
      >
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-3"
        >
          <rect x="2" y="1" width="12" height="1.5" fill="currentColor" />
          <rect x="4" y="4" width="8" height="1.5" fill="currentColor" />
          <rect x="3" y="7" width="10" height="1.5" fill="currentColor" />
          <rect x="5" y="10" width="6" height="1.5" fill="currentColor" />
        </svg>
      </button>

      {/* Align Right */}
      <button
        type="button"
        onClick={() => onFormat("justifyRight")}
        className={`px-3 py-1.5 text-xs border rounded transition-colors flex items-center justify-center ${
          formatState.justifyRight
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Align Right"
      >
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-3"
        >
          <rect x="4" y="1" width="12" height="1.5" fill="currentColor" />
          <rect x="8" y="4" width="8" height="1.5" fill="currentColor" />
          <rect x="6" y="7" width="10" height="1.5" fill="currentColor" />
          <rect x="10" y="10" width="6" height="1.5" fill="currentColor" />
        </svg>
      </button>

      {/* Justify */}
      <button
        type="button"
        onClick={() => onFormat("justifyFull")}
        className={`px-3 py-1.5 text-xs border rounded transition-colors flex items-center justify-center ${
          formatState.justifyFull
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Justify"
      >
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-3"
        >
          <rect x="0" y="1" width="16" height="1.5" fill="currentColor" />
          <rect x="0" y="4" width="16" height="1.5" fill="currentColor" />
          <rect x="0" y="7" width="16" height="1.5" fill="currentColor" />
          <rect x="0" y="10" width="16" height="1.5" fill="currentColor" />
        </svg>
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Unordered List */}
      <button
        type="button"
        onClick={() => onFormat("insertUnorderedList")}
        className={`px-3 py-1.5 text-xs border rounded transition-colors ${
          formatState.insertUnorderedList
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Bullet List"
      >
        <span className="font-semibold">•</span>
      </button>

      {/* Ordered List */}
      <button
        type="button"
        onClick={() => onFormat("insertOrderedList")}
        className={`px-3 py-1.5 text-xs border rounded transition-colors ${
          formatState.insertOrderedList
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
        title="Numbered List"
      >
        <span className="font-semibold">1.</span>
      </button>
    </div>
  );
};
