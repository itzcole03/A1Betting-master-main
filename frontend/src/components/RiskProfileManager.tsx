import React from 'react.ts';
import { useRiskProfile } from '@/hooks/useRiskProfile.ts';
import { RiskLevel } from '@/types/money-maker.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.ts';
import { Slider } from '@/components/ui/slider.ts';
import { Label } from '@/components/ui/label.ts';
import { Switch } from '@/components/ui/switch.ts';

export function RiskProfileManager() {
  const { riskProfile, updateRiskProfile, setRiskLevel } = useRiskProfile();

  const handleRiskLevelChange = (value: string) => {
    setRiskLevel(value as RiskLevel);
  };

  const handleSliderChange = (key: keyof typeof riskProfile, value: number[]) => {
    updateRiskProfile({ [key]: value[0] });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" key={613295}>
      <CardHeader key={236869}>
        <CardTitle key={202979}>Risk Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6" key={853847}>
        <div className="space-y-2" key={725977}>
          <Label key={956343}>Risk Level</Label>
          <Select value={riskProfile.level} onValueChange={handleRiskLevelChange} key={33451}>
            <SelectTrigger key={438990}>
              <SelectValue placeholder="Select risk level" / key={346891}>
            </SelectTrigger>
            <SelectContent key={24083}>
              <SelectItem value="low" key={986066}>Low Risk</SelectItem>
              <SelectItem value="medium" key={632176}>Medium Risk</SelectItem>
              <SelectItem value="high" key={157655}>High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2" key={725977}>
          <Label key={956343}>Maximum Stake Percentage</Label>
          <Slider;
            max={10}
            min={0.1}
            step={0.1}
            value={[riskProfile.maxStakePercentage]}
            onValueChange={value = key={1481}> handleSliderChange('maxStakePercentage', value)}
          />
          <div className="text-sm text-muted-foreground" key={384606}>
            {riskProfile.maxStakePercentage}% of bankroll;
          </div>
        </div>

        <div className="space-y-2" key={725977}>
          <Label key={956343}>Minimum Confidence</Label>
          <Slider;
            max={95}
            min={50}
            step={1}
            value={[riskProfile.minConfidence * 100]}
            onValueChange={value = key={912319}> handleSliderChange('minConfidence', [value[0] / 100])}
          />
          <div className="text-sm text-muted-foreground" key={384606}>
            {Math.round(riskProfile.minConfidence * 100)}%
          </div>
        </div>

        <div className="space-y-2" key={725977}>
          <Label key={956343}>Maximum Kelly Fraction</Label>
          <Slider;
            max={50}
            min={5}
            step={1}
            value={[riskProfile.maxKellyFraction * 100]}
            onValueChange={value = key={318213}> handleSliderChange('maxKellyFraction', [value[0] / 100])}
          />
          <div className="text-sm text-muted-foreground" key={384606}>
            {Math.round(riskProfile.maxKellyFraction * 100)}%
          </div>
        </div>

        <div className="space-y-2" key={725977}>
          <Label key={956343}>Stop Loss</Label>
          <Slider;
            max={20}
            min={1}
            step={1}
            value={[riskProfile.stopLossPercentage]}
            onValueChange={value = key={848437}> handleSliderChange('stopLossPercentage', value)}
          />
          <div className="text-sm text-muted-foreground" key={384606}>
            {riskProfile.stopLossPercentage}% of bankroll;
          </div>
        </div>

        <div className="space-y-2" key={725977}>
          <Label key={956343}>Take Profit</Label>
          <Slider;
            max={50}
            min={5}
            step={1}
            value={[riskProfile.takeProfitPercentage]}
            onValueChange={value = key={438561}> handleSliderChange('takeProfitPercentage', value)}
          />
          <div className="text-sm text-muted-foreground" key={384606}>
            {riskProfile.takeProfitPercentage}% of bankroll;
          </div>
        </div>

        <div className="space-y-4" key={160407}>
          <h3 className="text-lg font-medium" key={767483}>Diversification Rules</h3>

          <div className="space-y-2" key={725977}>
            <Label key={956343}>Maximum Bets per Sport</Label>
            <Slider;
              max={5}
              min={1}
              step={1}
              value={[riskProfile.diversificationRules.maxBetsPerSport]}
              onValueChange={value = key={843317}>
                updateRiskProfile({
                  diversificationRules: {
                    ...riskProfile.diversificationRules,
                    maxBetsPerSport: value[0],
                  },
                })
              }
            />
            <div className="text-sm text-muted-foreground" key={384606}>
              {riskProfile.diversificationRules.maxBetsPerSport} bets;
            </div>
          </div>

          <div className="space-y-2" key={725977}>
            <Label key={956343}>Maximum Bets per Market</Label>
            <Slider;
              max={3}
              min={1}
              step={1}
              value={[riskProfile.diversificationRules.maxBetsPerMarket]}
              onValueChange={value = key={15118}>
                updateRiskProfile({
                  diversificationRules: {
                    ...riskProfile.diversificationRules,
                    maxBetsPerMarket: value[0],
                  },
                })
              }
            />
            <div className="text-sm text-muted-foreground" key={384606}>
              {riskProfile.diversificationRules.maxBetsPerMarket} bets;
            </div>
          </div>

          <div className="space-y-2" key={725977}>
            <Label key={956343}>Maximum Exposure per Event</Label>
            <Slider;
              max={15}
              min={1}
              step={1}
              value={[riskProfile.diversificationRules.maxExposurePerEvent]}
              onValueChange={value = key={865761}>
                updateRiskProfile({
                  diversificationRules: {
                    ...riskProfile.diversificationRules,
                    maxExposurePerEvent: value[0],
                  },
                })
              }
            />
            <div className="text-sm text-muted-foreground" key={384606}>
              {riskProfile.diversificationRules.maxExposurePerEvent}% of bankroll;
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
