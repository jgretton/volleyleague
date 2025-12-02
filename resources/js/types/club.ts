export interface Club {
    id: string;
    name: string;
    contact_email: string;
    contact_name: string;
    contact_number: string;
    venue: string;
    teams_count: number;
}

export interface Team {
    id: string;
    name: string;
    gender: string;
    club_id: string;
}

export interface League {
    name: string;
    gender: string;
    id: string;
}
