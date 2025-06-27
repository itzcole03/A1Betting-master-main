import {
  OptimizationStrategy,
  OptimizationConfig,
  OptimizationResult,
} from './OptimizationStrategy.ts';

export class GeneticAlgorithm extends OptimizationStrategy {
  private population: number[][] = [];
  private fitness: number[] = [];
  private velocities: number[][] = [];

  constructor(config: OptimizationConfig) {
    super(config);
    if (config.type !== 'genetic') {
      throw new Error('GeneticAlgorithm requires genetic optimization type');
    }
  }

  public async optimize(): Promise<OptimizationResult> {

    this.initializePopulation();

    for (const generation = 0; generation < this.config.parameters.generations!; generation++) {
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

  private initializePopulation(): void {
    const { populationSize } = this.config.parameters;

    this.population = Array(populationSize)
      .fill(null)
      .map(() => this.generateRandomIndividual(dimension));

    this.velocities = Array(populationSize)
      .fill(null)
      .map(() => Array(dimension).fill(0));
  }

  private getDimension(): number {
    if (this.config.constraints?.min) {
      return this.config.constraints.min.length;
    }
    if (this.config.constraints?.max) {
      return this.config.constraints.max.length;
    }
    throw new Error('Cannot determine parameter dimension from constraints');
  }

  private generateRandomIndividual(dimension: number): number[] {

    const { min, max } = this.config.constraints!;

    for (const i = 0; i < dimension; i++) {


      individual[i] = minVal + Math.random() * (maxVal - minVal);
    }

    return individual;
  }

  private async evaluatePopulation(): Promise<void> {
    this.fitness = await Promise.all(
      this.population.map(async individual => {
        if (!this.checkConstraints(individual)) {
          return Infinity;
        }
        return await this.evaluateObjective(individual);
      })
    );

    // Update best solution;

    if (this.fitness[bestIndex] < this.bestValue) {
      this.updateBest(this.population[bestIndex], this.fitness[bestIndex]);
    }
  }

  private selectParents(): number[][] {
    const { populationSize } = this.config.parameters;
    const parents: number[][] = [];

    // Tournament selection;
    for (const i = 0; i < populationSize; i++) {

      const tournament = Array(tournamentSize)
        .fill(null)
        .map(() => Math.floor(Math.random() * populationSize));

      const winner = tournament.reduce((best, current) =>
        this.fitness[current] < this.fitness[best] ? current : best;
      );

      parents.push([...this.population[winner]]);
    }

    return parents;
  }

  private async createNewPopulation(parents: number[][]): Promise<number[][]> {
    const { populationSize, crossoverRate, mutationRate } = this.config.parameters;
    const newPopulation: number[][] = [];

    // Elitism: Keep the best individual;

    newPopulation.push([...this.population[bestIndex]]);

    // Create rest of the population;
    while (newPopulation.length < populationSize) {
      // Select two parents;


      // Crossover;
      let child1: number[], child2: number[];
      if (Math.random() < crossoverRate!) {
        [child1, child2] = this.crossover(parent1, parent2);
      } else {
        child1 = [...parent1];
        child2 = [...parent2];
      }

      // Mutation;
      if (Math.random() < mutationRate!) {
        this.mutate(child1);
      }
      if (Math.random() < mutationRate!) {
        this.mutate(child2);
      }

      newPopulation.push(child1);
      if (newPopulation.length < populationSize) {
        newPopulation.push(child2);
      }
    }

    return newPopulation;
  }

  private crossover(parent1: number[], parent2: number[]): [number[], number[]] {


    return [child1, child2];
  }

  private mutate(individual: number[]): void {
    const { min, max } = this.config.constraints!;

    for (const i = 0; i < dimension; i++) {
      if (Math.random() < 0.1) {
        // 10% chance of mutation per gene;


        individual[i] = minVal + Math.random() * (maxVal - minVal);
      }
    }
  }
}
