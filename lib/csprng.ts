// lib/csprng.ts

export class PolynomialChaosCSPRNG {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    public generate(): number {
        // Implementasi fungsi polinomial
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
}

export class ChaosKeyGenerator {
    private state: number;

    constructor(initialState: number) {
        this.state = initialState;
    }

    public generate(): number {
        // Implementasi sistem dinamik chaos
        this.state = Math.sin(this.state) * 10000;
        return Math.abs(this.state % 1);
    }
}