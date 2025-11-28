import TeamController from '@/actions/App/Http/Controllers/TeamController';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Team } from '@/types/club';
import { Form } from '@inertiajs/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
    team: Team;
}

export function DeleteTeamDialog({ team }: PageProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size={'icon'}>
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="w-full sm:max-w-lg"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <Form
                    {...TeamController.destroy.form(team.id)}
                    onSuccess={() => setOpen(false)}
                    options={{
                        preserveScroll: true,
                    }}
                >
                    {({ processing }) => (
                        <div className="grid gap-4">
                            <DialogHeader>
                                <DialogTitle className="leading-normal">
                                    Are you sure you want to delete {team.name}{' '}
                                    - {team.gender}?
                                </DialogTitle>
                                <DialogDescription className="">
                                    Once {team.name} is deleted, all of its
                                    resources and data will also be permanently
                                    deleted.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    variant={'destructive'}
                                    disabled={processing}
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Delete team
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
