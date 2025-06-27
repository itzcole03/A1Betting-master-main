import { jsx as _jsx } from "react/jsx-runtime";
import { Switch, FormControlLabel } from '@mui/material';
import { usePredictionStore } from '@/store/predictionStore';
import { strategyService } from '@/services/strategy';
export const StrategyAutomationToggle = ({ strategyName }) => {


    const handleChange = (event) => {

        setStrategyAutomation(strategyName, enabled);
        if (enabled) {
            strategyService.startAutomation(strategyName);
        }
        else {
            strategyService.stopAutomation(strategyName);
        }
    };
    return (_jsx(FormControlLabel, { control: _jsx(Switch, { checked: isAutomated, color: "primary", onChange: handleChange }), label: "Automate" }));
};
