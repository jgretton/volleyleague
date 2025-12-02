import * as React from 'react';

import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { leagues } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { AddLeagueDialog } from '@/components/dialogs/add-league';
import { League } from '@/types/club';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leagues',
        href: leagues().url,
    },
    {
        title: 'Leagues',
        href: leagues().url,
    },
];

interface PageProps {
    league: League;
    flash: { error: string; success: string; warning: string };
}

export default function SingleLeagueIndex({ league, flash }: PageProps) {
    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.warning) toast.warning(flash.warning);
    }, [flash]);
    console.log(league);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="League" />
            <div className="mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-12">
                <div className="flex flex-row justify-between">
                    <Heading
                        title="Single League"
                        description="Manage Single League and their leagues from within this page"
                    />
                    <div className="flex">
                        <AddLeagueDialog />
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12"></div>
            <Toaster richColors expand position="top-center" />
        </AppLayout>
    );
}
