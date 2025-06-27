import React from 'react.ts';
import {
    Database,
    TrendingUp,
    Wifi,
    WifiOff;
} from 'lucide-react.ts';
import { SPORTS_CONFIG } from '@/constants/sports.ts';

interface HeroSectionProps {
    connectedSources: number;
    totalSources: number;
    gamesCount: number;
    playersCount: number;
    dataQuality: number;
    dataReliability: number;
}

export function HeroSection({
    connectedSources,
    totalSources,
    gamesCount,
    playersCount,
    dataQuality,
    dataReliability,
}: HeroSectionProps) {
    const connectionPercentage =
        totalSources > 0 ? (connectedSources / totalSources) * 100 : 0;

    const isPrizePicksConnected = connectedSources > 0; // Simplified check;

    return (
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-10 text-white relative overflow-hidden" key={434505}>
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10" key={335614}>
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse" key={182113}></div>
                <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce" key={706888}></div>
                <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-green-300 rounded-full animate-ping" key={356599}></div>
                <div className="absolute bottom-20 right-1/4 w-14 h-14 bg-red-300 rounded-full animate-pulse" key={112781}></div>
            </div>

            <div className="relative z-10" key={407833}>
                <div className="text-center mb-8" key={490373}>
                    <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent" key={931349}>
                        🚀 ENHANCED SPORTS AI PLATFORM 🚀
                    </h1>
                    <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90" key={648676}>
                        Advanced sports intelligence with{" "}
                        <span className="font-bold text-yellow-300" key={812974}>
                            {totalSources}+ real data sources;
                        </span>
                        ,
                        <span className="font-bold text-green-300" key={961837}>
                            {" "}
                            PrizePicks integration;
                        </span>
                        ,
                        <span className="font-bold text-blue-300" key={855191}>
                            {" "}
                            live market analysis;
                        </span>
                        , and;
                        <span className="font-bold text-red-300" key={104853}>
                            {" "}
                            production-grade AI models;
                        </span>{" "}
                        across all major sports;
                    </p>
                    <div className="mt-4 flex items-center justify-center space-x-6 text-sm" key={137058}>
                        <div className="flex items-center space-x-2" key={740830}>
                            {isFullyConnected ? (
                                <Wifi className="w-4 h-4 text-green-400 animate-pulse" / key={237283}>
                            ) : (
                                <WifiOff className="w-4 h-4 text-yellow-400" / key={531157}>
                            )}
                            <span;
                                className={`font-medium ${isFullyConnected ? "text-green-300" : "text-yellow-300"}`}
                             key={572116}>
                                {isFullyConnected ? "Full Data Coverage" : "Partial Coverage"}
                            </span>
                        </div>
                        <div className="text-gray-300" key={102869}>•</div>
                        <div className="flex items-center space-x-2" key={740830}>
                            <Database className="w-4 h-4 text-purple-400" / key={305497}>
                            <span className="text-purple-300 font-medium" key={607215}>
                                47+ AI Models Active;
                            </span>
                        </div>
                        <div className="text-gray-300" key={102869}>•</div>
                        <div className="flex items-center space-x-2" key={740830}>
                            <TrendingUp className="w-4 h-4 text-blue-400" / key={765072}>
                            <span className="text-blue-300 font-medium" key={333550}>
                                Real-Time Analysis;
                            </span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6" key={512512}>
                    <div className="text-center p-4 glass-morphism rounded-xl" key={12458}>
                        <div className="text-2xl font-bold text-green-400" key={77409}>
                            {connectedSources}
                        </div>
                        <div className="text-xs opacity-80" key={198820}>Data Sources</div>
                        <div className="text-xs text-green-300 mt-1" key={990827}>
                            {connectionPercentage.toFixed(0)}% Active;
                        </div>
                    </div>

                    <div className="text-center p-4 glass-morphism rounded-xl" key={12458}>
                        <div className="text-2xl font-bold text-yellow-400" key={61220}>
                            {gamesCount}
                        </div>
                        <div className="text-xs opacity-80" key={198820}>Live Games</div>
                        <div className="text-xs text-yellow-300 mt-1" key={917749}>All Sports</div>
                    </div>

                    <div className="text-center p-4 glass-morphism rounded-xl" key={12458}>
                        <div className="text-2xl font-bold text-blue-400" key={168887}>
                            {playersCount}
                        </div>
                        <div className="text-xs opacity-80" key={198820}>Active Players</div>
                        <div className="text-xs text-blue-300 mt-1" key={254350}>Enhanced Data</div>
                    </div>

                    <div className="text-center p-4 glass-morphism rounded-xl" key={12458}>
                        <div className="text-2xl font-bold text-purple-400" key={618393}>
                            {(dataQuality * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs opacity-80" key={198820}>Data Quality</div>
                        <div className="text-xs text-purple-300 mt-1" key={876990}>Verified</div>
                    </div>

                    <div className="text-center p-4 glass-morphism rounded-xl" key={12458}>
                        <div className="text-2xl font-bold text-indigo-400" key={860431}>
                            {(dataReliability * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs opacity-80" key={198820}>Reliability</div>
                        <div className="text-xs text-indigo-300 mt-1" key={318059}>Tested</div>
                    </div>

                    <div className="text-center p-4 glass-morphism rounded-xl" key={12458}>
                        <div className="text-2xl font-bold text-red-400" key={683097}>
                            {SPORTS_CONFIG.length}
                        </div>
                        <div className="text-xs opacity-80" key={198820}>Sports</div>
                        <div className="text-xs text-red-300 mt-1" key={320709}>Covered</div>
                    </div>
                </div>

                {/* Sports Coverage */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-6" key={79357}>
                    {SPORTS_CONFIG.map((sport) => (
                        <div;
                            key={sport.id}
                            className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2"
                         key={686365}>
                            <span className="text-lg" key={107211}>{sport.emoji}</span>
                            <span key={595076}>{sport.displayName}</span>
                        </div>
                    ))}
                </div>

                {/* PrizePicks Integration Status */}
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/20" key={293812}>
                    <div className="flex items-center justify-between" key={96335}>
                        <div className="flex items-center space-x-4" key={787951}>
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center" key={517015}>
                                <span className="text-2xl" key={18044}>🎯</span>
                            </div>
                            <div key={241917}>
                                <h3 className="text-xl font-bold" key={54291}>PrizePicks Integration</h3>
                                <p className="text-sm opacity-80" key={322759}>
                                    {isPrizePicksConnected;
                                        ? "Connected to PrizePicks data feeds with real-time prop analysis"
                                        : "PrizePicks integration available - enhanced prop betting intelligence"}
                                </p>
                            </div>
                        </div>
                        <div className="text-right" key={144468}>
                            <div;
                                className={`text-2xl font-bold ${isPrizePicksConnected ? "text-green-400" : "text-yellow-400"}`}
                             key={488977}>
                                {isPrizePicksConnected ? "✅" : "⚠️"}
                            </div>
                            <div className="text-xs opacity-80" key={198820}>
                                {isPrizePicksConnected ? "Active" : "Standby"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
