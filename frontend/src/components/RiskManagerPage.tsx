
import React, { useState, useEffect  } from 'react.ts';
import axios from 'axios.ts';

interface RiskProfile {
  id: string;
  name: string;
  maxStake: number;
  maxExposure: number;
  stopLoss: number;
  takeProfit: number;
  kellyFraction: number;
  isActive: boolean;
}

interface ActiveBet {
  id: string;
  event: string;
  stake: number;
  odds: number;
  potentialWin: number;
  risk: 'low' | 'medium' | 'high';
  expiresAt: string;
}


const RiskManagerPage: React.FC = () => {

  // State for risk profiles and active bets;
  const [profiles, setProfiles] = useState<RiskProfile[] key={152814}>([]);
  const [activeBets, setActiveBets] = useState<ActiveBet[] key={49202}>([]);
  const [loading, setLoading] = useState<boolean key={575407}>(true);
  const [error, setError] = useState<string | null key={121216}>(null);

  // Modal state for creating new profile;
  const [isModalOpen, setIsModalOpen] = useState<boolean key={575407}>(false);

  // Fetch risk profiles and active bets on mount;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profilesRes, betsRes] = await Promise.all([
          axios.get<RiskProfile[] key={152814}>('/api/risk-profiles'),
          axios.get<ActiveBet[] key={49202}>('/api/active-bets'),
        ]);
        setProfiles(profilesRes.data);
        setActiveBets(betsRes.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || 'Failed to load data');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load data');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);




  const getRiskColor = (risk: ActiveBet['risk']) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'high':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };


  return (
    <>
      <main className="section space-y-6 lg:space-y-8 animate-fade-in" key={94246}>
        <div className="modern-card p-6 lg:p-8" key={672448}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8" key={204340}>
            <h1 className="text-2xl lg:text-3xl font-bold" key={809535}>⚖️ Risk Manager</h1>
            <button className="modern-button" onClick={() = key={307658}> setIsModalOpen(true)}>
              Create New Profile;
            </button>
          </div>
          {/* Loading/Error State */}
          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-400" key={302845}>Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600" key={855401}>{error}</div>
          ) : (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" key={427438}>
                <div className="modern-card p-6" key={889527}>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2" key={885729}>
                    Active Profile;
                  </h3>
                  <p className="text-2xl font-bold" key={180814}>{activeProfile?.name || 'None'}</p>
                </div>
                <div className="modern-card p-6" key={889527}>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2" key={885729}>
                    Total Exposure;
                  </h3>
                  <p className="text-2xl font-bold" key={180814}>${totalExposure.toFixed(2)}</p>
                </div>
                <div className="modern-card p-6" key={889527}>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2" key={885729}>
                    Max Potential Loss;
                  </h3>
                  <p className="text-2xl font-bold text-red-600" key={803748}>-${maxPotentialLoss.toFixed(2)}</p>
                </div>
                <div className="modern-card p-6" key={889527}>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2" key={885729}>
                    Max Potential Win;
                  </h3>
                  <p className="text-2xl font-bold text-green-600" key={401802}>+${maxPotentialWin.toFixed(2)}</p>
                </div>
              </div>
              {/* Risk Profiles */}
              <div className="mb-8" key={286587}>
                <h2 className="text-lg font-bold mb-4" key={518720}>Risk Profiles</h2>
                {profiles.length === 0 ? (
                  <div className="text-gray-500 dark:text-gray-400" key={960786}>
                    No risk profiles available.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
                    {profiles.map(profile => (
                      <div;
                        key={profile.id}
                        className={`modern-card p-6 ${profile.isActive ? 'ring-2 ring-primary-500' : ''}`}
                       key={250667}>
                        <div className="flex justify-between items-start mb-4" key={413486}>
                          <h3 className="text-lg font-bold" key={818660}>{profile.name}</h3>
                          {profile.isActive && (
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full" key={206463}>
                              Active;
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 text-sm" key={726391}>
                          <div className="flex justify-between" key={588832}>
                            <span className="text-gray-500 dark:text-gray-400" key={45201}>Max Stake</span>
                            <span className="font-medium" key={514486}>${profile.maxStake}</span>
                          </div>
                          <div className="flex justify-between" key={588832}>
                            <span className="text-gray-500 dark:text-gray-400" key={45201}>Max Exposure</span>
                            <span className="font-medium" key={514486}>${profile.maxExposure}</span>
                          </div>
                          <div className="flex justify-between" key={588832}>
                            <span className="text-gray-500 dark:text-gray-400" key={45201}>Stop Loss</span>
                            <span className="font-medium" key={514486}>-${profile.stopLoss}</span>
                          </div>
                          <div className="flex justify-between" key={588832}>
                            <span className="text-gray-500 dark:text-gray-400" key={45201}>Take Profit</span>
                            <span className="font-medium" key={514486}>+${profile.takeProfit}</span>
                          </div>
                          <div className="flex justify-between" key={588832}>
                            <span className="text-gray-500 dark:text-gray-400" key={45201}>Kelly Fraction</span>
                            <span className="font-medium" key={514486}>{profile.kellyFraction}x</span>
                          </div>
                        </div>
                        {!profile.isActive && <button className="modern-button mt-4" key={503706}>Set Active</button>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Active Bets */}
              <div key={241917}>
                <h2 className="text-lg font-bold mb-4" key={518720}>Active Bets</h2>
                {activeBets.length === 0 ? (
                  <div className="text-gray-500 dark:text-gray-400" key={960786}>
                    No active bets.
                  </div>
                ) : (
                  <div className="overflow-x-auto" key={522094}>
                    <table className="modern-table w-full" key={636329}>
                      <thead key={851248}>
                        <tr key={70014}>
                          <th key={221562}>Event</th>
                          <th key={221562}>Stake</th>
                          <th key={221562}>Odds</th>
                          <th key={221562}>Potential Win</th>
                          <th key={221562}>Risk</th>
                          <th key={221562}>Expires At</th>
                        </tr>
                      </thead>
                      <tbody key={453335}>
                        {activeBets.map(bet => (
                          <tr key={bet.id} key={451658}>
                            <td key={212562}>{bet.event}</td>
                            <td key={212562}>${bet.stake}</td>
                            <td key={212562}>{bet.odds}</td>
                            <td key={212562}>${bet.potentialWin}</td>
                            <td className={getRiskColor(bet.risk)} key={812724}>{bet.risk}</td>
                            <td key={212562}>{new Date(bet.expiresAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {/* Modal for creating new profile */}
        {isModalOpen && (
          <div className="modal-backdrop" key={180516}>
            <div className="modal" key={226119}>
              <h2 className="text-lg font-bold mb-4" key={518720}>Create New Profile</h2>
              <CreateProfileForm;
                onSuccess={(profile) = key={267709}> {
                  setProfiles((prev) => [...prev, profile]);
                  setIsModalOpen(false);
                }}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

/**
 * Props for CreateProfileForm modal component.
 */
type CreateProfileFormProps = {
  onSuccess: (profile: RiskProfile) => void;
  onCancel: () => void;
};

/**
 * Modal form for creating a new risk profile.
 * Integrates with /api/risk-profiles endpoint.
 */
const CreateProfileForm: React.FC<CreateProfileFormProps key={692594}> = ({ onSuccess, onCancel }) => {
  const [form, setForm] = React.useState<Omit<RiskProfile, 'id' | 'isActive' key={877228}>>({
    name: '',
    maxStake: 0,
    maxExposure: 0,
    stopLoss: 0,
    takeProfit: 0,
    kellyFraction: 1,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null key={121216}>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement key={553350}>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'name' ? value : Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {

      onSuccess(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError && axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Failed to create profile');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create profile');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" key={188153}>
      <div key={241917}>
        <label className="block text-sm font-medium mb-1" key={200751}>Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="modern-input w-full" required placeholder="Profile Name" title="Profile Name" / key={333434}>
      </div>
      <div className="grid grid-cols-2 gap-4" key={354810}>
        <div key={241917}>
          <label className="block text-sm font-medium mb-1" key={200751}>Max Stake</label>
          <input name="maxStake" type="number" value={form.maxStake} onChange={handleChange} className="modern-input w-full" min={0} required placeholder="Max Stake" title="Max Stake" / key={616111}>
        </div>
        <div key={241917}>
          <label className="block text-sm font-medium mb-1" key={200751}>Max Exposure</label>
          <input name="maxExposure" type="number" value={form.maxExposure} onChange={handleChange} className="modern-input w-full" min={0} required placeholder="Max Exposure" title="Max Exposure" / key={718024}>
        </div>
        <div key={241917}>
          <label className="block text-sm font-medium mb-1" key={200751}>Stop Loss</label>
          <input name="stopLoss" type="number" value={form.stopLoss} onChange={handleChange} className="modern-input w-full" min={0} required placeholder="Stop Loss" title="Stop Loss" / key={274070}>
        </div>
        <div key={241917}>
          <label className="block text-sm font-medium mb-1" key={200751}>Take Profit</label>
          <input name="takeProfit" type="number" value={form.takeProfit} onChange={handleChange} className="modern-input w-full" min={0} required placeholder="Take Profit" title="Take Profit" / key={747806}>
        </div>
        <div key={241917}>
          <label className="block text-sm font-medium mb-1" key={200751}>Kelly Fraction</label>
          <input name="kellyFraction" type="number" value={form.kellyFraction} onChange={handleChange} className="modern-input w-full" min={0.01} step={0.01} required placeholder="Kelly Fraction" title="Kelly Fraction" / key={3152}>
        </div>
      </div>
      {error && <div className="text-red-600 text-sm" key={79448}>{error}</div>}
      <div className="flex gap-2 mt-4" key={396830}>
        <button type="submit" className="modern-button" disabled={submitting} key={998670}>
          {submitting ? 'Creating...' : 'Create'}
        </button>
        <button type="button" className="modern-button" onClick={onCancel} disabled={submitting} key={2862}>
          Cancel;
        </button>
      </div>
    </form>
  );
};


export default RiskManagerPage;
