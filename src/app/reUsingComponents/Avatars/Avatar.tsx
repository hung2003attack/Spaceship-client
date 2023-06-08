import clsx from 'clsx';
import React, { memo, useState, useEffect, useLayoutEffect, useCallback } from 'react';

import { FaUserCircle } from 'react-icons/fa';
import Images from '../../assets/images';
import { Img } from '../styleComponents/styleDefault';
import { useDispatch, useSelector } from 'react-redux';
import { DivImg } from '../styleComponents/styleComponents';
import { InitialStateHideShow, onPersonalPage, onSetting, setIdUser } from '../../redux/hideShow';
import CommonUtils from '~/utils/CommonUtils';

interface _Avatar {
    id?: string;
    src?: any;
    alt?: string | undefined;
    fallback?: any;
    width?: string;
    radius?: string;
    gender?: any;
    onClick?: (args: any) => void;
    css?: string;
    profile?: boolean;
}

const Avatar: React.FC<_Avatar> = ({
    id,
    src,
    alt,
    width,
    radius,
    gender = false,
    fallback: Fallback = gender === 0 ? Images.defaultAvatarMale : gender === 1 ? Images.defaultAvatarFemale : null,
    onClick,
    css,
    profile = false,
}) => {
    console.log('av', gender, Fallback);
    const dispatch = useDispatch();
    const [idUser] = useSelector((state: { hideShow: InitialStateHideShow }) => state.hideShow.idUser);
    const [avatar, setAvatar] = useState<boolean>(false);
    const [avatarFallback, setAvatarFallback] = useState<string>(!src ? Fallback : src);
    const [repetitions, setRepetitions] = useState<number>(0);
    const [srss, setSrss] = useState(() => CommonUtils.convertBase64(src));
    const handleErrorImage = () => {
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
    console.log(src, 'src');

    const handleOpentProfile = () => {
        if (profile) dispatch(setIdUser([id]));
    };
    console.log(src, 'ssc');

    return avatar ? (
        <FaUserCircle />
    ) : (
        <DivImg width={width} css={css} {...events}>
            <Img
                src={src || avatarFallback}
                alt={alt}
                onError={handleErrorImage}
                radius={radius}
                onClick={handleOpentProfile}
            />
        </DivImg>
    );
};

export default memo(Avatar);
