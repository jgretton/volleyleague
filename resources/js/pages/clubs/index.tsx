import { columns } from '@/components/clubtable/columns';
import { DataTable } from '@/components/data-table';
import EmptyState from '@/components/empty-state';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { clubs } from '@/routes';
import { create } from '@/routes/clubs';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clubs',
        href: clubs().url,
    },
];

export default function ClubsIndex({ clubs }) {
    console.log(clubs);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clubs" />
            <div className="mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-12">
                <Heading
                    title="Clubs"
                    description="Manage clubs and their teams from within this page"
                />
                <Link href={create().url}>Create </Link>
                {clubs.length < 1 ? (
                    <EmptyState />
                ) : (
                    <div className="mx-auto w-full py-10">
                        <DataTable columns={columns} data={clubs} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
