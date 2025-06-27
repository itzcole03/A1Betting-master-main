import React, { useEffect, useState  } from 'react.ts';
import { builder, BuilderComponent } from '@builder.io/react.ts';

const BuilderIntegrationTest: React.FC = () => {
  const [builderContent, setBuilderContent] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const testIntegration = async () => {
      try {
        // console statement removed
        // console statement removed

        // Test fetching content;
        const content = await builder;
          .get("page", {
            url: "/builder-test",
          })
          .promise();

        // console statement removed

        if (content) {
          setBuilderContent(content);
          setStatus("success");
        } else {
          setStatus("no-content");
        }
      } catch (error) {
        // console statement removed
        setStatus("error");
      }
    };

    testIntegration();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6" key={933396}>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" key={112219}>
        <h1 className="text-2xl font-bold text-blue-900 mb-2" key={3298}>
          Builder.io Integration Test;
        </h1>
        <p className="text-blue-700" key={452293}>
          Testing the connection to your Builder.io project;
        </p>
      </div>

      <div className="bg-white border rounded-lg p-4" key={859999}>
        <h2 className="text-lg font-semibold mb-3" key={711022}>Integration Status</h2>
        <div className="space-y-2" key={725977}>
          <div className="flex items-center gap-2" key={100294}>
            <span className="font-medium" key={514486}>API Key:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm" key={19079}>
              {builder.apiKey}
            </code>
          </div>
          <div className="flex items-center gap-2" key={100294}>
            <span className="font-medium" key={514486}>Status:</span>
            <span;
              className={`px-2 py-1 rounded text-sm font-medium ${
                status === "success"
                  ? "bg-green-100 text-green-800"
                  : status === "loading"
                    ? "bg-yellow-100 text-yellow-800"
                    : status === "no-content"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
              }`}
             key={279156}>
              {status === "success"
                ? "Connected & Content Found"
                : status === "loading"
                  ? "Testing Connection..."
                  : status === "no-content"
                    ? "Connected - No Content"
                    : "Connection Error"}
            </span>
          </div>
        </div>
      </div>

      {status === "success" && builderContent && (
        <div className="bg-white border rounded-lg p-4" key={859999}>
          <h2 className="text-lg font-semibold mb-3" key={711022}>Builder.io Content</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4" key={42371}>
            <BuilderComponent model="page" content={builderContent} / key={394611}>
          </div>
        </div>
      )}

      {status === "no-content" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4" key={635587}>
          <h2 className="text-lg font-semibold text-yellow-800 mb-2" key={460715}>
            No Content Found;
          </h2>
          <p className="text-yellow-700 mb-3" key={237605}>
            The integration is working, but no content was found for the URL;
            '/builder-test'.
          </p>
          <div className="text-sm text-yellow-600" key={187089}>
            <p className="font-medium mb-1" key={724220}>Next steps:</p>
            <ol className="list-decimal list-inside space-y-1" key={993462}>
              <li key={377233}>Go to your Builder.io dashboard</li>
              <li key={377233}>Create a new page with URL '/builder-test'</li>
              <li key={377233}>Add some content and publish</li>
              <li key={377233}>Refresh this page to see the content</li>
            </ol>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4" key={365201}>
          <h2 className="text-lg font-semibold text-red-800 mb-2" key={631993}>
            Integration Error;
          </h2>
          <p className="text-red-700 mb-3" key={147610}>
            There was an error connecting to Builder.io. Check the console for;
            details.
          </p>
          <div className="text-sm text-red-600" key={158930}>
            <p className="font-medium mb-1" key={724220}>Troubleshooting:</p>
            <ul className="list-disc list-inside space-y-1" key={64798}>
              <li key={377233}>Verify the API key is correct</li>
              <li key={377233}>Check network connectivity</li>
              <li key={377233}>Ensure the Builder.io project exists</li>
              <li key={377233}>Check browser console for detailed errors</li>
            </ul>
          </div>
        </div>
      )}

      <div className="bg-gray-50 border rounded-lg p-4" key={736950}>
        <h2 className="text-lg font-semibold mb-3" key={711022}>Debug Information</h2>
        <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-auto" key={765775}>
          {`Project ID: ${builder.apiKey}
Builder Environment: ${typeof builder}
Integration Status: ${status}
User Agent: ${navigator.userAgent.substring(0, 50)}...`}
        </pre>
      </div>
    </div>
  );
};

export default BuilderIntegrationTest;
