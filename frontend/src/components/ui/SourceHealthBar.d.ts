import React from 'react.ts';
export interface SourceHealthBarProps {
    sources: {
        name: string;
        healthy: boolean;
    }[];
}
declare const SourceHealthBar: React.FC<SourceHealthBarProps>;
export default SourceHealthBar;
