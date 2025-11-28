import TeamController from '@/actions/App/Http/Controllers/TeamController';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Team } from '@/types/club';
import { Form } from '@inertiajs/react';
import { LoaderCircle, Pencil } from 'lucide-react';
import { useState } from 'react';
import InputError from '../input-error';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
interface PageProps {
    team: Team;
}
export function UpdateTeamDialog({ team }: PageProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size={'icon'}>
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <Form
                    {...TeamController.update.form(team?.id)}
                    onSuccess={() => setOpen(false)}
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-4">
                            <DialogHeader>
                                <DialogTitle>Add Team</DialogTitle>
                                <DialogDescription>
                                    Update {team.name}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Team Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        // placeholder={`${team_name} Mens 2`}
                                        defaultValue={team.name}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="gender">Type</Label>
                                    <p className="text-xs text-gray-600">
                                        Which gender league will they play in
                                    </p>
                                    <Select
                                        name="gender"
                                        defaultValue={team.gender}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a league type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Gender
                                                </SelectLabel>
                                                <SelectItem value="Mens">
                                                    Mens
                                                </SelectItem>
                                                <SelectItem value="Womens">
                                                    Womens
                                                </SelectItem>
                                                <SelectItem value="Mixed">
                                                    Mixed
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.gender} />
                                </div>
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
