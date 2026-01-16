import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Scale } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2 font-headline text-xl font-bold text-foreground', className)}>
      <Scale className="h-6 w-6 text-accent" />
      <span>Idem Legal</span>
    </Link>
  );
}
