import { DashboardLayout } from "@/components/dashboard-layout";
import { FailedDeliveriesTable } from "@/components/failed-deliveries-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

export default function DeliveryReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-headline text-2xl font-bold">Delivery Reports</h1>
        
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Smart Retry Suggestions</AlertTitle>
          <AlertDescription>
            Analyze failed delivery logs with AI to get optimized retry schedules. Click 'Details' on a failed delivery to try it out.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Failed Deliveries</CardTitle>
            <CardDescription>
              A log of all webhook deliveries that have failed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FailedDeliveriesTable />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
