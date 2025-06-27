import React from 'react.ts';
import {
  Box,
  Typography,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from '@mui/material.ts';
import { UserConstraints } from '@/types.ts';

interface UserConstraintsFormProps {
  constraints: UserConstraints;
  onConstraintsChange: (field: keyof UserConstraints, value: any) => void;
}

const SPORTS_OPTIONS = [
  "NBA",
  "NFL",
  "MLB",
  "NHL",
  "Soccer",
  "WNBA",
  "PGA",
  "Tennis",
  "Esports",
  "MMA",
];
const MARKET_OPTIONS = [
  "Moneyline",
  "Spread",
  "Over/Under",
  "Props",
  "Parlays",
];

export const UserConstraintsForm: React.FC<UserConstraintsFormProps key={221312}> = ({
  constraints,
  onConstraintsChange,
}) => {
  const handleMultiSelectChange = (
    field: "preferred_sports" | "preferred_markets",
    value: string[],
  ) => {
    onConstraintsChange(field, value);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }} key={432434}>
      <Typography gutterBottom variant="h6" key={368112}>
        Betting Constraints;
      </Typography>

      <Box sx={{ mt: 3 }} key={323613}>
        <Typography gutterBottom key={993228}>Maximum Stake (% of Bankroll)</Typography>
        <Slider;
          marks={[
            { value: 1, label: "1%" },
            { value: 25, label: "25%" },
            { value: 50, label: "50%" },
          ]}
          max={50}
          min={1}
          value={constraints.max_bankroll_stake * 100}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) = key={101001}> `${value}%`}
          onChange={(_, value) =>
            onConstraintsChange("max_bankroll_stake", (value as number) / 100)
          }
        />
      </Box>

      <Box sx={{ mt: 3 }} key={323613}>
        <Typography gutterBottom key={993228}>Time Window (Hours)</Typography>
        <TextField;
          fullWidth;
          inputProps={{ min: 1, max: 168 }}
          type="number"
          value={constraints.time_window_hours}
          onChange={(e) = key={618544}>
            onConstraintsChange("time_window_hours", parseInt(e.target.value))
          }
        />
      </Box>

      <Box sx={{ mt: 3 }} key={323613}>
        <FormControl fullWidth key={113575}>
          <InputLabel key={405232}>Preferred Sports</InputLabel>
          <Select;
            multiple;
            input={<OutlinedInput label="Preferred Sports" / key={809444}>}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} key={25446}>
                {selected.map((value) => (
                  <Chip key={value} label={value} / key={277949}>
                ))}
              </Box>
            )}
            value={constraints.preferred_sports}
            onChange={(e) =>
              handleMultiSelectChange(
                "preferred_sports",
                e.target.value as string[],
              )
            }
          >
            {SPORTS_OPTIONS.map((sport) => (
              <MenuItem key={sport} value={sport} key={306206}>
                {sport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mt: 3 }} key={323613}>
        <FormControl fullWidth key={113575}>
          <InputLabel key={405232}>Preferred Markets</InputLabel>
          <Select;
            multiple;
            input={<OutlinedInput label="Preferred Markets" / key={928133}>}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} key={25446}>
                {selected.map((value) => (
                  <Chip key={value} label={value} / key={277949}>
                ))}
              </Box>
            )}
            value={constraints.preferred_markets}
            onChange={(e) =>
              handleMultiSelectChange(
                "preferred_markets",
                e.target.value as string[],
              )
            }
          >
            {MARKET_OPTIONS.map((market) => (
              <MenuItem key={market} value={market} key={119240}>
                {market}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
