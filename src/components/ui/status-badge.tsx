import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getVariantClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-status-open text-white hover:bg-status-open/80';
      case 'acknowledged':
        return 'bg-status-acknowledged text-white hover:bg-status-acknowledged/80';
      case 'in-progress':
        return 'bg-status-in-progress text-white hover:bg-status-in-progress/80';
      case 'resolved':
        return 'bg-status-resolved text-white hover:bg-status-resolved/80';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Badge 
      className={cn(getVariantClass(status), className)}
      variant="secondary"
    >
      {status}
    </Badge>
  );
}