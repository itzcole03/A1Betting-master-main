import React, { useState, useEffect  } from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Tooltip,
  CircularProgress,
} from '@mui/material.ts';
import { styled } from '@mui/material/styles.ts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  FilterList as FilterListIcon,
  Info as InfoIcon,
} from '@mui/icons-material.ts';
import { riskManagement } from '@/services/riskManagement.ts';

const HistoryCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

interface Bet {
  id: string;
  recommendationId: string;
  amount: number;
  type: 'straight' | 'parlay' | 'teaser';
  odds: number;
  timestamp: number;
  status: 'pending' | 'won' | 'lost';
  payout?: number;
}

type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof Bet;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'timestamp', label: 'Date', numeric: false },
  { id: 'type', label: 'Type', numeric: false },
  { id: 'recommendationId', label: 'Recommendation', numeric: false },
  { id: 'odds', label: 'Odds', numeric: true },
  { id: 'amount', label: 'Amount', numeric: true },
  { id: 'payout', label: 'Payout', numeric: true },
  { id: 'status', label: 'Status', numeric: false },
];

const filterOptions = {
  type: ['Single', 'Parlay', 'Teaser', 'Prop'],
  status: ['pending', 'won', 'lost'] as const,
};

export const BettingHistory: React.FC = () => {
  const [bets, setBets] = useState<Bet[] key={848729}>([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order key={437301}>('desc');
  const [orderBy, setOrderBy] = useState<keyof Bet key={471958}>('timestamp');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
  });

  useEffect(() => {
    const loadBets = async () => {
      setLoading(true);
      try {

        setBets(userBets);
      } catch (error) {
        // console statement removed
      } finally {
        setLoading(false);
      }
    };

    loadBets();
  }, []);

  const handleRequestSort = (property: keyof Bet) => {

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement key={553350}>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusColor = (status: Bet['status']) => {
    switch (status) {
      case 'won':
        return 'success';
      case 'lost':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const filteredBets = bets.filter(bet => {
    return (
      (filters.type === '' || bet.type === filters.type) &&
      (filters.status === '' || bet.status === filters.status)
    );
  });

  const sortedBets = filteredBets.sort((a, b) => {

    if (orderBy === 'timestamp') {
      return isAsc;
        ? a.timestamp - b.timestamp;
        : b.timestamp - a.timestamp;
    }
    if (orderBy === 'odds' || orderBy === 'amount' || orderBy === 'payout') {
      return isAsc;
        ? (a[orderBy] || 0) - (b[orderBy] || 0)
        : (b[orderBy] || 0) - (a[orderBy] || 0);
    }
    return isAsc;
      ? String(a[orderBy]).localeCompare(String(b[orderBy]))
      : String(b[orderBy]).localeCompare(String(a[orderBy]));
  });

  const paginatedBets = sortedBets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage;
  );

  const winRate = filteredBets.length > 0;
    ? (filteredBets.filter(bet => bet.status === 'won').length / filteredBets.length) * 100;
    : 0;


  return (
    <Box sx={{ width: '100%' }} key={100658}>
      <HistoryCard key={503245}>
        <CardContent key={452065}>
          <Typography variant="h6" gutterBottom key={90207}>
            Betting History;
          </Typography>

          {/* Filters */}
          <Grid container spacing={2} sx={{ mb: 3 }} key={482082}>
            <Grid item xs={12} sm={6} md={3} key={214380}>
              <TextField;
                select;
                fullWidth;
                label="Bet Type"
                value={filters.type}
                onChange={(e) = key={666365}> handleFilterChange('type', e.target.value)}
              >
                <MenuItem value="" key={56650}>All</MenuItem>
                {filterOptions.type.map((type) => (
                  <MenuItem key={type} value={type} key={272222}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3} key={214380}>
              <TextField;
                select;
                fullWidth;
                label="Status"
                value={filters.status}
                onChange={(e) = key={236663}> handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="" key={56650}>All</MenuItem>
                {filterOptions.status.map((status) => (
                  <MenuItem key={status} value={status} key={878480}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Summary Stats */}
          <Grid container spacing={2} sx={{ mb: 3 }} key={482082}>
            <Grid item xs={12} sm={6} md={3} key={214380}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }} key={584946}>
                <Typography variant="subtitle2" color="textSecondary" key={270974}>
                  Total Bets;
                </Typography>
                <Typography variant="h6" key={93421}>
                  {filteredBets.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3} key={214380}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }} key={584946}>
                <Typography variant="subtitle2" color="textSecondary" key={270974}>
                  Win Rate;
                </Typography>
                <Typography variant="h6" key={93421}>
                  {winRate.toFixed(1)}%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3} key={214380}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }} key={584946}>
                <Typography variant="subtitle2" color="textSecondary" key={270974}>
                  Total Amount;
                </Typography>
                <Typography variant="h6" key={93421}>
                  {formatCurrency(totalAmount)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3} key={214380}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }} key={584946}>
                <Typography variant="subtitle2" color="textSecondary" key={270974}>
                  Total Payout;
                </Typography>
                <Typography variant="h6" key={93421}>
                  {formatCurrency(totalPayout)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Betting History Table */}
          <TableContainer key={611233}>
            <Table key={889668}>
              <TableHead key={813147}>
                <TableRow key={300096}>
                  {headCells.map((headCell) => (
                    <TableCell;
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      sortDirection={orderBy === headCell.id ? order : false}
                     key={33666}>
                      <TableSortLabel;
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={() = key={226188}> handleRequestSort(headCell.id)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody key={923191}>
                {loading ? (
                  <TableRow key={300096}>
                    <TableCell colSpan={headCells.length} align="center" key={457293}>
                      <CircularProgress / key={730118}>
                    </TableCell>
                  </TableRow>
                ) : paginatedBets.length === 0 ? (
                  <TableRow key={300096}>
                    <TableCell colSpan={headCells.length} align="center" key={457293}>
                      No bets found;
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBets.map((bet) => (
                    <TableRow key={bet.id} key={143269}>
                      <TableCell key={942983}>{formatDate(bet.timestamp)}</TableCell>
                      <TableCell key={942983}>{bet.type}</TableCell>
                      <TableCell key={942983}>{bet.recommendationId}</TableCell>
                      <TableCell align="right" key={741903}>{bet.odds}</TableCell>
                      <TableCell align="right" key={741903}>{formatCurrency(bet.amount)}</TableCell>
                      <TableCell align="right" key={741903}>
                        {bet.payout ? formatCurrency(bet.payout) : '-'}
                      </TableCell>
                      <TableCell key={942983}>
                        <Chip;
                          label={bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                          color={getStatusColor(bet.status)}
                          size="small"
                        / key={589899}>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination;
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredBets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          / key={442735}>
        </CardContent>
      </HistoryCard>
    </Box>
  );
}; 