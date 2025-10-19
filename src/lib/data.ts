import type { StatCard, ChartData, DeliveryStatusData, Webhook, FailedDelivery } from '@/lib/types';
import { Briefcase, CheckCircle, AlertTriangle, Users, GitBranch } from 'lucide-react';

export const statCards: StatCard[] = [
  {
    title: 'Total Events',
    value: '10,254',
    change: '+12.5% from last month',
    icon: Briefcase,
  },
  {
    title: 'Active Webhooks',
    value: '87',
    change: '+2 from last week',
    icon: GitBranch,
  },
  {
    title: 'Successful Deliveries',
    value: '98.2%',
    change: '-0.2% from last month',
    icon: CheckCircle,
  },
  {
    title: 'Failed Deliveries',
    value: '183',
    change: '+5 since yesterday',
    icon: AlertTriangle,
  },
];

export const eventsChartData: ChartData[] = [
  { date: 'Jan', events: 600 },
  { date: 'Feb', events: 800 },
  { date: 'Mar', events: 1200 },
  { date: 'Apr', events: 1000 },
  { date: 'May', events: 1500 },
  { date: 'Jun', events: 1800 },
];

export const deliveryStatusData: DeliveryStatusData[] = [
    { status: 'Successful', count: 9820, fill: 'var(--color-successful)' },
    { status: 'Failed', count: 183, fill: 'var(--color-failed)' },
    { status: 'Pending', count: 51, fill: 'var(--color-pending)' },
];

export const webhooks: Webhook[] = [
  {
    id: 'wh_1',
    url: 'https://api.customer-a.com/webhook',
    events: ['job.created', 'candidate.updated'],
    status: 'active',
    lastDelivery: '2023-10-26 10:00:00 UTC',
  },
  {
    id: 'wh_2',
    url: 'https://hooks.customer-b.io/events',
    events: ['interview.scheduled'],
    status: 'active',
    lastDelivery: '2023-10-26 10:05:00 UTC',
  },
  {
    id: 'wh_3',
    url: 'https://api.customer-c.com/incoming',
    events: ['assessment.completed', 'job.filled'],
    status: 'inactive',
    lastDelivery: '2023-10-25 12:00:00 UTC',
  },
    {
    id: 'wh_4',
    url: 'https://client-webhooks.com/handler',
    events: ['candidate.hired', 'job.created'],
    status: 'active',
    lastDelivery: '2023-10-26 11:30:00 UTC',
  },
];

export const failedDeliveries: FailedDelivery[] = [
  {
    id: 'del_fail_1',
    webhookUrl: 'https://api.customer-a.com/webhook/invalid',
    event: 'job.created',
    timestamp: '2023-10-26 09:30:15 UTC',
    error: '404 Not Found',
    logs: JSON.stringify(
      {
        attempts: [
          { timestamp: '2023-10-26 09:30:15 UTC', status: 'failed', error: '404 Not Found', response: 'Endpoint does not exist' },
          { timestamp: '2023-10-26 09:31:15 UTC', status: 'failed', error: '404 Not Found', response: 'Endpoint does not exist' },
          { timestamp: '2023-10-26 09:33:15 UTC', status: 'failed', error: '404 Not Found', response: 'Endpoint does not exist' },
        ],
        finalStatus: 'failed',
      },
      null,
      2
    ),
  },
  {
    id: 'del_fail_2',
    webhookUrl: 'https://hooks.customer-b.io/events',
    event: 'interview.scheduled',
    timestamp: '2023-10-26 10:05:30 UTC',
    error: '500 Internal Server Error',
    logs: JSON.stringify(
      {
        attempts: [
          { timestamp: '2023-10-26 10:05:30 UTC', status: 'failed', error: '500 Internal Server Error', response: 'Server overloaded' },
          { timestamp: '2023-10-26 10:06:00 UTC', status: 'failed', error: '500 Internal Server Error', response: 'Server overloaded' },
        ],
        finalStatus: 'pending_retry',
      },
      null,
      2
    ),
  },
    {
    id: 'del_fail_3',
    webhookUrl: 'https://api.thirdparty.com/events',
    event: 'assessment.completed',
    timestamp: '2023-10-26 11:45:00 UTC',
    error: 'Connection Timeout',
    logs: JSON.stringify(
      {
        attempts: [
          { timestamp: '2023-10-26 11:45:00 UTC', status: 'failed', error: 'Connection Timeout', response: null },
          { timestamp: '2023-10-26 11:45:30 UTC', status: 'failed', error: 'Connection Timeout', response: null },
          { timestamp: '2023-10-26 11:46:30 UTC', status: 'failed', error: 'Connection Timeout', response: null },
          { timestamp: '2023-10-26 11:48:30 UTC', status: 'failed', error: 'Connection Timeout', response: null },
        ],
        finalStatus: 'failed',
      },
      null,
      2
    ),
  },
];
