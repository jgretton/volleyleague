import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Shield } from 'lucide-react';
import { Button } from './ui/button';

export default function EmptyState() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon" className="bg-transparent">
                    <Shield className="bg-none1 size-10" />
                </EmptyMedia>
                <EmptyTitle>No data</EmptyTitle>
                <EmptyDescription>No data found</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button>Add data</Button>
            </EmptyContent>
        </Empty>
    );
}
