"use server";

import { suggestRetrySchedule } from "@/ai/flows/smart-retry-suggestions";
import { z } from "zod";

const SuggestionStateSchema = z.object({
  suggestedSchedule: z.string().optional(),
  reasoning: z.string().optional(),
  error: z.string().optional(),
});

type SuggestionState = z.infer<typeof SuggestionStateSchema>;

export async function getRetrySuggestion(
  _prevState: SuggestionState,
  formData: FormData
): Promise<SuggestionState> {
  const failedDeliveryLogs = formData.get("failedDeliveryLogs") as string;

  if (!failedDeliveryLogs) {
    return { error: "Failed delivery logs are required." };
  }

  try {
    const result = await suggestRetrySchedule({ failedDeliveryLogs });
    return {
      suggestedSchedule: result.suggestedSchedule,
      reasoning: result.reasoning,
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to get suggestion: ${errorMessage}` };
  }
}
