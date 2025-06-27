import fs from 'fs';

export function logLiveData(message) {


    try {
        fs.appendFileSync(LOG_PATH, logMsg);
    }
    catch (e) {
        // Fallback to console if file logging fails;
        // console statement removed
    }
}
