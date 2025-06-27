# Backend Performance Profiling Report

**Generated:** 2025-06-27T09:46:59.639939

## Summary

- **Total Profiles:** 5
- **Successful:** 5
- **Failed:** 0
- **Success Rate:** 100.0%

## Key Performance Metrics

### Startup Performance
- **Cold start (fresh process):** 13.755s
- **Warm start (cached imports):** 10.325s
- **Production mode startup:** 10.342s

### Memory Usage
- **System Memory Usage:** 60.5%
- **Process Memory:** 21.1 MB

## Performance Recommendations

- Optimize cold_start: 13.75s startup time is too slow
- Optimize warm_start: 10.33s startup time is too slow
- Optimize production_mode: 10.34s startup time is too slow
- Investigate potential memory leaks detected during profiling

