import React from 'react';
import clsx from 'clsx';
import styles from './icon.module.scss';
import { BsThreeDotsVertical, BsBook, BsCheck2, BsPhone } from 'react-icons/bs';
import {
    IoImagesOutline,
    IoLogoYoutube,
    IoCloseOutline,
    IoLanguageOutline,
    IoArrowUndoCircleOutline,
} from 'react-icons/io5';
import { BiDotsHorizontalRounded, BiUser } from 'react-icons/bi';
import { FcSignature } from 'react-icons/fc';
import { SiExpertsexchange } from 'react-icons/si';
import { AiOutlineSetting, AiOutlineHome, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { GiNewspaper } from 'react-icons/gi';
import { MdWorkOutline, MdNotificationsPaused, MdEmojiPeople } from 'react-icons/md';
import { FaTelegram, FaPeopleArrows, FaAddressCard, FaUserFriends } from 'react-icons/fa';
import { RiDragMoveFill } from 'react-icons/ri';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { CgWebsite } from 'react-icons/cg';

export const HomeI = () => <AiOutlineHome />;
export const ImageI = () => <IoImagesOutline />;
export const ExchangeI = () => <SiExpertsexchange />;
export const VideoI = () => <IoLogoYoutube />;
export const FixI = () => <BsThreeDotsVertical />;
export const CloseI = () => <IoCloseOutline />;
export const SettingI = () => <AiOutlineSetting />;
export const LanguageI = () => <IoLanguageOutline />;
export const NewI = () => <GiNewspaper />;
export const BookI = () => <BsBook />;
export const WorkI = () => <MdWorkOutline />;
export const SendI = () => <FaTelegram />;
export const MoveI = () => <RiDragMoveFill />;
export const UndoI = () => <IoArrowUndoCircleOutline />;

export const EyemI = () => <AiOutlineEye />;
export const EyedI = () => <AiOutlineEyeInvisible />;
export const NotificationI = () => <MdNotificationsPaused />;
export const SignatureI = () => <FcSignature />;
export const CheckI = () => <BsCheck2 />;
export const EmailI = () => <AiOutlineMail />;
export const PhoneI = () => <BsPhone />;
export const LGBTI = () => <FaPeopleArrows />;
export const UndoIRegister = () => <TbArrowNarrowLeft />;
export const ProfileI = () => <FaAddressCard />;
export const WebsiteI = () => <CgWebsite />;
export const DotI = () => <BiDotsHorizontalRounded />;
export const FriendI = () => <FaUserFriends />;
export const PeopleI = () => <MdEmojiPeople />;
export const UserI = () => <BiUser />;
const CallVideoI: React.FC = () => {
    return (
        <div className={clsx(styles.callVideo)}>
            <MdEmojiPeople />
            <div className={clsx(styles.guests)}>
                <div className={clsx(styles.guest1)}>
                    <BiUser />
                </div>
                <div className={clsx(styles.guest2)}>
                    <BiUser />
                </div>
                <div className={clsx(styles.guest3)}>
                    <BiUser />
                </div>
                <div className={clsx(styles.guest4)}>
                    <BiUser />
                </div>
                <div className={clsx(styles.guest5)}>
                    <BiUser />
                </div>
            </div>
        </div>
    );
};
export default CallVideoI;
