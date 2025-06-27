export class GaussianProcess {
    constructor(config) {
        this.X = [];
        this.y = [];
        this.K = [];
        this.L = [];
        this.alpha = [];
        this.config = {
            lengthScale: 1.0,
            signalVariance: 1.0,
            ...config,
        };
    }
    fit(X, y) {
        this.X = X;
        this.y = y;
        // Compute kernel matrix;
        this.K = this.computeKernelMatrix(X, X);
        // Add noise to diagonal;
        for (const i = 0; i < this.K.length; i++) {
            this.K[i][i] += this.config.noise;
        }
        // Compute Cholesky decomposition;
        this.L = this.cholesky(this.K);
        // Solve for alpha;
        this.alpha = this.solveTriangular(this.L, this.y);
    }
    predict(X) {
        if (this.X.length === 0) {
            return [0, this.config.signalVariance];
        }
        // Compute kernel between test point and training points;

        // Compute mean;

        // Compute variance;


        return [mean, Math.max(0, variance)];
    }
    computeKernelMatrix(X1, X2) {


        const K = Array(n1)
            .fill(null)
            .map(() => Array(n2).fill(0));
        for (const i = 0; i < n1; i++) {
            for (const j = 0; j < n2; j++) {
                K[i][j] = this.kernel(X1[i], X2[j]);
            }
        }
        return K;
    }
    kernel(x1, x2) {
        switch (this.config.kernel) {
            case 'rbf':
                return this.rbfKernel(x1, x2);
            case 'matern':
                return this.maternKernel(x1, x2);
            case 'linear':
                return this.linearKernel(x1, x2);
            default:
                throw new Error(`Unknown kernel type: ${this.config.kernel}`);
        }
    }
    rbfKernel(x1, x2) {


        return (this.config.signalVariance *
            Math.exp((-0.5 * squaredDist) / (this.config.lengthScale * this.config.lengthScale)));
    }
    maternKernel(x1, x2) {



        return this.config.signalVariance * (1 + scaledDist) * Math.exp(-scaledDist);
    }
    linearKernel(x1, x2) {
        return this.config.signalVariance * x1.reduce((sum, xi, i) => sum + xi * x2[i], 0);
    }
    cholesky(A) {

        const L = Array(n)
            .fill(null)
            .map(() => Array(n).fill(0));
        for (const i = 0; i < n; i++) {
            for (const j = 0; j <= i; j++) {
                const sum = 0;
                if (j === i) {
                    for (const k = 0; k < j; k++) {
                        sum += L[j][k] * L[j][k];
                    }
                    L[j][j] = Math.sqrt(A[j][j] - sum);
                }
                else {
                    for (const k = 0; k < j; k++) {
                        sum += L[i][k] * L[j][k];
                    }
                    L[i][j] = (A[i][j] - sum) / L[j][j];
                }
            }
        }
        return L;
    }
    solveTriangular(L, b) {


        // Forward substitution;
        for (const i = 0; i < n; i++) {
            const sum = 0;
            for (const j = 0; j < i; j++) {
                sum += L[i][j] * x[j];
            }
            x[i] = (b[i] - sum) / L[i][i];
        }
        return x;
    }
}
