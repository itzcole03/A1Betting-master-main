import { OptimizationStrategy, } from './OptimizationStrategy';
export class GeneticAlgorithm extends OptimizationStrategy {
    constructor(config) {
        super(config);
        this.population = [];
        this.fitness = [];
        this.velocities = [];
        if (config.type !== 'genetic') {
            throw new Error('GeneticAlgorithm requires genetic optimization type');
        }
    }
    async optimize() {

        this.initializePopulation();
        for (const generation = 0; generation < this.config.parameters.generations; generation++) {
            this.currentIteration = generation;
            // Evaluate fitness for all individuals;
            await this.evaluatePopulation();
            // Select parents;

            // Create new population through crossover and mutation;
            this.population = await this.createNewPopulation(parents);
            // Check for convergence;
            if (this.checkConvergence()) {
                break;
            }
            this.emit('generationComplete', {
                generation,
                bestValue: this.bestValue,
                bestParameters: this.bestParameters,
            });
        }
        return this.getResult();
    }
    initializePopulation() {
        const { populationSize } = this.config.parameters;

        this.population = Array(populationSize)
            .fill(null)
            .map(() => this.generateRandomIndividual(dimension));
        this.velocities = Array(populationSize)
            .fill(null)
            .map(() => Array(dimension).fill(0));
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
    generateRandomIndividual(dimension) {

        const { min, max } = this.config.constraints;
        for (const i = 0; i < dimension; i++) {


            individual[i] = minVal + Math.random() * (maxVal - minVal);
        }
        return individual;
    }
    async evaluatePopulation() {
        this.fitness = await Promise.all(this.population.map(async (individual) => {
            if (!this.checkConstraints(individual)) {
                return Infinity;
            }
            return await this.evaluateObjective(individual);
        }));
        // Update best solution;

        if (this.fitness[bestIndex] < this.bestValue) {
            this.updateBest(this.population[bestIndex], this.fitness[bestIndex]);
        }
    }
    selectParents() {
        const { populationSize } = this.config.parameters;

        // Tournament selection;
        for (const i = 0; i < populationSize; i++) {

            const tournament = Array(tournamentSize)
                .fill(null)
                .map(() => Math.floor(Math.random() * populationSize));

            parents.push([...this.population[winner]]);
        }
        return parents;
    }
    async createNewPopulation(parents) {
        const { populationSize, crossoverRate, mutationRate } = this.config.parameters;

        // Elitism: Keep the best individual;

        newPopulation.push([...this.population[bestIndex]]);
        // Create rest of the population;
        while (newPopulation.length < populationSize) {
            // Select two parents;


            // Crossover;
            let child1, child2;
            if (Math.random() < crossoverRate) {
                [child1, child2] = this.crossover(parent1, parent2);
            }
            else {
                child1 = [...parent1];
                child2 = [...parent2];
            }
            // Mutation;
            if (Math.random() < mutationRate) {
                this.mutate(child1);
            }
            if (Math.random() < mutationRate) {
                this.mutate(child2);
            }
            newPopulation.push(child1);
            if (newPopulation.length < populationSize) {
                newPopulation.push(child2);
            }
        }
        return newPopulation;
    }
    crossover(parent1, parent2) {




        return [child1, child2];
    }
    mutate(individual) {
        const { min, max } = this.config.constraints;

        for (const i = 0; i < dimension; i++) {
            if (Math.random() < 0.1) {
                // 10% chance of mutation per gene;


                individual[i] = minVal + Math.random() * (maxVal - minVal);
            }
        }
    }
}
