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
    contacts!: Table<TContact>;

    constructor() {
        super('ContactDb');
        this.version(2).stores({
            contacts: '++id, name,jobTitle,isFavorite, phones, email, notes'
        });
    }
}

export const db = new ContactsDb();

export const { contacts } = db;