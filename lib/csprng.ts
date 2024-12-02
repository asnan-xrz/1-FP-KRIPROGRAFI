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

    // Fungsi untuk menghasilkan bilangan prima
    public generatePrime(min: number, max: number): number {
        let prime;
        do {
            prime = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (!this.isPrime(prime));
        return prime;
    }

    // Fungsi untuk memeriksa apakah suatu bilangan adalah prima
    private isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
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

    // Fungsi untuk menghasilkan bilangan prima menggunakan Chaos Key
    public generateChaosPrime(min: number, max: number): number {
        let chaosKey = this.generate();
        let prime;
        do {
            prime = Math.floor(chaosKey * (max - min + 1)) + min;
            chaosKey = this.generate(); // Menghasilkan Chaos Key baru
        } while (!this.isPrime(prime));
        return prime;
    }

    // Fungsi untuk memeriksa apakah suatu bilangan adalah prima
    private isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }
}