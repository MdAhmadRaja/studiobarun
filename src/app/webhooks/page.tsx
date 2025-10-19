import { DashboardLayout } from "@/components/dashboard-layout";
import { WebhooksTable } from "@/components/webhooks-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WebhooksPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-headline text-2xl font-bold">
          Webhook Management
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Registered Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <WebhooksTable />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
