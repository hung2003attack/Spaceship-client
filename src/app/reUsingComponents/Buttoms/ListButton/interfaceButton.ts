import { ReactNode } from 'react';

export interface Props {
    props?: any;
    children?: ReactNode;
    to?: string;
    href?: string;
    onClick?: () => void;
    onDoubleClick?: () => void;
    src?: string;
    alt?: string;
    userName?: string;
    login?: boolean;
    signUp?: boolean;
    homeCl?: boolean;
    exchangeCl?: boolean;
    personalPageCl?: boolean;
    settingCl?: boolean;
    connectworld?: boolean;
    connectworld2?: boolean;
    darkShining?: boolean;
    callVideo?: boolean;
    h?: boolean;
    e?: boolean;
    p?: boolean;
    s?: boolean;

    f?: boolean;
    post?: boolean;
    friend?: boolean;

    cv?: boolean;
}
