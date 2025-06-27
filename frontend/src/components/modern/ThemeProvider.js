import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
export const ThemeProvider = ({ children }) => {

    useEffect(() => {

        if (theme === 'dark') {
            html.classList.add('dark');
        }
        else {
            html.classList.remove('dark');
        }
    }, [theme]);
    return _jsx(_Fragment, { children: children });
};
