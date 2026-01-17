export const TextDisplay = ({ content }) => {
  if (!content || content.trim() === "") {
    return (
      <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-sm bg-gray-50 min-h-[300px] p-4 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No content to display</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
          <h3 className="text-sm font-semibold text-gray-700">
            Formatted Output
          </h3>
        </div>
        <div
          className="min-h-[300px] p-4 text-gray-800 prose prose-sm max-w-none leading-relaxed"
          style={{ fontFamily: "inherit" }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};
