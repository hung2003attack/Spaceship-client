import { ReactNode } from 'react';
export interface Setting {
    data: {
        title: string;
        icon?: ReactNode;
        children?: {
            data?: {
                name: string;
            }[];
        };
    }[];
}
