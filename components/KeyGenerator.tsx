"use client"

// components/KeyGenerator.tsx

import { useEffect, useState } from 'react';
import { PolynomialChaosCSPRNG, ChaosKeyGenerator } from '../lib/csprng';

const KeyGenerator = () => {
    const [chaosPrime1, setChaosPrime1] = useState<number | null>(null);
    const [chaosPrime2, setChaosPrime2] = useState<number | null>(null);
    const [performanceResults, setPerformanceResults] = useState<{ polynomial: number; chaos: number } | null>(null);
    const [polynomialPrime1, setPolynomialPrime1] = useState<number | null>(null);
    const [polynomialPrime2, setPolynomialPrime2] = useState<number | null>(null);
    const [count_1, setCount_1] = useState<number>(0);
    const [count_2, setCount_2] = useState<number>(0);

    const generateKeys = () => {
        const polynomialCSPRNG = new PolynomialChaosCSPRNG(Date.now());
        const chaosCSPRNG = new ChaosKeyGenerator(Date.now());

        // Menghasilkan dua bilangan prima menggunakan Chaos Key
        const prime_c1 = chaosCSPRNG.generateChaosPrime(100, 500); // Ganti dengan rentang yang diinginkan
        const prime_c2 = chaosCSPRNG.generateChaosPrime(100, 500); // Ganti dengan rentang yang diinginkan

        setChaosPrime1(prime_c1);
        setChaosPrime2(prime_c2);

        // Menghasilkan dua bilangan prima
        const prime_p1 = polynomialCSPRNG.generatePrime(100, 500); // Ganti dengan rentang yang diinginkan
        const prime_p2 = polynomialCSPRNG.generatePrime(100, 500); // Ganti dengan rentang yang diinginkan

        setPolynomialPrime1(prime_p1);
        setPolynomialPrime2(prime_p2);

        setCount_1(count_1 + 1);
    };

    const testPerformance = () => {
        const startPolynomial = performance.now();
        const polynomialCSPRNG = new PolynomialChaosCSPRNG(Date.now());
        for (let i = 0; i < 100000; i++) {
            polynomialCSPRNG.generate();
        }
        const endPolynomial = performance.now();
        const polynomialTime = endPolynomial - startPolynomial;

        const startChaos = performance.now();
        const chaosCSPRNG = new ChaosKeyGenerator(Date.now());
        for (let i = 0; i < 100000; i++) {
            chaosCSPRNG.generate();
        }
        const endChaos = performance.now();
        const chaosTime = endChaos - startChaos;

        // Menyimpan hasil ke dalam state
        setPerformanceResults({
            polynomial: polynomialTime,
            chaos: chaosTime,
        });

        setCount_2(count_2 + 1)
    };

    const [status, setStatus] = useState<boolean>(false)

    useEffect(() => {
        setStatus(count_2 < count_1);
    }, [count_1, count_2]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-black">CSPRNG Berbasis Chaos dan RSA Key Generation</h1>
            <button onClick={generateKeys} className="px-4 py-2 bg-blue-500 text-black">
                Generate Keys
            </button>
            <button disabled={status ? false : true} onClick={testPerformance} className={`${status ? 'cursor-pointer' : 'cursor-not-allowed'} mt-4 px-4 py-2 bg-green-500 text-black`}>
                Test Performance
            </button>
            <div className="mt-4">
                <p className='text-black'>Polynomial Prime 1: {polynomialPrime1}</p>
                <p className='text-black'>Polynomial Prime 2: {polynomialPrime2}</p>
                <p className='text-black'>Chaos Prime 1: {chaosPrime1}</p>
                <p className='text-black'>Chaos Prime 2: {chaosPrime2}</p>
                {performanceResults && (
                    <div>
                        <p className='text-black'>Polynomial Key Generation Time: {performanceResults.polynomial.toFixed(2)} ms</p>
                        <p className='text-black'>Chaos Key Generation Time: {performanceResults.chaos.toFixed(2)} ms</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeyGenerator;