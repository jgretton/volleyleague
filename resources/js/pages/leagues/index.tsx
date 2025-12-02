import * as React from 'react';

import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { leagues } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { AddLeagueDialog } from '@/components/dialogs/add-league';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { show } from '@/routes/leagues';
import { League } from '@/types/club';
import { ShieldBan } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leagues',
        href: leagues().url,
    },
];

interface PageProps {
    leagues: League[];
    flash: { error: string; success: string; warning: string };
}

export default function LeaguesIndex({ leagues, flash }: PageProps) {
    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.warning) toast.warning(flash.warning);
    }, [flash]);
    console.log(leagues);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="League" />
            <div className="mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-12">
                <div className="flex flex-row justify-between">
                    <Heading
                        title="Leagues"
                        description="Manage leagues and their leagues from within this page"
                    />
                    <div className="flex">
                        <AddLeagueDialog />
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
                {leagues.length < 1 ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-col items-start gap-2">
                                <ShieldBan />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="font-medium">
                                    No leagues yet
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Click the add team button to get started.
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>League</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leagues.map((league) => (
                                <TableRow key={league.id}>
                                    <TableCell>
                                        <Link
                                            href={show(league.id)}
                                            className="font-semibold hover:underline"
                                        >
                                            {league.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{league.gender}</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell className="space-x-1.5 text-right">
                                        {/* <UpdateTeamDialog team={team} /> */}
                                        {/* <DeleteTeamDialog team={team} /> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            <Toaster richColors expand position="top-center" />
        </AppLayout>
    );
}
