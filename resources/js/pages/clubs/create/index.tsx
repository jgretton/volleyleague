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
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clubs',
        href: clubs().url,
    },
    {
        title: 'Create Club',
        href: clubs().url,
    },
];

export default function ClubsIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Club" />
            <div className="mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-12">
                <Heading
                    title="Create Club"
                    description="Manage clubs and their teams from within this page"
                />

                {/* <Card>
                    <CardHeader>
                        <CardTitle>Adding New club</CardTitle>
                        <CardDescription>
                            Add all the information here for the new club.
                        </CardDescription>
                    </CardHeader>
                    <CardContent> */}
                <Form {...ClubController.store.form()}>
                    {({ processing, errors }) => (
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Club Name *
                                </FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Lincoln Cannons"
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
                                    placeholder="123 Address Lane, Lincoln, LN6 6BW"
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
                                        placeholder="John Smith"
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
                                        placeholder="contact@lincolncannons.com"
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
                                        placeholder="+44 7772456895"
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
                                    type="submit"
                                    disabled={processing}
                                    className="px-20"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Submit
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
