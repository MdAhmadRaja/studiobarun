"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, AlertCircle } from "lucide-react";
import { failedDeliveries as initialDeliveries } from "@/lib/data";
import type { FailedDelivery } from "@/lib/types";
import { SmartRetryCard } from "./smart-retry-card";

export function FailedDeliveriesTable() {
  const [deliveries] = useState<FailedDelivery[]>(initialDeliveries);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.webhookUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by URL or event..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Accordion type="single" collapsible className="w-full">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Webhook URL</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Error</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeliveries.map((delivery) => (
                <AccordionItem value={delivery.id} key={delivery.id} asChild>
                  <>
                    <TableRow>
                      <TableCell className="font-medium">
                        {delivery.webhookUrl}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{delivery.event}</Badge>
                      </TableCell>
                      <TableCell>{delivery.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-destructive">
                           <AlertCircle className="h-4 w-4"/>
                           {delivery.error}
                        </div>
                      </TableCell>
                      <TableCell>
                        <AccordionTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Details <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                        </AccordionTrigger>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <AccordionContent className="p-4">
                          <SmartRetryCard logs={delivery.logs} />
                        </AccordionContent>
                      </TableCell>
                    </TableRow>
                  </>
                </AccordionItem>
              ))}
            </TableBody>
          </Table>
        </div>
      </Accordion>
    </div>
  );
}
