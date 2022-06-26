export interface PollProps {
    fn: () => Promise<unknown>;
    validate: (res: unknown) => boolean;
    interval: number;
    maxAttempts?: number;
    attempts?: number;
}
export declare const poll: ({ fn, validate, interval, maxAttempts }: PollProps) => Promise<unknown>;
