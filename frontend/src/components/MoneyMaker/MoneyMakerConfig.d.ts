import React from 'react.ts';
import { MoneyMakerConfig as ConfigType } from '@/types.ts';
interface Props {
    onConfigChange: (config: ConfigType) => void;
    onActivate: () => void;
    onDeactivate: () => void;
    isActive: boolean;
}
export declare const MoneyMakerConfig: React.FC<Props>;
export {};
