export interface hover {
    children?: React.ReactNode | any;
    onClick?: () => void;
    anyTags?: any;
    Tags?: any;
    child?: any;
    href?: string;
    src?: string;
    alt?: string;
    to?: string;
    title: string | undefined;
    //class
    settingCL?: boolean;
    homeCL?: boolean;
    logoLGBTCL?: boolean;
    lgbtTitleCL?: boolean;
    exchangeCL?: boolean;
    sendCL?: boolean;
    notificationCL?: boolean;
    avatarCL?: boolean;
    inheritCL?: boolean;
    logoCL?: boolean;
    nextBarCL?: boolean;
    friendCL?: boolean;
    //call videos
    callVideo?: boolean;
}
export interface PropsImg {
    src: string | undefined;
    alt: string | undefined;
}
