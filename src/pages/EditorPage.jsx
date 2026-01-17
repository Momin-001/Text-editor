import { useState } from "react";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";
import { TextDisplay } from "../components/TextDisplay/TextDisplay";

export const EditorPage = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rich Text Editor
          </h1>
          <p className="text-gray-600 text-sm">
            Type @ to mention users or items
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Editor
            </h2>
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
      </div>
    </div>
  );
};
