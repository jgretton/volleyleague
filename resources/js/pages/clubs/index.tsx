import * as React from 'react';

import { columns } from '@/components/clubtable/columns';
import { DataTable } from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { clubs } from '@/routes';
import { create } from '@/routes/clubs';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Club } from '@/types/club';
import { Plus } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clubs',
        href: clubs().url,
    },
];

interface PageProps {
    clubs: Club[];
    error: string;
    flash: { error: string; success: string; warning: string };
}

export default function ClubsIndex({ clubs, flash }: PageProps) {
    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.warning) toast.warning(flash.warning);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clubs" />
            <div className="mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-12">
                <div className="flex flex-row justify-between">
                    <Heading
                        title="Clubs"
                        description="Manage clubs and their teams from within this page"
                    />
                    <div className="flex">
                        <Button asChild>
                            <Link href={create().url}>
                                <Plus />
                                Create{' '}
                            </Link>
                        </Button>
                    </div>
                </div>
                {clubs.length < 1 ? (
                    <EmptyState />
                ) : (
                    <div className="mx-auto w-full py-10">
                        <DataTable columns={columns} data={clubs} />
                    </div>
                )}
            </div>
            <Toaster richColors expand position="top-center" />
        </AppLayout>
    );
}
