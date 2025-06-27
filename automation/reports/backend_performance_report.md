# Backend Performance Profiling Report

**Generated:** 2025-06-27T10:14:54.910455

## Summary

- **Total Profiles:** 5
- **Successful:** 5
- **Failed:** 0
- **Success Rate:** 100.0%

## Key Performance Metrics

### Startup Performance
- **Cold start (fresh process):** 11.023s
- **Warm start (cached imports):** 10.894s
- **Production mode startup:** 10.607s

### Memory Usage
- **System Memory Usage:** 60.8%
- **Process Memory:** 21.1 MB

## Performance Recommendations

- Optimize cold_start: 11.02s startup time is too slow
- Optimize warm_start: 10.89s startup time is too slow
- Optimize production_mode: 10.61s startup time is too slow
- Investigate potential memory leaks detected during profiling

