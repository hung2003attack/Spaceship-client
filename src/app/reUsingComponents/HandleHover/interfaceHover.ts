export interface hover {
    children?: React.ReactNode | any;
    onClick?: (e?: any) => void;
    anyTags?: any;
    Tags?: any;
    child?: any;
    href?: string;
    src?: string;
    alt?: string;
    to?: string;
    title: string | undefined;
    size?: string;
    color?: string;
    //class

    //call videos
    callVideo?: boolean;
}
export interface PropsImg {
    src: string | undefined;
    alt: string | undefined;
}
