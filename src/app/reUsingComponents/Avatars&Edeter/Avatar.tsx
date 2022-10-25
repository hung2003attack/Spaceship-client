import clsx from 'clsx';
import React, { memo, useState } from 'react';

import styles from './avatar.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import Images from '../../assets/images';
import AvatarEditor from 'react-avatar-editor';

interface _Avatar {
    src?: string | undefined;
    alt?: string | undefined;
    fallback?: any;
    gender?: any;
    onClick?: () => void;
    imageEditor?: boolean;
    image?: any;
    width?: number;
    height?: number;
    border?: number;
    borderRadius?: number;
    moveAvatar?: boolean;
    background?: boolean;
}

const Avatar: React.FC<_Avatar> = ({
    onClick,
    src,
    alt,
    gender = false,
    fallback: Fallback = gender ? Images.defaultAvatarFemale : Images.defaultAvatarMale,
    imageEditor,
    image,
    width,
    height,
    border,
    borderRadius,
    moveAvatar,
    background,
}) => {
    console.log('av');

    const [avatar, setAvatar] = useState<boolean>(false);
    const [avatarFallback, setAvatarFallback] = useState<string>('');
    const [repetitions, setRepetitions] = useState<number>(0);
    const classNames = clsx({ [styles.moveAvatar]: moveAvatar, [styles.background]: background });
    const handleErrorImage = () => {
        console.log('ko');

        setAvatarFallback(Fallback);
        setRepetitions((pev) => pev + 1);
        if (repetitions >= 2) {
            setAvatar(true);
        } else {
            setAvatar(false);
        }
    };
    const events = {
        onClick,
    };
    console.log(avatarFallback);

    return (
        <>
            {imageEditor ? (
                <AvatarEditor
                    image={avatarFallback || image}
                    width={width}
                    height={height}
                    border={border}
                    borderRadius={borderRadius}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={1}
                    className={classNames}
                    rotate={0}
                    onLoadFailure={handleErrorImage}
                />
            ) : avatar ? (
                <FaUserCircle />
            ) : (
                <img
                    {...events}
                    className={clsx(styles.avatarUser)}
                    src={avatarFallback || src}
                    alt={alt}
                    onError={handleErrorImage}
                />
            )}
        </>
    );
};

export default memo(Avatar);
