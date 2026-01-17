import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const FormattingToolbar = ({
  onFormat,
  selectedFont,
  fonts,
  showFontMenu,
  setShowFontMenu,
  onFontSelect,
}) => {
  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50/50 flex-wrap">
      {/* Font Selection */}
      <DropdownMenu.Root open={showFontMenu} onOpenChange={setShowFontMenu}>
        <DropdownMenu.Trigger asChild>
          <button
            className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all min-w-[120px] text-left bg-white text-gray-700 font-medium"
            type="button"
          >
            {selectedFont}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white rounded-md shadow-lg border border-gray-200 p-1 min-w-[200px] z-50 max-h-[300px] overflow-y-auto"
            sideOffset={5}
            align="start"
          >
            {fonts.map((font) => (
              <DropdownMenu.Item
                key={font}
                className="px-3 py-2 text-sm hover:bg-blue-50 rounded cursor-pointer outline-none text-gray-700 focus:bg-blue-50"
                onSelect={() => onFontSelect(font)}
                style={{ fontFamily: font }}
              >
                {font}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Bold */}
      <button
        type="button"
        onClick={() => onFormat("bold")}
        className="px-3 py-1.5 text-sm font-bold border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Bold (Ctrl+B)"
      >
        B
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => onFormat("italic")}
        className="px-3 py-1.5 text-sm italic border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Italic (Ctrl+I)"
      >
        I
      </button>

      {/* Underline */}
      <button
        type="button"
        onClick={() => onFormat("underline")}
        className="px-3 py-1.5 text-sm underline border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Underline (Ctrl+U)"
      >
        U
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Align Left */}
      <button
        type="button"
        onClick={() => onFormat("justifyLeft")}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Align Left"
      >
        ⬅
      </button>

      {/* Align Center */}
      <button
        type="button"
        onClick={() => onFormat("justifyCenter")}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Align Center"
      >
        ➡
      </button>

      {/* Align Right */}
      <button
        type="button"
        onClick={() => onFormat("justifyRight")}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Align Right"
      >
        ⬅➡
      </button>

      {/* Justify */}
      <button
        type="button"
        onClick={() => onFormat("justifyFull")}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Justify"
      >
        ⬅⬅
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Unordered List */}
      <button
        type="button"
        onClick={() => onFormat("insertUnorderedList")}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Bullet List"
      >
        •
      </button>

      {/* Ordered List */}
      <button
        type="button"
        onClick={() => onFormat("insertOrderedList")}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-100 hover:border-gray-300 transition-all bg-white text-gray-700"
        title="Numbered List"
      >
        1.
      </button>
    </div>
  );
};
