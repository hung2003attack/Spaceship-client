import clsx from 'clsx';
import React, { memo, useState, useEffect } from 'react';

import styles from './avatar.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import Images from '../../assets/images';
import AvatarEditor from 'react-avatar-editor';
import { Img } from '../styleComponents/styleDefault';
import { useDispatch } from 'react-redux';
import { onPersonalPage, onSetting, setIdUser } from '~/redux/hideShow';
import styled from 'styled-components';
import { DivImg } from '../styleComponents/styleComponents';

interface _Avatar {
    id?: string;
    src?: string | undefined;
    alt?: string | undefined;
    fallback?: any;
    width?: string;
    radius?: string;
    gender?: any;
    onClick?: () => void;
}

const Avatar: React.FC<_Avatar> = ({
    id,
    src,
    alt,
    width,
    radius,
    gender = false,
    fallback: Fallback = gender === 0 ? Images.defaultAvatarMale : gender === 1 ? Images.defaultAvatarFemale : '',
    onClick,
}) => {
    console.log('av', src);
    const dispatch = useDispatch();
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
    const events = {
        onClick,
    };
    const handleOpentProfile = () => {
        dispatch(setIdUser([id]));
        dispatch(onPersonalPage());
    };
    useEffect(() => {
        if (!src) setAvatarFallback(Fallback);
    }, []);
    return avatar ? (
        <FaUserCircle />
    ) : (
        <DivImg width={width} {...events}>
            <Img
                src={avatarFallback || src}
                alt={alt}
                onError={handleErrorImage}
                radius={radius}
                onClick={handleOpentProfile}
            />
        </DivImg>
    );
};

export default memo(Avatar);
