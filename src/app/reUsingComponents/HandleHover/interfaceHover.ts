export interface hover {
    children?: React.ReactNode | any;
    onClick?: (e?: any) => void;
    anyTags?: any;
    Tags?: any;
    href?: string;
    src?: string;
    alt?: string;
    to?: string;
    title: string | undefined;
    size?: string;
    color?: string;
    colorBg?: number;
    id?: string;
    //class

    //call videos
    callVideo?: boolean;
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
}
export interface PropsImg {
    src: string | undefined;
    alt: string | undefined;
}
