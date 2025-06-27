import React from 'react.ts';
import { Event } from '@/types/betting.ts';
interface EventListProps {
    events: Event[];
    isLoading: boolean;
    selectedSport: Sport | null;
}
declare const _default: React.NamedExoticComponent<EventListProps>;
export default _default;
