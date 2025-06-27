import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X } from 'lucide-react';
const BetSlipSidebar = () => {
    const { legs, removeLeg, clearSlip, updateStake, stake, potentialPayout, isSubmitting, submitSlip, addToast, } = useAppStore(state => ({
        legs: state.legs,
        removeLeg: state.removeLeg,
        clearSlip: state.clearSlip,
        updateStake: state.updateStake,
        stake: state.stake,
        potentialPayout: state.potentialPayout,
        isSubmitting: state.isSubmitting,
        submitSlip: state.submitSlip,
        addToast: state.addToast,
    }));
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const handleSubmit = async () => {
        if (legs.length < 2) {
            addToast({ message: 'Select at least 2 picks to submit a bet.', type: 'warning' });
            return;
        }
        if (stake <= 0) {
            addToast({ message: 'Please enter a valid stake amount.', type: 'warning' });
            return;
        }

        if (result) {
            setIsMobileOpen(false);
        }
    };
    // Mobile toggle button;

    // Main betslip content;

    // Desktop sidebar;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "hidden lg:flex flex-col fixed top-0 right-0 h-full w-[380px] z-[100] p-6 bg-gradient-to-br from-primary-900/90 to-primary-700/80 glass shadow-2xl animate-fade-in", children: BetSlipContent }), _jsx(MobileToggle, {}), isMobileOpen && (_jsx("div", { className: "fixed inset-0 z-[101] flex items-end justify-center bg-black/60 backdrop-blur-xl animate-fade-in lg:hidden", children: _jsx("div", { className: "w-full max-w-md bg-gradient-to-br from-primary-900/90 to-primary-700/80 glass rounded-t-3xl shadow-2xl p-6", children: BetSlipContent }) }))] }));
};
export default React.memo(BetSlipSidebar);
