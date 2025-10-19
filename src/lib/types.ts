export type StatCard = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
};

export type ChartData = {
  date: string;
  events: number;
};

export type DeliveryStatusData = {
  status: string;
  count: number;
  fill: string;
};

export type Webhook = {
  id: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  lastDelivery: string;
};

export type FailedDelivery = {
  id: string;
  webhookUrl: string;
  event: string;
  timestamp: string;
  error: string;
  logs: string;
};
