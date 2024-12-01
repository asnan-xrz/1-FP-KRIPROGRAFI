// lib/crypto.ts

export class ChaosCipher {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    public encrypt(message: string): Uint8Array {
        // Log pesan yang akan dienkripsi
        console.log("Pesan yang akan dienkripsi:", message);
        
        // Proses enkripsi (contoh sederhana)
        const encrypted = new Uint8Array(message.length);
        for (let i = 0; i < message.length; i++) {
            encrypted[i] = message.charCodeAt(i) ^ this.seed; // Contoh XOR dengan seed
        }

        // Log ciphertext yang dihasilkan
        console.log("Ciphertext (Raw):", encrypted);
        return encrypted;
    }

    public decrypt(encryptedData: Uint8Array): string {
        // Log ciphertext yang akan didekripsi
        console.log("Ciphertext yang akan didekripsi:", encryptedData);
        
        // Proses dekripsi (contoh sederhana)
        let decrypted = '';
        for (let i = 0; i < encryptedData.length; i++) {
            decrypted += String.fromCharCode(encryptedData[i] ^ this.seed); // Contoh XOR dengan seed
        }

        // Log pesan terdekripsi
        console.log("Pesan terdekripsi:", decrypted);
        return decrypted;
    }

    public measurePerformance(iterations: number): { time: number; memory: number } {
        const startMemory = performance.memory.usedJSHeapSize;
        const startTime = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            this.encrypt("Test message"); // Uji enkripsi
        }

        const endTime = performance.now();
        const endMemory = performance.memory.usedJSHeapSize;

        return {
            time: endTime - startTime,
            memory: endMemory - startMemory,
        };
    }
}