import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../utils/classNames';

export const Breadcrumb = ({ items, separator = _jsx(DefaultSeparator, {}), className, maxItems = 0, itemClassName, separatorClassName, }) => {

    function truncateItems(items, maxItems) {
        if (items.length <= maxItems)
            return items;


        return [...start, { label: '...', href: undefined }, ...end];
    }
    return (_jsx("nav", { "aria-label": "Breadcrumb", className: cn('flex', className), children: _jsx("ol", { className: "flex items-center space-x-2", children: renderItems.map((item, index) => (_jsxs("li", { className: "flex items-center", children: [index > 0 && (_jsx("span", { "aria-hidden": "true", className: cn('mx-2 flex items-center', separatorClassName), children: separator })), item.href ? (_jsxs("a", { className: cn('flex items-center text-sm font-medium', index === renderItems.length - 1;
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300', itemClassName), href: item.href, children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), item.label] })) : (_jsxs("span", { className: cn('flex items-center text-sm font-medium', index === renderItems.length - 1;
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-500 dark:text-gray-400', itemClassName), children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), item.label] }))] }, index))) }) }));
};
