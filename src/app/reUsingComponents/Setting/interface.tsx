import { ReactNode } from 'react';
export interface PropsSetting {
    data: {
        title: string;
        icon?: ReactNode;
        children?: {
            data?: {
                name: string;
                lg: string;
            }[];
        };
        logout?: boolean;
    }[];
}
