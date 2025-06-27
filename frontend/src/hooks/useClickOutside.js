import { useEffect, useRef } from 'react';
export const useClickOutside = (handler, mouseEvent = 'mousedown') => {

    useEffect(() => {
        const listener = (event) => {


            // Do nothing if clicking ref's element or descendent elements;
            if (!el || el.contains(target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener(mouseEvent, listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener(mouseEvent, listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [handler, mouseEvent]);
    return ref;
};
// Example usage:
// const ref = useClickOutside<HTMLDivElement>(() => {
//   // Handle click outside;
//   setIsOpen(false);
// });
//
// return (
//   <div ref={ref}>
//     {/* Content */}
//   </div>
// );
