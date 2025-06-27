import React from 'react.ts';
interface ShapFeature {
    name: string;
    value: number;
    impact: number;
}
interface ShapVisualizationProps {
    features: ShapFeature[];
    title: string;
    maxFeatures?: number;
    isLoading?: boolean;
}
declare const _default: React.NamedExoticComponent<ShapVisualizationProps>;
export default _default;
