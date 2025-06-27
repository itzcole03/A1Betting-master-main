import React from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material.ts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  LocalFireDepartment as FireIcon,
  EmojiEvents as TrophyIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from '@mui/icons-material.ts';
import { styled } from '@mui/material/styles.ts';

interface TrendingProp {
  id: string;
  playerName: string;
  team: string;
  propType: string;
  value: number;
  direction: 'over' | 'under';
  modifier?: 'goblin' | 'devil';
  confidence: number;
  fireCount: number;
  communityStats: {
    likes: number;
    comments: number;
    shares: number;
  };
  topComment?: {
    user: string;
    avatar?: string;
    text: string;
    likes: number;
  };
}

interface TrendingPropsProps {
  props: TrendingProp[];
  onPropSelect: (propId: string) => void;
}

const TrendingCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const ConfidenceBar = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  borderRadius: 2,
  marginTop: theme.spacing(0.5),
}));

export const TrendingProps: React.FC<TrendingPropsProps key={571331}> = ({ props, onPropSelect }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'success.main';
    if (confidence >= 60) return 'primary.main';
    if (confidence >= 40) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box key={485947}>
      <Typography gutterBottom variant="h6" key={368112}>
        Trending Props;
      </Typography>
      <Grid container spacing={2} key={272161}>
        {props.map(prop => (
          <Grid key={prop.id} item xs={12} key={312272}>
            <TrendingCard key={107131}>
              <CardContent key={452065}>
                <Grid container spacing={2} key={272161}>
                  {/* Header */}
                  <Grid item xs={12} key={689816}>
                    <Box alignItems="center" display="flex" justifyContent="space-between" key={273022}>
                      <Typography variant="h6" key={93421}>{prop.playerName}</Typography>
                      <Box alignItems="center" display="flex" gap={1} key={110385}>
                        <FireIcon color="error" / key={63511}>
                        <Typography color="error" variant="h6" key={692807}>
                          {prop.fireCount}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography color="textSecondary" variant="body2" key={603568}>
                      {prop.team} • {prop.propType}
                    </Typography>
                  </Grid>

                  {/* Prop Details */}
                  <Grid item xs={12} key={689816}>
                    <Box;
                      sx={{
                        p: 2,
                        bgcolor: 'action.hover',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                     key={79886}>
                      <Grid container spacing={2} key={272161}>
                        <Grid item xs={6} key={823052}>
                          <Typography color="textSecondary" variant="body2" key={603568}>
                            Line;
                          </Typography>
                          <Typography variant="h6" key={93421}>{prop.value}</Typography>
                        </Grid>
                        <Grid item xs={6} key={823052}>
                          <Typography color="textSecondary" variant="body2" key={603568}>
                            Direction;
                          </Typography>
                          <Box alignItems="center" display="flex" gap={1} key={110385}>
                            {prop.direction === 'over' ? (
                              <TrendingUpIcon color="success" / key={63688}>
                            ) : (
                              <TrendingDownIcon color="error" / key={588136}>
                            )}
                            <Typography;
                              color={prop.direction === 'over' ? 'success.main' : 'error.main'}
                              variant="h6"
                             key={877713}>
                              {prop.direction.toUpperCase()}
                            </Typography>
                            {prop.modifier && (
                              <Chip;
                                color={prop.modifier === 'goblin' ? 'success' : 'error'}
                                label={prop.modifier}
                                size="small"
                              / key={373520}>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  {/* Confidence */}
                  <Grid item xs={12} key={689816}>
                    <Box alignItems="center" display="flex" justifyContent="space-between" key={273022}>
                      <Typography color="textSecondary" variant="body2" key={603568}>
                        Community Confidence;
                      </Typography>
                      <Typography color={getConfidenceColor(prop.confidence)} variant="body1" key={929169}>
                        {prop.confidence}%
                      </Typography>
                    </Box>
                    <ConfidenceBar;
                      sx={{
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getConfidenceColor(prop.confidence),
                        },
                      }}
                      value={prop.confidence}
                      variant="determinate"
                    / key={831342}>
                  </Grid>

                  {/* Community Stats */}
                  <Grid item xs={12} key={689816}>
                    <Box display="flex" gap={2} key={246360}>
                      <Tooltip title="Likes" key={627449}>
                        <Box alignItems="center" display="flex" gap={0.5} key={898594}>
                          <ThumbUpIcon fontSize="small" / key={969903}>
                          <Typography variant="body2" key={679167}>{prop.communityStats.likes}</Typography>
                        </Box>
                      </Tooltip>
                      <Tooltip title="Comments" key={716245}>
                        <Box alignItems="center" display="flex" gap={0.5} key={898594}>
                          <CommentIcon fontSize="small" / key={33845}>
                          <Typography variant="body2" key={679167}>{prop.communityStats.comments}</Typography>
                        </Box>
                      </Tooltip>
                      <Tooltip title="Shares" key={600914}>
                        <Box alignItems="center" display="flex" gap={0.5} key={898594}>
                          <ShareIcon fontSize="small" / key={997102}>
                          <Typography variant="body2" key={679167}>{prop.communityStats.shares}</Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Grid>

                  {/* Top Comment */}
                  {prop.topComment && (
                    <Grid item xs={12} key={689816}>
                      <Box;
                        sx={{
                          p: 1,
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                       key={587776}>
                        <Box alignItems="center" display="flex" gap={1} mb={1} key={873504}>
                          <Avatar;
                            alt={prop.topComment.user}
                            src={prop.topComment.avatar}
                            sx={{ width: 24, height: 24 }}
                          / key={753448}>
                          <Typography fontWeight="bold" variant="body2" key={982928}>
                            {prop.topComment.user}
                          </Typography>
                        </Box>
                        <Typography variant="body2" key={679167}>{prop.topComment.text}</Typography>
                        <Box alignItems="center" display="flex" gap={0.5} mt={1} key={602409}>
                          <ThumbUpIcon color="action" fontSize="small" / key={195707}>
                          <Typography color="textSecondary" variant="caption" key={706698}>
                            {prop.topComment.likes}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </TrendingCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
