import * as React from 'react';

import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { clubs } from '@/routes';
import { edit } from '@/routes/clubs';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { AddTeamDialog } from '@/components/dialogs/add-team';
import { DeleteClubDialog } from '@/components/dialogs/delete-club';
import { DeleteTeamDialog } from '@/components/dialogs/delete-team';
import { UpdateTeamDialog } from '@/components/dialogs/update-team';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Club, Team } from '@/types/club';
import { Copy, Mail, Pencil, Phone, ShieldBan } from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface PageProps {
    club: Club;
    teams: Team[];
    error: string;
    flash: { error: string; success: string; warning: string };
}

export default function SingleClubPage({ club, teams, flash }: PageProps) {
    console.log(teams);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Clubs',
            href: clubs().url,
        },
        {
            title: club.name,
            href: clubs().url,
        },
    ];
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
                        title={club.name}
                        description="Manage the club and their teams from within this page"
                    />
                    <div className="flex gap-2">
                        <Button variant={'secondary'} asChild>
                            <Link href={edit(club.id).url}>
                                <Pencil />
                                Edit club
                            </Link>
                        </Button>
                        <DeleteClubDialog club={club} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <Card>
                        <CardHeader>
                            <CardTitle> Main club contact</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">{club.contact_name}</p>
                            <div className="mt-2 grid grid-cols-1 gap-2">
                                <div className="flex items-center gap-2">
                                    <Phone className="size-4 text-gray-500" />
                                    <p>{club.contact_number}</p>
                                    <Button variant={'ghost'}>
                                        <Copy className="size-3" /> Copy
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4 text-gray-500" />
                                    <Link
                                        className="hover:underline"
                                        href={'mailto:club@club.com'}
                                    >
                                        {club.contact_email}
                                    </Link>
                                    <Button variant={'ghost'}>
                                        <Copy className="size-3" /> Copy
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle> Club Venue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{club.venue}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-20">
                    <CardHeader className="flex flex-row justify-between">
                        <div>
                            <CardTitle>Teams</CardTitle>
                            <CardDescription>
                                Manage the teams that are associated with this
                                club
                            </CardDescription>
                        </div>
                        <div className="">
                            <AddTeamDialog
                                team_name={club.name}
                                club_id={club.id}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {teams.length < 1 ? (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-6">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex flex-col items-start gap-2">
                                        <ShieldBan />
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="font-medium">
                                            No teams yet
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            Click the add team button to get
                                            started.
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
                                    {teams.map((team) => (
                                        <TableRow key={team.id}>
                                            <TableCell>{team.name}</TableCell>
                                            <TableCell>{team.gender}</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell className="space-x-1.5 text-right">
                                                <UpdateTeamDialog team={team} />
                                                <DeleteTeamDialog team={team} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
                <div className="">
                    <h3>Things that are important on this screen</h3>
                    <ul>
                        <li>Contact info</li>
                        <li>Venue</li>
                        <li>Team management</li>
                        <li>Fixtures</li>
                        <li>results?</li>
                        <li>what league teams are in</li>
                    </ul>
                </div>
            </div>
            <Toaster richColors expand position="top-center" />
        </AppLayout>
    );
}
