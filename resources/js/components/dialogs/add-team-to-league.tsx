import SeasonController from '@/actions/App/Http/Controllers/SeasonController';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import { LoaderCircle, UserPlus2 } from 'lucide-react';
import { useState } from 'react';
import InputError from '../input-error';
import { Checkbox } from '../ui/checkbox';

interface PageProps {
    season_id: string;
    teams: {
        name: string;
        id: string;
        gender: string;
    }[];
}

export function AddTeamToLeagueDialog({ teams, season_id }: PageProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <UserPlus2 /> Add team to league
                </Button>
            </DialogTrigger>
            <DialogContent
                className="w-full sm:max-w-lg"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <Form
                    {...SeasonController.addTeam.form(Number(season_id))}
                    onSuccess={() => setOpen(false)}
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-4">
                            <DialogHeader>
                                <DialogTitle>Add Team</DialogTitle>
                                <DialogDescription>
                                    {/* Add a team to {team_name} */}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                {teams.map((team) => (
                                    <Label
                                        key={team.id}
                                        className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                    >
                                        <Checkbox
                                            id="toggle-2"
                                            name={`team_ids[]`}
                                            value={team.id}
                                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                        />
                                        <div className="grid gap-1.5 font-normal">
                                            <p className="text-sm leading-none font-medium">
                                                {team.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {team.gender}
                                            </p>
                                        </div>
                                    </Label>
                                ))}
                                <InputError message={errors.team_ids} />
                                {Object.keys(errors).some((key) =>
                                    key.startsWith('team_ids'),
                                ) && (
                                    <InputError message="One or more teams are invalid or already in the league" />
                                )}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Submit
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
