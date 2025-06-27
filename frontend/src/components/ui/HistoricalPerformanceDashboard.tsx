// HistoricalPerformanceDashboard.tsx;
// Visualizes user/model historical performance;

import React from 'react.ts';
import { useBetHistoryStore } from '@/store/slices/betHistorySlice.ts';

export const HistoricalPerformanceDashboard: React.FC = () => {


  return (
    <section className="w-full p-4 bg-white shadow rounded mb-4" key={248874}>
      <h3 className="text-md font-bold mb-2" key={991499}>Historical Performance</h3>
      {userHistory && userHistory.entries.length > 0 ? (
        <div key={241917}>
          <h4 className="font-semibold mb-1" key={905479}>Your Bet History</h4>
          <div className="overflow-x-auto" key={522094}>
            <table className="min-w-full text-xs border" key={5929}>
              <thead key={851248}>
                <tr className="bg-gray-100" key={236169}>
                  <th className="px-2 py-1" key={38082}>Date</th>
                  <th className="px-2 py-1" key={38082}>Event</th>
                  <th className="px-2 py-1" key={38082}>Type</th>
                  <th className="px-2 py-1" key={38082}>Stake</th>
                  <th className="px-2 py-1" key={38082}>Odds</th>
                  <th className="px-2 py-1" key={38082}>Result</th>
                  <th className="px-2 py-1" key={38082}>Payout</th>
                  <th className="px-2 py-1" key={38082}>Confidence</th>
                  <th className="px-2 py-1" key={38082}>Win Prob</th>
                </tr>
              </thead>
              <tbody key={453335}>
                {userHistory.entries.map((entry) => (
                  <tr key={entry.betId} className="border-b" key={956155}>
                    <td className="px-2 py-1" key={865501}>{entry.date}</td>
                    <td className="px-2 py-1" key={865501}>{entry.eventId}</td>
                    <td className="px-2 py-1" key={865501}>{entry.betType}</td>
                    <td className="px-2 py-1" key={865501}>${entry.stake.toFixed(2)}</td>
                    <td className="px-2 py-1" key={865501}>{entry.odds.toFixed(2)}</td>
                    <td className="px-2 py-1" key={865501}>{entry.result}</td>
                    <td className="px-2 py-1" key={865501}>${entry.payout.toFixed(2)}</td>
                    <td className="px-2 py-1" key={865501}>[{entry.confidenceBand.lower.toFixed(2)} - {entry.confidenceBand.upper.toFixed(2)}]</td>
                    <td className="px-2 py-1" key={865501}>{(entry.winProbability.probability * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-gray-400" key={7335}>No user bet history available.</div>
      )}
      {modelHistory && modelHistory.length > 0 && (
        <div className="mt-4" key={139982}>
          <h4 className="font-semibold mb-1" key={905479}>Model Performance</h4>
          <div className="overflow-x-auto" key={522094}>
            <table className="min-w-full text-xs border" key={5929}>
              <thead key={851248}>
                <tr className="bg-gray-100" key={236169}>
                  <th className="px-2 py-1" key={38082}>Model</th>
                  <th className="px-2 py-1" key={38082}>Market</th>
                  <th className="px-2 py-1" key={38082}>Date</th>
                  <th className="px-2 py-1" key={38082}>Prediction</th>
                  <th className="px-2 py-1" key={38082}>Actual</th>
                  <th className="px-2 py-1" key={38082}>Won?</th>
                  <th className="px-2 py-1" key={38082}>Payout</th>
                  <th className="px-2 py-1" key={38082}>Confidence</th>
                  <th className="px-2 py-1" key={38082}>Win Prob</th>
                </tr>
              </thead>
              <tbody key={453335}>
                {modelHistory.flatMap((mh) =>
                  mh.entries.map((entry, idx) => (
                    <tr key={mh.model + mh.market + idx} className="border-b" key={848164}>
                      <td className="px-2 py-1" key={865501}>{mh.model}</td>
                      <td className="px-2 py-1" key={865501}>{mh.market}</td>
                      <td className="px-2 py-1" key={865501}>{entry.date}</td>
                      <td className="px-2 py-1" key={865501}>{entry.prediction.toFixed(2)}</td>
                      <td className="px-2 py-1" key={865501}>{entry.actual.toFixed(2)}</td>
                      <td className="px-2 py-1" key={865501}>{entry.won ? 'Yes' : 'No'}</td>
                      <td className="px-2 py-1" key={865501}>${entry.payout.toFixed(2)}</td>
                      <td className="px-2 py-1" key={865501}>[{entry.confidenceBand.lower.toFixed(2)} - {entry.confidenceBand.upper.toFixed(2)}]</td>
                      <td className="px-2 py-1" key={865501}>{(entry.winProbability.probability * 100).toFixed(1)}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
