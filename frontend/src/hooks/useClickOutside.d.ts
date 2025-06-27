import { RefObject } from 'react.ts';
type Event = MouseEvent | TouchEvent;
export declare const useClickOutside: <T extends HTMLElement = HTMLElement>(handler: (event: Event) => void, mouseEvent?: "mousedown" | "mouseup") => RefObject<T>;
export {};
