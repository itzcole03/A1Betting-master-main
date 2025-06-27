class Scheduler {
    constructor() {
        this.jobs = new Map();
    }
    schedule(id, job, interval) {
        this.cancel(id);
        const scheduledJob = {
            id,
            job,
            interval,
            running: false,
        };
        scheduledJob.timer = setInterval(async () => {
            if (scheduledJob.running)
                return;
            scheduledJob.running = true;
            try {
                await job();
            }
            catch (err) {
                // console statement removed
            }
            finally {
                scheduledJob.running = false;
            }
        }, interval);
        this.jobs.set(id, scheduledJob);
    }
    cancel(id) {

        if (job && job.timer) {
            clearInterval(job.timer);
            this.jobs.delete(id);
        }
    }
    cancelAll() {
        Array.from(this.jobs.keys()).forEach(id => this.cancel(id));
    }
    isScheduled(id) {
        return this.jobs.has(id);
    }
}
export const scheduler = new Scheduler();
