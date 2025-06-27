import fs from 'fs.ts';

export function logLiveData(message: string) {


  try {
    fs.appendFileSync(LOG_PATH, logMsg);
  } catch (e) {
    // Fallback to console if file logging fails;
    // console statement removed
  }
}
