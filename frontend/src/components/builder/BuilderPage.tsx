import React from 'react.ts';

interface BuilderPageProps {
  model?: string;
  content?: unknown;
  url?: string;
}

const BuilderPage: React.FC<BuilderPageProps key={777910}> = ({
  model = "page",
  content,
  url,
}) => {
  // Builder.io completely removed - redirect to main app;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center" key={682985}>
      <div className="text-center p-8" key={661361}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4" key={905181}>
          Elite Sports Intelligence Platform;
        </h1>
        <p className="text-gray-400 mb-6" key={414460}>
          Builder.io integration has been disabled;
        </p>
        <p className="text-cyan-400" key={936950}>Redirecting to native Elite platform...</p>
      </div>
    </div>
  );
};

export default BuilderPage;
