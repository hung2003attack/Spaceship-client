import { Link } from 'react-router-dom';
import React from 'react';
import clsx from 'clsx';

import styles from './buttom.module.scss';
import CallVideoI, { ExchangeI, FriendI, HomeI, ImageI, SettingI, VideoI } from '~/assets/Icons/Icons';
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
    login = false,
    signUp = false,
    //socialNetWork
    homeCl = false,
    exchangeCl = false,
    personalPageCl = false,
    settingCl = false,
    connectworld = false,
    connectworld2 = false,
    callVideo = false,
    darkShining,
    //------------Render Icon---------------
    h = false,
    e = false,
    p = false,
    s = false,

    f = false,
    post = false,
    friend = false,
    cv = false,
}) => {
    let Buttonany: string | React.ForwardRefExoticComponent<any & React.RefAttributes<HTMLAnchorElement>>;
    Buttonany = 'button';
    console.log(darkShining);
    const className = clsx({
        [styles.homeCl]: homeCl,
        [styles.exchangeCl]: exchangeCl,
        [styles.personalPageCl]: personalPageCl,
        [styles.settingCl]: settingCl,
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
            {h && <Hovertitle Tags={HomeI} title="Home" homeCL />}
            {e && (
                <Hovertitle title="Exchange" inheritCL exchangeCL>
                    {e && <span>{<ImageI />}</span>}
                    {e && <span className={clsx(styles.exchangeI)}> {<ExchangeI />}</span>}
                    {e && <span>{<VideoI />}</span>}
                </Hovertitle>
            )}
            {children}
            {cv && <Hovertitle callVideo title="Call Video" Tags={CallVideoI} />}

            {s && <Hovertitle Tags={SettingI} title="Setting" settingCL />}
            {f && <Hovertitle Tags={FriendI} title="Friend" friendCL />}
        </Buttonany>
    );
};

export default Button;
