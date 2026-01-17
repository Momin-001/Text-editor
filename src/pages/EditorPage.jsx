import { useState } from "react";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";
import { TextDisplay } from "../components/TextDisplay/TextDisplay";

export const EditorPage = () => {
  const [content, setContent] = useState("");
  const [savedTexts, setSavedTexts] = useState([]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSave = () => {
    if (content && content.trim() !== "") {
      const newSavedText = {
        id: Date.now(),
        content: content,
        timestamp: new Date().toLocaleString(),
      };
      setSavedTexts([...savedTexts, newSavedText]);
    }
  };

  const handleClear = () => {
    setContent("");
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rich Text Editor
          </h1>
          <p className="text-gray-600 text-sm">
            Type @ to mention users or items
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Editor Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Editor
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium"
                >
                  Clear
                </button>
                <button
                  onClick={handleSave}
                  disabled={!content || content.trim() === ""}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Save
                </button>
              </div>
            </div>
            <RichTextEditor
              onContentChange={handleContentChange}
              initialContent={content}
            />
          </div>

          {/* Display Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Preview
            </h2>
            <TextDisplay content={content} />
          </div>
        </div>

        {/* Saved Texts List */}
        {savedTexts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Saved Texts ({savedTexts.length})
            </h2>
            <div className="space-y-4">
              {savedTexts.map((savedText, index) => (
                <div
                  key={savedText.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {savedText.timestamp}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const updatedTexts = savedTexts.filter(
                          (t) => t.id !== savedText.id
                        );
                        setSavedTexts(updatedTexts);
                      }}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                  <div
                    className="text-gray-800 prose prose-sm max-w-none leading-relaxed border-t border-gray-100 pt-3"
                    style={{ fontFamily: "inherit" }}
                    dangerouslySetInnerHTML={{ __html: savedText.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
