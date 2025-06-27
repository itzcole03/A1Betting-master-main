import React from 'react.ts';
interface BookmakerAnalysisProps {
    analysis: {
        suspiciousLevel: number;
        warning?: string;
        adjustedProbability: number;
        riskScore: number;
    };
    className?: string;
}
export declare const BookmakerAnalysis: React.FC<BookmakerAnalysisProps>;
declare const _default: React.NamedExoticComponent<BookmakerAnalysisProps>;
export default _default;
