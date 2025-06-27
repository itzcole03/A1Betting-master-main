import React from 'react.ts';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material.ts';

export const SkeletonLoader: React.FC = () => {
  return (
    <Box sx={{ p: 3 }} key={486541}>
      <Grid container spacing={3} key={459826}>
        {/* Header Skeleton */}
        <Grid item xs={12} key={689816}>
          <Card key={650115}>
            <CardContent key={452065}>
              <Skeleton height={40} variant="text" width="40%" / key={322758}>
              <Skeleton height={40} sx={{ mt: 2 }} variant="rectangular" / key={802253}>
            </CardContent>
          </Card>
        </Grid>

        {/* Filter Bar Skeleton */}
        <Grid item xs={12} key={689816}>
          <Box sx={{ display: 'flex', gap: 2 }} key={205992}>
            <Skeleton height={56} variant="rectangular" width={200} / key={766762}>
            <Skeleton height={56} variant="rectangular" width={200} / key={766762}>
            <Skeleton height={56} variant="rectangular" width="100%" / key={113969}>
          </Box>
        </Grid>

        {/* Main Content Skeleton */}
        <Grid item md={8} xs={12} key={725322}>
          <Card key={650115}>
            <CardContent key={452065}>
              <Skeleton height={32} variant="text" width="30%" / key={960894}>
              <Grid container spacing={2} sx={{ mt: 2 }} key={95587}>
                {[1, 2, 3, 4].map(index => (
                  <Grid key={index} item sm={6} xs={12} key={219009}>
                    <Card key={650115}>
                      <CardContent key={452065}>
                        <Skeleton variant="text" width="60%" / key={884479}>
                        <Skeleton variant="text" width="40%" / key={868871}>
                        <Skeleton variant="text" width="80%" / key={759876}>
                        <Box sx={{ mt: 2 }} key={337181}>
                          <Skeleton height={36} variant="rectangular" / key={543911}>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar Stats Skeleton */}
        <Grid item md={4} xs={12} key={317197}>
          <Grid container spacing={2} key={272161}>
            <Grid item xs={12} key={689816}>
              <Card key={650115}>
                <CardContent key={452065}>
                  <Skeleton height={32} variant="text" width="40%" / key={263231}>
                  <Grid container spacing={2} sx={{ mt: 2 }} key={95587}>
                    {[1, 2, 3, 4].map(index => (
                      <Grid key={index} item xs={6} key={304094}>
                        <Skeleton height={100} variant="rectangular" / key={811737}>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} key={689816}>
              <Card key={650115}>
                <CardContent key={452065}>
                  <Skeleton height={32} variant="text" width="40%" / key={263231}>
                  <Skeleton height={300} sx={{ mt: 2 }} variant="rectangular" / key={884098}>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
