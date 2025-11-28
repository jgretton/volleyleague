import ClubController from '@/actions/App/Http/Controllers/ClubController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { clubs } from '@/routes';
import { show } from '@/routes/clubs';
import { type BreadcrumbItem } from '@/types';
import { Club } from '@/types/club';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface PageProps {
    club: Club;
}

export default function EditClubsIndex({ club }: PageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Clubs',
            href: clubs().url,
        },
        {
            title: club.name,
            href: show(club.id).url,
        },
        {
            title: 'Edit Club',
            href: clubs().url,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Club" />
            <div className="mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-12">
                <Heading
                    title="Edit Club"
                    description="Manage clubs and their teams from within this page"
                />

                <Form {...ClubController.update.form(club.id)}>
                    {({ processing, errors }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Club Name *
                                </FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={club.name}
                                    required
                                />
                                <InputError message={errors.name} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="venue">
                                    Venue address *
                                </FieldLabel>
                                <Input
                                    id="venue"
                                    name="venue"
                                    defaultValue={club.venue}
                                    required
                                />
                                <InputError message={errors.venue} />
                            </Field>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="contant_name">
                                        Contact Name *
                                    </FieldLabel>
                                    <Input
                                        id="contact_name"
                                        name="contact_name"
                                        defaultValue={club.contact_name}
                                        required
                                    />
                                    <InputError message={errors.contact_name} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="contact_email">
                                        Contact Email *
                                    </FieldLabel>
                                    <Input
                                        id="contact_email"
                                        name="contact_email"
                                        defaultValue={club.contact_email}
                                        type="email"
                                        required
                                    />
                                    <InputError
                                        message={errors.contact_email}
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="contact_number">
                                        Contact Number *
                                    </FieldLabel>
                                    <Input
                                        id="contact_number"
                                        name="contact_number"
                                        defaultValue={club.contact_number}
                                        type="tel"
                                        required
                                    />
                                    <InputError
                                        message={errors.contact_number}
                                    />
                                </Field>
                            </div>
                            <FieldSeparator />
                            <Field
                                className="justify-end"
                                orientation="horizontal"
                            >
                                <Button
                                    type="button"
                                    variant={'secondary'}
                                    asChild
                                >
                                    <Link href={show(club.id).url}>Back</Link>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="px-20"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Update
                                </Button>
                            </Field>
                        </FieldGroup>
                    )}
                </Form>
                {/* </CardContent>
                </Card> */}
            </div>
        </AppLayout>
    );
}
