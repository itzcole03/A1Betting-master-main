import { OptimizationStrategy, } from './OptimizationStrategy';
export class ParticleSwarm extends OptimizationStrategy {
    constructor(config) {
        super(config);
        this.particles = [];
        this.velocities = [];
        this.personalBests = [];
        this.personalBestValues = [];
        this.globalBest = [];
        this.globalBestValue = Infinity;
        if (config.type !== 'particleSwarm') {
            throw new Error('ParticleSwarm requires particleSwarm optimization type');
        }
    }
    async optimize() {

        this.initializeSwarm();

        for (const iteration = 0; iteration < maxIterations; iteration++) {
            this.currentIteration = iteration;
            // Update particles;
            await this.updateParticles();
            // Check for convergence;
            if (this.checkConvergence()) {
                break;
            }
            this.emit('iterationComplete', {
                iteration,
                bestValue: this.bestValue,
                bestParameters: this.bestParameters,
            });
        }
        return this.getResult();
    }
    initializeSwarm() {
        const { populationSize } = this.config.parameters;

        // Initialize particles;
        this.particles = Array(populationSize)
            .fill(null)
            .map(() => this.generateRandomParticle(dimension));
        // Initialize velocities;
        this.velocities = Array(populationSize)
            .fill(null)
            .map(() => Array(dimension).fill(0));
        // Initialize personal bests;
        this.personalBests = this.particles.map(p => [...p]);
        this.personalBestValues = Array(populationSize).fill(Infinity);
        // Initialize global best;
        this.globalBest = [...this.particles[0]];
        this.globalBestValue = Infinity;
    }
    getDimension() {
        if (this.config.constraints?.min) {
            return this.config.constraints.min.length;
        }
        if (this.config.constraints?.max) {
            return this.config.constraints.max.length;
        }
        throw new Error('Cannot determine parameter dimension from constraints');
    }
    generateRandomParticle(dimension) {

        const { min, max } = this.config.constraints;
        for (const i = 0; i < dimension; i++) {


            particle[i] = minVal + Math.random() * (maxVal - minVal);
        }
        return particle;
    }
    async updateParticles() {
        const { populationSize } = this.config.parameters;
        const { inertiaWeight, cognitiveWeight, socialWeight } = this.config.parameters;
        for (const i = 0; i < populationSize; i++) {
            // Update velocity;
            for (const j = 0; j < this.particles[i].length; j++) {


                this.velocities[i][j] =
                    inertiaWeight * this.velocities[i][j] +
                        cognitiveWeight * r1 * (this.personalBests[i][j] - this.particles[i][j]) +
                        socialWeight * r2 * (this.globalBest[j] - this.particles[i][j]);
            }
            // Update position;
            for (const j = 0; j < this.particles[i].length; j++) {
                this.particles[i][j] += this.velocities[i][j];
                // Apply bounds;
                const { min, max } = this.config.constraints;
                if (min) {
                    this.particles[i][j] = Math.max(this.particles[i][j], min[j]);
                }
                if (max) {
                    this.particles[i][j] = Math.min(this.particles[i][j], max[j]);
                }
            }
            // Evaluate new position;
            if (this.checkConstraints(this.particles[i])) {

                // Update personal best;
                if (value < this.personalBestValues[i]) {
                    this.personalBestValues[i] = value;
                    this.personalBests[i] = [...this.particles[i]];
                    // Update global best;
                    if (value < this.globalBestValue) {
                        this.globalBestValue = value;
                        this.globalBest = [...this.particles[i]];
                        this.updateBest(this.particles[i], value);
                    }
                }
            }
        }
    }
    checkConvergence() {
        if (this.history.length < 10) {
            return false;
        }
        // Check if particles have converged to a small region;




        return avgVariance < 1e-6 || valueConvergence;
    }
    calculatePositionVariances() {


        for (const j = 0; j < dimension; j++) {



            variances.push(variance);
        }
        return variances;
    }
}
