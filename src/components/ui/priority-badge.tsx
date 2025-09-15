import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const getVariantClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'bg-priority-low text-white hover:bg-priority-low/80';
      case 'medium':
        return 'bg-priority-medium text-white hover:bg-priority-medium/80';
      case 'high':
        return 'bg-priority-high text-white hover:bg-priority-high/80';
      case 'critical':
        return 'bg-priority-critical text-white hover:bg-priority-critical/80';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Badge 
      className={cn(getVariantClass(priority), className)}
      variant="secondary"
    >
      {priority}
    </Badge>
  );
}