import * as React from 'react';

import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { leagues } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { AddTeamToLeagueDialog } from '@/components/dialogs/add-team-to-league';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { League } from '@/types/club';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { toast, Toaster } from 'sonner';

interface PageProps {
    league: League;

    flash: { error: string; success: string; warning: string };
}

export default function SingleLeagueIndex({
    league,
    flash,
    seasons,
    teams,
}: PageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Leagues',
            href: leagues().url,
        },
        {
            title: league.name,
            href: leagues().url,
        },
    ];
    React.useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.warning) toast.warning(flash.warning);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={league.name} />
            <div className="mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-12">
                <div className="flex flex-row justify-between">
                    <Heading
                        title={league.name + ' - ' + league.gender}
                        description="Manage Single League and their leagues from within this page"
                    />
                </div>
            </div>
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
                <Tabs defaultValue="account">
                    <TabsList>
                        {seasons.map((season) => {
                            return (
                                <>
                                    <TabsTrigger value={season.name}>
                                        {season.name}
                                    </TabsTrigger>
                                </>
                            );
                        })}
                    </TabsList>
                    {seasons.map((season) => {
                        return (
                            <TabsContent value={season.name} key={season.id}>
                                <Card>
                                    <CardHeader className="flex flex-row justify-between">
                                        <CardTitle>
                                            Teams in {league.name}
                                        </CardTitle>
                                        <AddTeamToLeagueDialog
                                            teams={teams}
                                            season_id={season.id}
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        {season.teams.map((team) => (
                                            <p>{team.name}</p>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        );
                    })}
                </Tabs>
            </div>
            <Toaster richColors expand position="top-center" />
        </AppLayout>
    );
}
