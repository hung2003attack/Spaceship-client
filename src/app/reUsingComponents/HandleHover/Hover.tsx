import React, { memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './hover.module.scss';
import { hover, PropsImg } from './interfaceHover';

// Hovertitle props[bắt buộc có title,[anyTags != 'p' & 'img',Tags, Class, child = con của Icon]] [ Tags = Component or icon or tag]

const Hovertitle: React.FC<hover> = ({
    //children
    children,
    //Event
    onClick,
    //Any tag
    anyTags,
    //href,
    href,
    to,
    //danh cho Image
    src,
    alt,
    // hiển thi ra Component or icon và Tags...
    Tags,
    //con của Tags
    child,
    // bắt buộc phải có title để làm tiêu đề hiển thi
    title,
    //ClassNames
    homeCL = false,
    settingCL = false,
    inheritCL = false,
    logoCL = false,
    exchangeCL = false,
    sendCL = false,
    notificationCL = false,
    logoLGBTCL = false,
    lgbtTitleCL = false,
    nextBarCL = false,
    friendCL = false,
    // Call video
    callVideo = false,
}) => {
    const [showHidetitle, setShowHideetitle] = useState<boolean>(false);

    const [_image, setImage] = useState<boolean>(true);

    const tagRef = useRef<any>('div');
    console.log('hover');

    const handleHover = () => {
        setShowHideetitle(true);
    };

    const removeHover = () => {
        setShowHideetitle(false);
    };

    const ClassNames = clsx({
        [styles.home]: homeCL,
        [styles.setting]: settingCL,
        [styles.inherit]: inheritCL,
        [styles.logo]: logoCL,
        [styles.send]: sendCL,
        [styles.notification]: notificationCL,
        [styles.logoLGBT]: logoLGBTCL,
        [styles.nextBar]: nextBarCL,
        [styles.friend]: friendCL,
        [styles.callVideo]: callVideo,
    });

    useEffect(() => {
        if (anyTags) {
            if (anyTags !== 'img') {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                tagRef.current = anyTags;

                if (Tags === 'img') {
                    setImage(false);
                }
            } else {
                setImage(false);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anyTags]);

    const propEvents = {
        onClick,
    };
    const propsImg: PropsImg = {
        src,
        alt,
    };
    const propLink = {
        href,
        to,
    };
    const Propstag = tagRef.current;

    return (
        <>
            <Propstag
                {...propLink}
                className={ClassNames}
                onMouseEnter={handleHover}
                onMouseLeave={removeHover}
                {...propEvents}
            >
                {_image ? children ? children : <Tags>{child}</Tags> : <Tags {...propsImg} />}

                {showHidetitle && (
                    <div
                        className={clsx(styles.settingtitle, {
                            [styles.exchange]: exchangeCL,
                            [styles.lgbtTitle]: lgbtTitleCL,
                        })}
                    >
                        <p>{title}</p>
                    </div>
                )}
            </Propstag>
        </>
    );
};

export default memo(Hovertitle);
