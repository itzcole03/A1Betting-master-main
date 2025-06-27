import React from 'react.ts';
import { Alert } from '@/hooks/useSmartAlerts.ts';
interface SmartAlertsProps {
    wsEndpoint: string;
    onAlertClick?: (alert: Alert) => void;
}
export declare const SmartAlerts: React.FC<SmartAlertsProps>;
export {};
