export interface PollProps {
    fn: () => Promise<unknown>;
    validate: (res: unknown) => boolean;
    interval: number;
    maxAttempts?: number;
    attempts?: number
}
/**
 * poll invokes a passed in function a given amount of times
 * on provided interval for however many attmepts are requested
 * it validates the response from the function, with the passed in validate function
 * @param params: PollProps
 * @returns Promise
 */
export const poll: (
    { fn, validate, interval, maxAttempts }: PollProps,
) => Promise<unknown> = async ({ fn, validate, interval, maxAttempts, attempts=0 }) => {
    async function executePoll(
        resolve: (value: unknown) => void,
        reject: (reason?: any) => void,
    ) {
        try {
            const result = await fn();
            attempts++;
            if (validate(result)) {
                return resolve(result);
            } else if (maxAttempts && (attempts === maxAttempts)) {
                return reject(new Error("Exceeded max attempts"));
            } else {
                await setTimeout(executePoll, interval, resolve, reject);
            }
        } catch (error) {
            console.error(
                `polling Error: ${
                    (error as Error)?.message || "connection failed"
                }`,
            );
        }
    }
    return new Promise(executePoll);
};
