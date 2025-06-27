import PropCard from '@/components/modern/PropCard.ts';
import React, { useEffect, useState, useMemo  } from 'react.ts';
import { Modal } from '@/components/modern/Modals.ts';
import { PrizePicksProps, SocialSentimentData, ParlayLeg } from '@/types.ts';
import { Search, Filter, AlertTriangle, Info, TrendingUp, TrendingDown, Loader2 } from 'lucide-react.ts';
import { useAppStore, AppStore } from '@/store/useAppStore.ts';


const PrizePicksPage: React.FC = () => {
  const {
    props, isLoadingProps, error: propsError,
    currentPrizePicksPlayer, isLoadingPlayer, 
    currentPrizePicksLines, isLoadingLines,
    sentiments,
    fetchProps,
    fetchPrizePicksPlayer,
    fetchPrizePicksLines,
    fetchSentiments,
    addLeg, addToast,
  } = useAppStore((state: AppStore) => ({
    props: state.props,
    isLoadingProps: state.isLoadingProps,
    error: state.error,
    currentPrizePicksPlayer: state.currentPrizePicksPlayer,
    isLoadingPlayer: state.isLoadingPlayer,
    currentPrizePicksLines: state.currentPrizePicksLines,
    isLoadingLines: state.isLoadingLines,
    sentiments: state.sentiments,
    fetchProps: state.fetchProps,
    fetchPrizePicksPlayer: state.fetchPrizePicksPlayer,
    fetchPrizePicksLines: state.fetchPrizePicksLines,
    fetchSentiments: state.fetchSentiments,
    addLeg: state.addLeg,
    addToast: state.addToast,
  }));

  const [selectedProp, setSelectedProp] = useState<PrizePicksProps | null key={149064}>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [leagueFilter, setLeagueFilter] = useState('all');
  const [statTypeFilter, setStatTypeFilter] = useState('all');

  useEffect(() => {
    fetchProps(leagueFilter === 'all' ? undefined : leagueFilter, 
               statTypeFilter === 'all' ? undefined : statTypeFilter);
  }, [fetchProps, leagueFilter, statTypeFilter]);

  const handleViewDetails = async (prop: PrizePicksProps) => {
    setSelectedProp(prop);
    setIsDetailModalOpen(true);
    fetchPrizePicksPlayer(prop.player_name);
    fetchPrizePicksLines(prop.id);
    fetchSentiments(prop.player_name);
  };

  const getSentimentForProp = (propPlayerName: string): SocialSentimentData | undefined => {
    return sentiments[propPlayerName.toLowerCase()];
  };
  
  const allLeagues: string[] = useMemo(() => Array.from(new Set((Array.isArray(props) ? props : []).map((p: PrizePicksProps) => p.league))), [props]);
  const allStatTypes: string[] = useMemo(() => Array.from(new Set((Array.isArray(props) ? props : []).map((p: PrizePicksProps) => p.stat_type))), [props]);

  const filteredProps = (Array.isArray(props) ? props : []).filter((p: PrizePicksProps) => 
    (leagueFilter === 'all' || p.league?.toLowerCase() === leagueFilter.toLowerCase()) &&
    (statTypeFilter === 'all' || p.stat_type?.toLowerCase() === statTypeFilter.toLowerCase()) &&
    (p.player_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.stat_type?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddLeg = (pickType: 'over' | 'under') => {
    if (!selectedProp) return;

    const lines = currentPrizePicksLines; // From useAppStore selector;
    let pickOdds: number | undefined;

    if (pickType === 'over') {
      pickOdds = lines?.over_odds ?? selectedProp.overOdds;
    } else {
      pickOdds = lines?.under_odds ?? selectedProp.underOdds;
    }

    if (pickOdds === undefined) {
        addToast({message: `Odds for ${selectedProp.player_name} ${pickType.toUpperCase()} not available. Cannot add to slip.`, type: 'error'});
        return;
    }

    const leg: ParlayLeg = {
      propId: selectedProp.id,
      pick: pickType,
      line: selectedProp.line_score,
      statType: selectedProp.stat_type,
      playerName: selectedProp.player_name,
      odds: pickOdds, // Added odds;
    };
    addLeg(leg);
    addToast({message: `${selectedProp.player_name} ${pickType.toUpperCase()} ${selectedProp.line_score} added to slip!`, type: 'success'});
    setIsDetailModalOpen(false);
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6" key={559190}>
      <h1 className="text-3xl font-semibold text-text" key={190537}>PrizePicks Player Props</h1>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 glass rounded-xl shadow-lg" key={283640}>
        <div className="relative col-span-1 sm:col-span-2 md:col-span-2" key={373326}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"/ key={268197}>
          <input; 
            type="text" placeholder="Search props, players..."
            value={searchTerm} onChange={(e) = key={372325}> setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-surface/50 border border-gray-600 rounded-lg text-text focus:ring-primary focus:border-primary"
          />
        </div>
        <div key={241917}>
          <label htmlFor="leagueFilter" className="block text-xs font-medium text-text-muted mb-1" key={888959}>League</label>
          <select id="leagueFilter" value={leagueFilter} onChange={(e) = key={363832}> setLeagueFilter(e.target.value)}
            className="w-full p-2 bg-surface/50 border border-gray-600 rounded-lg text-text focus:ring-primary focus:border-primary"
          >
            <option value="all" key={673287}>All Leagues</option>
            {allLeagues.map((league) => <option key={league} value={league} key={805228}>{league}</option>)}
          </select>
        </div>
        <div key={241917}>
          <label htmlFor="statTypeFilter" className="block text-xs font-medium text-text-muted mb-1" key={450568}>Stat Type</label>
          <select id="statTypeFilter" value={statTypeFilter} onChange={(e) = key={442461}> setStatTypeFilter(e.target.value)}
            className="w-full p-2 bg-surface/50 border border-gray-600 rounded-lg text-text focus:ring-primary focus:border-primary"
          >
            <option value="all" key={673287}>All Stat Types</option>
            {allStatTypes.map((stat) => <option key={stat} value={stat} key={515754}>{stat}</option>)}
          </select>
        </div>
        <button onClick={() = key={965186}> fetchProps(leagueFilter === 'all' ? undefined : leagueFilter, statTypeFilter === 'all' ? undefined : statTypeFilter)} 
          className="col-span-1 sm:col-span-2 md:col-span-4 flex items-center justify-center p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50"
          disabled={isLoadingProps}
        >
          {isLoadingProps ? <Loader2 className="w-5 h-5 animate-spin"/ key={953942}> : <Filter className="w-5 h-5 mr-2" / key={995477}>} Apply Filters;
        </button>
      </div>

      {/* Props Display */}
      {isLoadingProps && (
        <div className="flex flex-col items-center justify-center h-64" key={326229}>
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-3" / key={157609}>
          <p className="text-text-muted" key={342783}>Loading PrizePicks Props...</p>
        </div>
      )}
      {!isLoadingProps && propsError && (
        <div className="text-center p-6 bg-red-500/10 text-red-400 rounded-xl" key={715309}>
          <AlertTriangle className="w-8 h-8 inline mr-2" / key={131269}> Error fetching props: {propsError}
        </div>
      )}
      {!isLoadingProps && !propsError && (filteredProps?.length ?? 0) === 0 && (
        <div className="text-center p-6 text-text-muted rounded-xl glass" key={788161}>
          No props found matching your criteria. Try adjusting filters or search.
        </div>
      )}
      {!isLoadingProps && !propsError && (filteredProps?.length ?? 0) > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" key={309479}>
          {(filteredProps || []).map((prop: PrizePicksProps) => (
            <PropCard key={prop.id} prop={prop} sentiment={getSentimentForProp(prop.player_name)} onViewDetails={() = key={501004}> handleViewDetails(prop)} />
          ))}
        </div>
      )}

      {/* Prop Detail Modal */}
      {selectedProp && (
        <Modal; 
          isOpen={isDetailModalOpen} 
          onClose={() = key={171586}> setIsDetailModalOpen(false)} 
          title={`${selectedProp.player_name} - ${selectedProp.stat_type} ${selectedProp.line_score}`}
          size="lg"
        >
          <div className="space-y-4" key={160407}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={476625}>
              <div key={241917}>
                <h4 className="text-lg font-semibold text-primary mb-2" key={98456}>Prop Details</h4>
                {isLoadingPlayer && <div className="flex items-center" key={520222}><Loader2 className="w-4 h-4 animate-spin mr-2 text-primary" / key={697560}><span className="text-text-muted" key={846523}>Loading player...</span></div>}
                {!isLoadingPlayer && propsError && !currentPrizePicksPlayer && <p className="text-sm text-red-400" key={343762}>Error loading player details.</p>}
                {!isLoadingPlayer && currentPrizePicksPlayer && (
                  <>
                    <p key={161203}><strong className="text-text-muted" key={240650}>League:</strong> {selectedProp.league}</p>
                    <p key={161203}><strong className="text-text-muted" key={240650}>Team:</strong> {currentPrizePicksPlayer.team || 'N/A'}</p>
                    <p key={161203}><strong className="text-text-muted" key={240650}>Position:</strong> {currentPrizePicksPlayer.position || 'N/A'}</p>
                  </>
                )}
                 {/* Display general prop info even if player details are loading/failed */}
                <p key={161203}><strong className="text-text-muted" key={240650}>Description:</strong> {selectedProp.description}</p>
                {selectedProp.start_time && <p key={161203}><strong className="text-text-muted" key={240650}>Start Time:</strong> {new Date(selectedProp.start_time).toLocaleString()}</p>}
              </div>
              <div key={241917}>
                <h4 className="text-lg font-semibold text-primary mb-2" key={98456}>Market Lines</h4>
                {isLoadingLines && <div className="flex items-center" key={520222}><Loader2 className="w-4 h-4 animate-spin mr-2 text-primary" / key={697560}><span className="text-text-muted" key={846523}>Loading lines...</span></div>}
                {!isLoadingLines && propsError && !currentPrizePicksLines && <p className="text-sm text-red-400" key={343762}>Error loading market lines.</p>}
                {!isLoadingLines && currentPrizePicksLines && (
                  <>
                    <p key={161203}><strong className="text-text-muted" key={240650}>Over Odds:</strong> {currentPrizePicksLines.over_odds ?? selectedProp.overOdds ?? 'N/A'}</p>
                    <p key={161203}><strong className="text-text-muted" key={240650}>Under Odds:</strong> {currentPrizePicksLines.under_odds ?? selectedProp.underOdds ?? 'N/A'}</p>
                  </>
                )}
                {!isLoadingLines && !currentPrizePicksLines && !propsError && <p className="text-text-muted" key={342783}>No specific line data available.</p>}
              </div>
            </div>
            
            {currentPrizePicksPlayer?.image_url && (
                <img src={currentPrizePicksPlayer.image_url} alt={currentPrizePicksPlayer.name} className="w-24 h-24 rounded-full mx-auto my-3 shadow-md"/ key={783296}>
            )}

            <div className="my-3" key={235731}>
                <h4 className="text-md font-semibold text-primary mb-1" key={733018}>Social Sentiment</h4>
                 {sentiments[selectedProp.player_name.toLowerCase()] ? (
                    <div className="flex items-center space-x-2 text-sm text-text-muted" key={594657}>
                       {sentiments[selectedProp.player_name.toLowerCase()].sentimentScore > 0.2 ? <TrendingUp className="text-green-500"/ key={743547}> : 
                        sentiments[selectedProp.player_name.toLowerCase()].sentimentScore < -0.2 ? <TrendingDown className="text-red-500"/ key={714082}> : 
                        <Info className="text-yellow-500"/ key={998479}>} 
                       <span key={595076}>Score: {sentiments[selectedProp.player_name.toLowerCase()].sentimentScore.toFixed(2)}</span>
                       <span key={595076}>(Pos: {sentiments[selectedProp.player_name.toLowerCase()].positiveMentions}, Neg: {sentiments[selectedProp.player_name.toLowerCase()].negativeMentions})</span>
                    </div>
                 ) : <p className="text-sm text-text-muted" key={792824}>Sentiment not available or still loading.</p>}
            </div>
            
            <p className="text-sm text-text-muted" key={792824}>Advanced stats, historical performance, and AI predictions for this prop will be shown here.</p>
            
            <div className="mt-6 flex gap-3" key={802269}>
                <button onClick={() = key={965186}> handleAddLeg('over')} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                    Add OVER {selectedProp.line_score} to Slip;
                </button>
                 <button onClick={() = key={965186}> handleAddLeg('under')} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                    Add UNDER {selectedProp.line_score} to Slip;
                </button>
            </div>
            <button onClick={() = key={965186}> setIsDetailModalOpen(false)} className="w-full mt-3 px-4 py-2 bg-surface/80 hover:bg-surface text-text rounded-lg transition-colors">
              Close;
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PrizePicksPage; 