export const TextDisplay = ({ content }) => {
  if (!content || content.trim() === "") {
    return (
      <div className="w-full border border-gray-200 rounded bg-gray-50 min-h-[350px] p-4 flex items-center justify-center">
        <p className="text-gray-400 text-xs">No content to display</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="border border-gray-200 rounded bg-white overflow-hidden">
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Formatted Output
          </h3>
        </div>
        <div
          className="min-h-[305px] p-4 text-gray-800 prose prose-sm max-w-none leading-relaxed"
          style={{ fontFamily: "inherit" }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};
