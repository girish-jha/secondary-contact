import Dexie, { Table } from 'dexie';

export interface TContact {
    id?: number;
    name: string;
    jobTitle: string;
    isFavorite?: boolean
    phones?: string;
    email?: string;
    notes?: string;
}

export class ContactsDb extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    contacts!: Table<TContact>;

    constructor() {
        super('ContactDb');
        this.version(1).stores({
            contacts: '++id, name,jobTitle,isFavorite, phones, email, notes' // Primary key and indexed props
        });
    }
}

export const db = new ContactsDb();

export const { contacts } = db;