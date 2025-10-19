"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getRetrySuggestion } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, Terminal } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const initialState = {
  suggestedSchedule: "",
  reasoning: "",
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" />
          Get Suggestion
        </>
      )}
    </Button>
  );
}

export function SmartRetryCard({ logs }: { logs: string }) {
  const [state, formAction] = useFormState(getRetrySuggestion, initialState);

  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Terminal className="h-5 w-5"/>
              Failed Delivery Logs
            </h3>
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="failedDeliveryLogs" value={logs} />
              <Textarea readOnly value={logs} rows={12} className="bg-background font-mono text-xs"/>
              <SubmitButton />
            </form>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500"/>
                AI-Powered Suggestion
            </h3>
            {state?.error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            {state?.suggestedSchedule && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Optimized Retry Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Suggested Schedule:</h4>
                        <p className="text-sm text-muted-foreground">{state.suggestedSchedule}</p>
                    </div>
                    <Separator/>
                    <div>
                        <h4 className="font-semibold">Reasoning:</h4>
                        <p className="text-sm text-muted-foreground">{state.reasoning}</p>
                    </div>
                </CardContent>
              </Card>
            )}
             {!state?.suggestedSchedule && !state?.error && (
                <div className="flex items-center justify-center h-full rounded-lg border border-dashed text-muted-foreground p-8">
                    <p>Click "Get Suggestion" to see AI-powered recommendations.</p>
                </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
