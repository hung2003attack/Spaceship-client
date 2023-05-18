import { ReactNode } from 'react';

export interface PropsRegisterLanguage {
    [VN: string]: {
        title: string;
        input: {
            id: number;
            type?: string | string[];
            gender?: {
                id: number;
                type: string;
            }[];
            placeholder?: string;
            role: string;
        }[];
        submit: string;
        messagePhoneEmail: string[];
        messagePassword: string;
        messageDate: string;
        messageName: string;
    };
    EN: {
        title: string;
        input: {
            id: number;
            type?: string | string[];
            gender?: {
                id: number;
                type: string;
            }[];
            placeholder?: string;
            role: string;
        }[];
        submit: string;
        messagePhoneEmail: string[];
        messagePassword: string;
        messageDate: string;
        messageName: string;
    };
}
export interface PropsState {
    persistedReducer: {
        language: {
            register: string;
        };
    };
}

export interface PropsRegister {
    account: string | number;
    dataRegister: PropsRegisterLanguage;
    Next: ReactNode;
    acc: number;
}
