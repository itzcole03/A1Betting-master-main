import React from 'react.ts';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900" key={681278}>
      <div className="flex flex-col items-center space-y-4" key={84223}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent" key={70315}></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white" key={262972}>Loading...</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
          Please wait while we set things up;
        </p>
      </div>
    </div>
  );
}
