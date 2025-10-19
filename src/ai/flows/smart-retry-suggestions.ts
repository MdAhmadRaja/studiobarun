'use server';

/**
 * @fileOverview A smart retry schedule suggestion AI agent.
 *
 * - suggestRetrySchedule - A function that handles the suggestion of retry schedules.
 * - SuggestRetryScheduleInput - The input type for the suggestRetrySchedule function.
 * - SuggestRetryScheduleOutput - The return type for the suggestRetrySchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRetryScheduleInputSchema = z.object({
  failedDeliveryLogs: z
    .string()
    .describe(
      'The failed delivery logs in JSON format.  Include delivery attempts, timestamps, and error messages.'
    ),
});
export type SuggestRetryScheduleInput = z.infer<typeof SuggestRetryScheduleInputSchema>;

const SuggestRetryScheduleOutputSchema = z.object({
  suggestedSchedule: z
    .string()
    .describe(
      'The suggested retry schedule, including the number of retries, delay between retries, and maximum retry attempts.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested retry schedule.'),
});
export type SuggestRetryScheduleOutput = z.infer<typeof SuggestRetryScheduleOutputSchema>;

export async function suggestRetrySchedule(
  input: SuggestRetryScheduleInput
): Promise<SuggestRetryScheduleOutput> {
  return suggestRetryScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRetrySchedulePrompt',
  input: {schema: SuggestRetryScheduleInputSchema},
  output: {schema: SuggestRetryScheduleOutputSchema},
  prompt: `You are an expert system administrator specializing in webhook delivery optimization. Given the following failed webhook delivery logs, suggest an optimized retry schedule. Provide the number of retries, delay between retries, and maximum retry attempts. Explain your reasoning behind the suggested schedule.

Failed Delivery Logs:
{{{failedDeliveryLogs}}} `,
});

const suggestRetryScheduleFlow = ai.defineFlow(
  {
    name: 'suggestRetryScheduleFlow',
    inputSchema: SuggestRetryScheduleInputSchema,
    outputSchema: SuggestRetryScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
