import LeagueController from '@/actions/App/Http/Controllers/LeagueController';
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
import { Form } from '@inertiajs/react';
import { LoaderCircle, Minus, Plus } from 'lucide-react';
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

export function AddLeagueDialog() {
    const [open, setOpen] = useState(false);
    const [addSeason, setAddSeason] = useState(false);
    const [dateSelected, setDateSelected] = useState<number | null>(null);
    const [endYearSelected, setEndYearSelected] = useState<number | null>(null);

    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: 13 }, (_, i) => currentYear - 6 + i);

    const endYearRange =
        dateSelected !== null
            ? Array.from({ length: 7 }, (_, i) => dateSelected + 1 + i)
            : [];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus /> Add League
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <Form
                    {...LeagueController.store.form()}
                    onSuccess={() => setOpen(false)}
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-4">
                            <DialogHeader>
                                <DialogTitle>Create league</DialogTitle>
                                <DialogDescription>
                                    Create a league
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">League Name</Label>
                                    <Input id="name" name="name" />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="gender">
                                        League gender
                                    </Label>

                                    <Select name="gender">
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
                                <div className="">
                                    {!addSeason ? (
                                        <Button
                                            type="button"
                                            variant={'secondary'}
                                            className="w-full"
                                            onClick={() => setAddSeason(true)}
                                        >
                                            <Plus /> Add a season
                                        </Button>
                                    ) : (
                                        <div className="grid gap-3">
                                            <Button
                                                type="button"
                                                variant={'secondary'}
                                                className="w-full"
                                                onClick={() => {
                                                    setAddSeason(false);
                                                    setDateSelected(null);
                                                    setEndYearSelected(null);
                                                }}
                                            >
                                                <Minus /> Remove season
                                            </Button>

                                            <div className="grid gap-3">
                                                <Label htmlFor="gender">
                                                    Season start year
                                                </Label>

                                                <Select
                                                    name="start_date"
                                                    onValueChange={(value) => {
                                                        setDateSelected(
                                                            Number(value),
                                                        );
                                                        setEndYearSelected(
                                                            Number(value) + 1,
                                                        );
                                                    }}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a league start year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {yearRange.map(
                                                                (year) => (
                                                                    <SelectItem
                                                                        value={year.toString()}
                                                                        key={
                                                                            year
                                                                        }
                                                                    >
                                                                        {year}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <InputError
                                                    message={errors.start_date}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="gender">
                                                    Season end year
                                                </Label>

                                                <Select
                                                    name="end_date"
                                                    disabled={
                                                        dateSelected === null
                                                    }
                                                    onValueChange={(value) =>
                                                        setEndYearSelected(
                                                            Number(value),
                                                        )
                                                    }
                                                    value={endYearSelected?.toString()}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a league start year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {endYearRange.map(
                                                                (year) => (
                                                                    <SelectItem
                                                                        value={year.toString()}
                                                                        key={
                                                                            year
                                                                        }
                                                                    >
                                                                        {year}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <InputError
                                                    message={errors.end_date}
                                                />
                                            </div>
                                        </div>
                                    )}
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
