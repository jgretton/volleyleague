'use client';

import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Club = {
    id: string;
    name: string;
    teams: number;
    contact_name: string;
    contact_email: string;
};

export const columns: ColumnDef<Club>[] = [
    {
        accessorKey: 'name',
        header: 'Club Name',
        cell: ({ row }) => {
            return (
                <Link
                    href={`/clubs/${row.original.id}`}
                    className="size-full font-medium tracking-wide hover:underline"
                >
                    {row.original.name}
                </Link>
            );
        },
    },
    {
        accessorKey: 'contact',
        header: 'Club Contact',
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <span className="font-medium">
                        {row.original.contact_name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {row.original.contact_email}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'teams',
        header: 'No of Teams',
    },
];
