import React from 'react.ts';
import type { Entry } from '@/types.ts';
interface EntryCardProps {
    entry: Entry;
    onClick?: () => void;
}
export declare const EntryCard: React.FC<EntryCardProps>;
export {};
