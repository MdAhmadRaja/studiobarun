import { GitBranch } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <GitBranch className="h-6 w-6 text-primary" />
      <h1 className="font-headline text-xl font-bold">AlgoRelay</h1>
    </div>
  );
}
