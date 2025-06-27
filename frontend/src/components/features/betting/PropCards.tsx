import { useAppStore } from '@/store/useAppStore.ts';
import { ParlayLeg, PrizePicksProps, SocialSentimentData } from '@/types.ts';
import { AlertTriangle, Info, Search } from 'lucide-react.ts';
import React, { useEffect, useState  } from 'react.ts';
import SkeletonLoader from '@/base/SkeletonLoader.ts';
import { Modal } from '@/modern/Modals.ts';
import PropCard from './PropCard.ts';


const PropCardSkeleton: React.FC = () => (
  <div className="glass rounded-xl shadow-lg p-4 flex flex-col justify-between space-y-3" key={932107}>
    <SkeletonLoader height="1em" width="40%" className="mb-2" / key={433186}>
    <SkeletonLoader height="1.5em" width="70%" className="mb-1" / key={29139}>
    <SkeletonLoader height="2em" width="50%" className="mb-3" / key={459748}>
    <div className="space-y-2 text-xs" key={270907}>
      <SkeletonLoader height="0.8em" width="60%" / key={156231}>
      <SkeletonLoader height="0.8em" width="50%" / key={157021}>
    </div>
    <SkeletonLoader height="2.5em" width="100%" className="mt-2" / key={129305}>
  </div>
);

