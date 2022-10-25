import { Link } from 'react-router-dom';
import React from 'react';
import clsx from 'clsx';

import styles from './buttom.module.scss';
import { ExchangeI, FriendI, HomeI, ImageI, SettingI, VideoI } from '~/assets/Icons/Icons';
import Avatar from '~/reUsingComponents/Avatars&Edeter/Avatar';
import Hovertitle from '~/reUsingComponents/HandleHover/Hover';
import { Props } from './interfaceButton';
// Button Props[children, to = Link , href = 'a', class, icon = 1 ký tự đầu viết thường]
const Button: React.FC<Props> = ({
    //ReactElement
    children,
    //Link va a
    to,
    href,
    //Event
    onClick,
    onDoubleClick,
    //img
    src,
    alt,
    userName,
    //-------------ClassName----------------
    //auth
    //socialNetWork
    connectworld = false,
    connectworld2 = false,
    callVideo = false,
    darkShining,
    //------------Render Icon---------------

    f = false,
    post = false,
    friend = false,
    cv = false,
}) => {
    let Buttonany: string | React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLAnchorElement>>;
    Buttonany = 'button';
    console.log(darkShining);
    const className = clsx({
        [styles.connectworld]: connectworld,
        [styles.connectworld2]: connectworld2,
        [styles.darkShining]: darkShining,
        [styles.post]: post,
        [styles.friend]: friend,
        [styles.callVideo]: callVideo,
    });
    const propsEvents: any = {
        onClick,
        onDoubleClick,
    };
    if (to) {
        propsEvents.to = to;
        Buttonany = Link;
    } else if (href) {
        propsEvents.href = href;
        Buttonany = 'a';
    }
    console.log('d');

    return (
        <Buttonany className={className} {...propsEvents}>
            {children}
            {/* {f && <Hovertitle Tags={FriendI} title="Friend" friendCL />} */}
        </Buttonany>
    );
};

export default Button;
