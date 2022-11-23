import clsx from 'clsx';
import React, { memo, useState, useEffect } from 'react';

import styles from './avatar.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import Images from '../../assets/images';
import AvatarEditor from 'react-avatar-editor';
import { DivUserBar } from '../styleComponents/styleComponents';

interface _Avatar {
    src?: string | undefined;
    alt?: string | undefined;
    fallback?: any;
    width?: string;
    gender?: any;
}

const Avatar: React.FC<_Avatar> = ({
    src,
    alt,
    width,
    gender = false,
    fallback: Fallback = gender === 0 ? Images.defaultAvatarMale : gender === 1 ? Images.defaultAvatarFemale : '',
}) => {
    console.log('av', src);

    const [avatar, setAvatar] = useState<boolean>(false);
    const [avatarFallback, setAvatarFallback] = useState<string>('');
    const [repetitions, setRepetitions] = useState<number>(0);
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
    console.log(avatarFallback, src, avatar);
    useEffect(() => {
        if (!src) setAvatarFallback(Fallback);
    }, []);
    return avatar ? (
        <FaUserCircle />
    ) : (
        <DivUserBar width={width}>
            <img src={avatarFallback || src} alt={alt} onError={handleErrorImage} />
        </DivUserBar>
    );
};

export default memo(Avatar);