const PropCards: React.FC = () => {
  const {
    props,
    isLoadingProps,
    error,
    sentiments,
    fetchProps,
    fetchSentiments,
    addToast,
  } = useAppStore((state) => ({
    props: state.props,
    isLoadingProps: state.isLoadingProps,
    error: state.error, // Assuming a general error field in store for prop fetching;
    sentiments: state.sentiments,
    fetchProps: state.fetchProps,
    fetchSentiments: state.fetchSentiments,
    addToast: state.addToast,
  }));

  const [selectedPropDetails, setSelectedPropDetails] = useState<PrizePicksProps | null key={149064}>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [leagueFilter, setLeagueFilter] = useState('all'); // e.g., 'NBA', 'NFL', 'all'

  useEffect(() => {
    // Fetch initial props, can be re-fetched based on filters later;
    fetchProps();
    // Fetch initial general sentiments, or fetch specific ones when props load;
    // fetchSentiments('market_overview'); // Example for general sentiment;
  }, [fetchProps]);

  const handleViewDetails = (propId: string) => {

    if (prop) {
      setSelectedPropDetails(prop);
      setIsDetailModalOpen(true);
      // Fetch sentiment for this specific prop/player if not already fetched;
      if (!sentiments[prop.player_name.toLowerCase()]) {
        fetchSentiments(prop.player_name);
      }
      // Also fetch prize picks lines;
      useAppStore.getState().fetchPrizePicksLines(prop.id); // Assuming this action exists;
    }
  };

  const getSentimentForProp = (prop: PrizePicksProps): SocialSentimentData | undefined => {
    return sentiments[prop.player_name.toLowerCase()];
  };

  const filteredProps = (Array.isArray(props) ? props : [])
    .filter(p =>
      (leagueFilter === 'all' || p.league?.toLowerCase() === leagueFilter.toLowerCase()) &&
      (p.player_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.stat_type?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="space-y-6" key={501869}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3" key={947528}>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent drop-shadow-lg mb-2" key={326672}>🎯 Player Props</h3>
        <div className="flex items-center gap-2 w-full sm:w-auto" key={594333}>
          <label htmlFor="leagueFilter" className="sr-only" key={890923}>Filter by League</label>
          <div className="relative w-full sm:w-64" key={32529}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" / key={251995}>
            <input;
              type="text"
              placeholder="Search props, players..."
              value={searchTerm}
              onChange={(e) = key={827144}> setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 glass rounded-xl text-lg font-semibold text-primary-700 dark:text-primary-200 focus:ring-primary focus:border-primary shadow-md"
            />
          </div>
          <select;
            id="leagueFilter"
            value={leagueFilter}
            onChange={(e) = key={34627}> setLeagueFilter(e.target.value)}
            className="glass rounded-xl p-2 text-primary-700 dark:text-primary-200 font-semibold shadow-md"
          >
            <option value="all" key={673287}>All Leagues</option>
            <option value="NBA" key={172467}>NBA</option>
            <option value="NFL" key={613230}>NFL</option>
            <option value="MLB" key={328030}>MLB</option>
          </select>
        </div>
      </div>
      {/* Cards grid */}
      {isLoadingProps && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" key={428007}>
          {Array.from({ length: 8 }).map((_, index) => <PropCardSkeleton key={index} / key={31618}>)}
        </div>
      )}
      {!isLoadingProps && error && (
        <div className="text-center p-4 bg-red-500/10 text-red-400 rounded-lg" key={842182}>
          <AlertTriangle className="w-6 h-6 inline mr-2" / key={766598}> Error fetching props: {error}
        </div>
      )}
      {!isLoadingProps && !error && (filteredProps?.length ?? 0) === 0 && (
        <div className="text-center p-4 text-primary-400" key={88823}>No props found matching your criteria. Try adjusting filters or search.</div>
      )}
      {!isLoadingProps && !error && (filteredProps?.length ?? 0) > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" key={600101}>
          {(filteredProps || []).map((prop) => (
            <PropCard;
              key={prop.id}
              prop={prop}
              sentiment={getSentimentForProp(prop)}
              onViewDetails={handleViewDetails}
              className="prop-card glass modern-card hover:scale-105 transition-transform duration-300 cursor-pointer"
            / key={218695}>
          ))}
        </div>
      )}
      {selectedPropDetails && (
        <Modal;
          isOpen={isDetailModalOpen}
          onClose={() = key={994355}> setIsDetailModalOpen(false)}
          title={`${selectedPropDetails.player_name} - ${selectedPropDetails.stat_type} ${selectedPropDetails.line_score}`}
        >
          <div className="space-y-4 p-1 text-text" key={321008}>
            <div className="flex items-center space-x-3" key={602729}>
              {useAppStore.getState().currentPrizePicksPlayer?.image_url && (
                <img src={useAppStore.getState().currentPrizePicksPlayer?.image_url} alt={selectedPropDetails.player_name} className="w-16 h-16 rounded-full object-cover" / key={197165}>
              )}
              <div key={241917}>
                <p key={161203}><strong className="text-text-muted" key={240650}>League:</strong> {selectedPropDetails.league}</p>
                <p key={161203}><strong className="text-text-muted" key={240650}>Team:</strong> {useAppStore.getState().currentPrizePicksPlayer?.team || 'N/A'}</p>
                <p key={161203}><strong className="text-text-muted" key={240650}>Position:</strong> {useAppStore.getState().currentPrizePicksPlayer?.position || 'N/A'}</p>
              </div>
            </div>
            <p key={161203}><strong className="text-text-muted" key={240650}>Description:</strong> {selectedPropDetails.description || 'No description available.'}</p>

            {useAppStore.getState().isLoadingLines ? (
              <p className="text-text-muted" key={342783}>Loading odds...</p>
            ) : useAppStore.getState().currentPrizePicksLines ? (
              <div className="grid grid-cols-2 gap-2 p-3 bg-surface/50 rounded-lg" key={973686}>
                <div key={241917}>
                  <p className="text-sm text-green-400" key={263212}>OVER {useAppStore.getState().currentPrizePicksLines?.line_score}</p>
                  <p className="text-lg font-semibold" key={930820}>{useAppStore.getState().currentPrizePicksLines?.over_odds || selectedPropDetails.overOdds || 'N/A'}</p>
                </div>
                <div key={241917}>
                  <p className="text-sm text-red-400" key={343762}>UNDER {useAppStore.getState().currentPrizePicksLines?.line_score}</p>
                  <p className="text-lg font-semibold" key={930820}>{useAppStore.getState().currentPrizePicksLines?.under_odds || selectedPropDetails.underOdds || 'N/A'}</p>
                </div>
              </div>
            ) : (
              <p className="text-text-muted" key={342783}>Odds information not available.</p>
            )}

            <p className="text-sm text-text-muted" key={792824}>Sentiment: {getSentimentForProp(selectedPropDetails)?.sentimentScore.toFixed(2) ?? 'N/A'}</p>

            {useAppStore.getState().isLoadingLines ? (
              <p className="text-text-muted" key={342783}>Loading sentiment data...</p>
            ) : getSentimentForProp(selectedPropDetails) ? (
              <div className="flex items-center space-x-2" key={740830}>
                <span title={`Pos: ${getSentimentForProp(selectedPropDetails)?.positiveMentions ?? 0}, Neg: ${getSentimentForProp(selectedPropDetails)?.negativeMentions ?? 0}, Neu: ${getSentimentForProp(selectedPropDetails)?.neutralMentions ?? 0}`} key={460160}>
                  <Info size={12} className="cursor-help" / key={710342}>
                </span>
              </div>
            ) : (
              <p className="text-text-muted" key={342783}>Player sentiment data not available.</p>
            )}

            {/* Placeholder for advanced details */}
            <div className="border-t border-border pt-3 mt-3" key={448977}>
              <h5 className="text-md font-semibold mb-2 text-text-muted" key={860002}>Advanced Insights</h5>
              <p className="text-xs text-text-muted" key={597125}>Detailed historical performance, AI predictions, and news-driven insights for this prop are not currently available.</p>
            </div>

            {/* Bet Slip Buttons */}
            <div className="mt-6 flex gap-2" key={369994}>
              <button;
                onClick={() = key={206350}> {

                  const pickOdds = lines?.over_odds; // Or however you determine which odds to use;
                  if (pickOdds === undefined && selectedPropDetails.overOdds === undefined) {
                    addToast({ message: `Odds for OVER ${selectedPropDetails.line_score} not available. Cannot add to slip.`, type: 'error' });
                    return;
                  }
                  const legToAdd: ParlayLeg = {
                    propId: selectedPropDetails.id,
                    pick: 'over' as const,
                    line: selectedPropDetails.line_score,
                    statType: selectedPropDetails.stat_type,
                    playerName: selectedPropDetails.player_name,
                    odds: (pickOdds ?? selectedPropDetails.overOdds ?? 0), // Use 0 as fallback;
                  };
                  useAppStore.getState().addLeg(legToAdd);
                  addToast({ message: `${selectedPropDetails.player_name} OVER ${selectedPropDetails.line_score} added to slip!`, type: 'success' });
                  setIsDetailModalOpen(false);
                }}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Add OVER to Bet Slip;
              </button>
              <button;
                onClick={() = key={206350}> {


                  if (pickOdds === undefined && selectedPropDetails.underOdds === undefined) {
                    addToast({ message: `Odds for UNDER ${selectedPropDetails.line_score} not available. Cannot add to slip.`, type: 'error' });
                    return;
                  }
                  const legToAdd: ParlayLeg = {
                    propId: selectedPropDetails.id,
                    pick: 'under' as const,
                    line: selectedPropDetails.line_score,
                    statType: selectedPropDetails.stat_type,
                    playerName: selectedPropDetails.player_name,
                    odds: (pickOdds ?? selectedPropDetails.underOdds ?? 0), // Use 0 as fallback;
                  };
                  useAppStore.getState().addLeg(legToAdd);
                  addToast({ message: `${selectedPropDetails.player_name} UNDER ${selectedPropDetails.line_score} added to slip!`, type: 'success' });
                  setIsDetailModalOpen(false);
                }}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Add UNDER to Bet Slip;
              </button>
            </div>
            <button;
              onClick={() = key={619354}> setIsDetailModalOpen(false)}
              className="w-full mt-2 px-4 py-2 bg-surface/80 hover:bg-surface text-text rounded-lg transition-colors"
            >
              Close;
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PropCards;
