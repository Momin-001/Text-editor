import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Rich Text Editor
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          A powerful text editor built with React, Radix UI, and Tailwind CSS
        </p>
        <Link
          to="/editor"
          className="inline-block px-4 py-2 text-xs border border-blue-600 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Open Editor
        </Link>
      </div>
    </div>
  );
};
