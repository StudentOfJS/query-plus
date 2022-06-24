export interface PollProps {
    fn: () => Promise<unknown>;
    validate: (res: unknown) => boolean;
    interval: number;
    maxAttempts?: number;
    attempts?: number;
}
/**
 * poll invokes a passed in function a given amount of times
 * on provided interval for however many attmepts are requested
 * it validates the response from the function, with the passed in validate function
 * @param params: PollProps
 * @returns Promise
 */
export declare const poll: ({ fn, validate, interval, maxAttempts }: PollProps) => Promise<unknown>;
