"use client"

// components/KeyGenerator.tsx

import { useState } from 'react';
import { PolynomialChaosCSPRNG, ChaosKeyGenerator } from '../lib/csprng';

const KeyGenerator = () => {
    const [polynomialKey, setPolynomialKey] = useState<number | null>(null);
    const [chaosKey, setChaosKey] = useState<number | null>(null);
    const [performanceResults, setPerformanceResults] = useState<{ polynomial: number; chaos: number } | null>(null);

    const generateKeys = () => {
        const polynomialCSPRNG = new PolynomialChaosCSPRNG(Date.now());
        const chaosCSPRNG = new ChaosKeyGenerator(Date.now());

        setPolynomialKey(polynomialCSPRNG.generate());
        setChaosKey(chaosCSPRNG.generate());
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
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-black">CSPRNG Berbasis Chaos</h1>
            <button onClick={generateKeys} className="px-4 py-2 bg-blue-500 text-black">
                Generate Keys
            </button>
            <button onClick={testPerformance} className="mt-4 px-4 py-2 bg-green-500 text-black">
                Test Performance
            </button>
            <div className="mt-4">
                <p className='text-black'>Polynomial Key: {polynomialKey}</p>
                <p className='text-black'>Chaos Key: {chaosKey}</p>
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