import React from 'react.ts';
interface ModelSettingsProps {
    onSettingsChange?: (settings: {
        modelType: string;
        confidenceThreshold: number;
        kellyThreshold: number;
    }) => void;
}
export declare const ModelSettings: React.FC<ModelSettingsProps>;
export {};
