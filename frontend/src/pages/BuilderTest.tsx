import React, { useEffect, useState  } from 'react.ts';
import { builder, BuilderComponent } from '@builder.io/react.ts';

// A simple test component to debug Builder.io integration;
const BuilderTest: React.FC = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null);
  const [debugStatus, setDebugStatus] = useState({
    apiKey: builder.apiKey,
    isEditing: builder.isEditing,
    userAgent: navigator.userAgent,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight;
  });

  useEffect(() => {
    // Output debug info to console;
    // console statement removed
    // console statement removed);
    // console statement removed

    // Fetch test content;
    async function fetchBuilderContent() {
      try {
        const content = await builder.get('page')
          .promise();
        
        // console statement removed
        setBuilderContentJson(content);
      } catch (error) {
        // console statement removed
      }
    }
    
    fetchBuilderContent();

    // Create global debug helper;
    window.BUILDER_DEBUG = {
      forcePreview: () => {
        builder.setUserAttributes({ ...builder.getUserAttributes(), preview: true });
        // console statement removed
        return 'Preview mode enabled';
      },
      disableTracking: () => {
        // @ts-ignore;
        builder.canTrack = false;
        // console statement removed
        return 'Tracking disabled';
      },
      getRegistry: () => {
        // console statement removed
        return builder.registry;
      },
      dumpStatus: () => {
        const status = {
          apiKey: builder.apiKey,
          isEditing: builder.isEditing,
          components: Object.keys(builder.registry).length,
          userAttributes: builder.getUserAttributes()
        };
        // console statement removed
        return status;
      }
    };
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto" key={185075}>
      <div className="bg-blue-50 p-4 mb-6 rounded-lg" key={196238}>
        <h1 className="text-2xl font-bold mb-2" key={850338}>Builder.io Debug Page</h1>
        <p className="text-gray-600 mb-4" key={575456}>This page helps debug Builder.io integration issues</p>
        
        <div className="bg-white p-4 rounded shadow mb-4" key={155982}>
          <h2 className="font-medium mb-2" key={354837}>Debug Status</h2>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto" key={101122}>
            {JSON.stringify(debugStatus, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-4 rounded shadow mb-4" key={155982}>
          <h2 className="font-medium mb-2" key={354837}>Debug Commands</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm" key={580632}>
            <li key={377233}><code key={901286}>BUILDER_DEBUG.forcePreview()</code> - Force preview mode</li>
            <li key={377233}><code key={901286}>BUILDER_DEBUG.disableTracking()</code> - Disable tracking features</li>
            <li key={377233}><code key={901286}>BUILDER_DEBUG.getRegistry()</code> - Show all registered components</li>
            <li key={377233}><code key={901286}>BUILDER_DEBUG.dumpStatus()</code> - Output current Builder.io status</li>
          </ul>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg" key={648658}>
        <h2 className="font-bold mb-4" key={403698}>Builder.io Content Area:</h2>
        <BuilderComponent model="page" content={builderContentJson} / key={886946}>
      </div>
    </div>
  );
};

export default BuilderTest;
