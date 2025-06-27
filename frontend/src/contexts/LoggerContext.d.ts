import React from 'react.ts';
import { UnifiedLogger } from '@/unified/logging/types.ts';
export declare const LoggerContext: React.Context<any>;
interface LoggerProviderProps {
    logger: UnifiedLogger;
    children: React.ReactNode;
}
export declare const LoggerProvider: React.FC<LoggerProviderProps>;
export {};
