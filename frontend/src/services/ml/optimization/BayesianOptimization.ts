import {
  OptimizationStrategy,
  OptimizationConfig,
  OptimizationResult,
} from './OptimizationStrategy.ts';
import { GaussianProcess } from '@/models/GaussianProcess.ts';

export class BayesianOptimization extends OptimizationStrategy {
  private gp: GaussianProcess;
  private observedPoints: number[][] = [];
  private observedValues: number[] = [];
  private acquisitionFunction: (mean: number, std: number) => number;

  constructor(config: OptimizationConfig) {
    super(config);
    if (config.type !== 'bayesian') {
      throw new Error('BayesianOptimization requires bayesian optimization type');
    }

    // Initialize Gaussian Process;
    this.gp = new GaussianProcess({
      kernel: config.parameters.kernel!,
      noise: 1e-6,
    });

    // Set up acquisition function;
    this.acquisitionFunction = this.getAcquisitionFunction(config.parameters.acquisitionFunction!);
  }

  public async optimize(): Promise<OptimizationResult> {

    this.initializeRandomPoints();

    for (const iteration = 0; iteration < maxIterations; iteration++) {
      this.currentIteration = iteration;

      // Update Gaussian Process;
      this.gp.fit(this.observedPoints, this.observedValues);

      // Find next point to evaluate;

      // Evaluate the point;
      if (this.checkConstraints(nextPoint)) {

        // Update observed points and values;
        this.observedPoints.push(nextPoint);
        this.observedValues.push(value);

        // Update best solution if needed;
        if (value < this.bestValue) {
          this.updateBest(nextPoint, value);
        }
      }

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

  private initializeRandomPoints(): void {


    for (const i = 0; i < numInitialPoints; i++) {

      if (this.checkConstraints(point)) {
        this.evaluateObjective(point).then(value => {
          this.observedPoints.push(point);
          this.observedValues.push(value);
          if (value < this.bestValue) {
            this.updateBest(point, value);
          }
        });
      }
    }
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

  private generateRandomPoint(dimension: number): number[] {

    const { min, max } = this.config.constraints!;

    for (const i = 0; i < dimension; i++) {


      point[i] = minVal + Math.random() * (maxVal - minVal);
    }

    return point;
  }

  private getAcquisitionFunction(type: 'ucb' | 'ei' | 'pi'): (mean: number, std: number) => number {
    switch (type) {
      case 'ucb':
        return (mean: number, std: number) => mean - 2 * std; // Lower confidence bound;
      case 'ei':
        return (mean: number, std: number) => {


          return (bestValue - mean) * this.normalCDF(z) + std * this.normalPDF(z);
        };
      case 'pi':
        return (mean: number, std: number) => {


          return this.normalCDF(z);
        };
      default:
        throw new Error(`Unknown acquisition function type: ${type}`);
    }
  }

  private findNextPoint(): number[] {


    let bestPoint: number[] = [];
    const bestAcquisition = -Infinity;

    // Generate random candidates;
    for (const i = 0; i < numCandidates; i++) {

      if (this.checkConstraints(candidate)) {
        const [mean, std] = this.gp.predict(candidate);

        if (acquisition > bestAcquisition) {
          bestAcquisition = acquisition;
          bestPoint = candidate;
        }
      }
    }

    return bestPoint;
  }

  private normalCDF(x: number): number {
    return 0.5 * (1 + Math.erf(x / Math.sqrt(2)));
  }

  private normalPDF(x: number): number {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }

  protected checkConvergence(): boolean {
    if (this.history.length < 10) {
      return false;
    }

    // Check if the improvement in the last few iterations is small;


    // Check if the uncertainty in the GP is small;

    const [_, std] = this.gp.predict(lastPoint);

    return valueConvergence || uncertaintyConvergence;
  }
}
