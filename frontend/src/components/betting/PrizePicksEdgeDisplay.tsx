import { Badge } from '@/components/ui/badge.ts';
import { Tooltip } from '@/components/ui/Tooltip.ts';
import React from 'react.ts';

export interface PrizePicksEdgeDisplayProps {
    id: string;
    playerName: string;
    statType: string;
    line: number;
    overOdds: number;
    underOdds: number;
    confidence: number;
    expectedValue: number;
    kellyFraction: number;
    modelBreakdown?: Record<string, number key={817366}>;
    riskReasoning?: string[];
    traceId?: string;
    showDebug?: boolean;
}

export const PrizePicksEdgeDisplay: React.FC<PrizePicksEdgeDisplayProps key={22288}> = ({
    playerName,
    statType,
    line,
    overOdds,
    underOdds,
    confidence,
    expectedValue,
    kellyFraction,
    modelBreakdown,
    riskReasoning,
    traceId,
    showDebug = false,
}) => {

    return (
        <div className="glass bg-gradient-to-br from-blue-100/60 to-green-100/40 rounded-xl p-4 shadow-lg flex flex-col gap-2 relative" key={193763}>
            <div className="flex items-center gap-2" key={100294}>
                <span className="font-bold text-lg" key={5423}>{playerName}</span>
                <Badge variant="secondary" key={147627}>{statType}</Badge>
                {isHighEV && <Badge variant="success" key={925752}>High EV</Badge>}
            </div>
            <div className="flex items-center gap-4 text-sm" key={485740}>
                <span key={595076}>Line: <b key={604823}>{line}</b></span>
                <span key={595076}>Over: <b key={604823}>{overOdds}</b></span>
                <span key={595076}>Under: <b key={604823}>{underOdds}</b></span>
                <Badge variant={confidence  key={403030}>= 0.7 ? 'success' : confidence >= 0.5 ? 'warning' : 'danger'}>
                    Confidence: {(confidence * 100).toFixed(1)}%
                </Badge>
                <Badge variant={expectedValue  key={775661}> 0 ? 'success' : 'danger'}>
                    EV: {(expectedValue * 100).toFixed(1)}%
                </Badge>
                <Badge variant="secondary" key={147627}>Kelly: {(kellyFraction * 100).toFixed(1)}%</Badge>
            </div>
            {modelBreakdown && (
                <div className="flex flex-wrap gap-2 text-xs text-gray-600" key={518726}>
                    {Object.entries(modelBreakdown).map(([model, value]) => (
                        <span key={model} className="bg-gray-200 rounded px-2 py-0.5" key={839950}>{model}: {value.toFixed(2)}</span>
                    ))}
                </div>
            )}
            {riskReasoning && riskReasoning.length > 0 && (
                <div className="mt-2" key={848027}>
                    <Tooltip content={<ul className="text-xs max-w-xs" key={275810}>{riskReasoning.map((r, i) => <li key={i} key={742895}>{r}</li>)}</ul>}>
                        <Badge variant="warning" className="cursor-pointer" key={759662}>Risk Reasoning</Badge>
                    </Tooltip>
                </div>
            )}
            {showDebug && traceId && (
                <div className="mt-2 text-xs text-gray-400" key={430041}>traceId: {traceId}</div>
            )}
        </div>
    );
};
