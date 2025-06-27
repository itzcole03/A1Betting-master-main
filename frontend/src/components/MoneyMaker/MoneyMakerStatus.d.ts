import React from 'react.ts';
import { EngineStatus } from '@/types.ts';
interface MoneyMakerStatusProps {
    status: EngineStatus;
    lastUpdate: string;
    isConnected: boolean;
}
export declare const MoneyMakerStatus: React.FC<MoneyMakerStatusProps>;
export {};
