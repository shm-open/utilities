/**
 * smooth sampling tool
 */
export class SmoothSampling {
    private maxSampleCount: number;
    private samples: number[] = [];
    private currentSampleIndex: number = 0;
    private average: number = 0;

    /**
     * create a smooth sampling tool instance
     * @param maxSampleCount max count of samples to keep for smoothing
     */
    constructor(maxSampleCount: number) {
        this.maxSampleCount = maxSampleCount;
    }

    /**
     * append a new sample value
     * @param sample sample value to add
     */
    public append(sample: number) {
        const { samples, currentSampleIndex } = this;
        samples[currentSampleIndex] = sample;

        // update average
        let total = 0;
        const len = samples.length;
        for (let i = 0; i < len; i += 1) {
            total += samples[i];
        }
        this.average = total / len;

        // save average
        samples[currentSampleIndex] = this.average;
        this.currentSampleIndex = (currentSampleIndex + 1) % this.maxSampleCount;
    }

    /**
     * get smooth average value
     * @returns the average value
     */
    public get(): number {
        return this.average;
    }
}
