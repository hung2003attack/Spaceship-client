import {
    BirthI,
    FriendI,
    GenderMaleI,
    HeartI,
    HeartMI,
    LocationI,
    PeopleI,
    StarI,
    WorkingI,
} from '~/assets/Icons/Icons';
import { Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { Div, H3, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivTitleP } from './styleLayout';
import { useRef, useState } from 'react';
import UserBar from 'src/mainPage/personalPage/layout/UserBar';
import { useCookies } from 'react-cookie';
import userAPI from '~/restAPI/requestServers/accountRequest/userAPI';

export interface PropsTitleP {
    position: string;
    star: number;
    love: number;
    visit: number;
    follow: number;
    following: number;
    friends: number;
}
const Title: React.FC<{
    colorText: string;
    colorBg: number;
    data: PropsTitleP;
    status: string;
    id_o: string | null;
    id_f: string | null;
    level: number | null;
    resTitle: {
        star: number;
        love: number;
        viste: number;
        followed: number;
        following: number;
    };
    id_loved: string;
}> = ({ colorText, colorBg, data, status, id_o, id_f, level, resTitle, id_loved }) => {
    const [cookies, setCookies] = useCookies(['k_user', 'tks']);
    const [position, setPosition] = useState<number>(0);
    const offset = useRef<number>(0);
    const limit = 2;
    console.log(data, 'datattt');
    const userId = cookies.k_user;
    const token = cookies.tks;
    const itemsT: { icon: React.ReactElement; key: number; qt: number; css?: string | undefined }[] = [
        { icon: <StarI />, key: 1, qt: data.star },
        {
            icon: <HeartMI />,
            css: id_loved === userId ? 'color: #c73434 !important' : '',
            key: 2,
            qt: resTitle.love || data.love,
        },
        { icon: <FriendI />, key: 3, qt: data.friends },
        { icon: <PeopleI />, key: 4, qt: data.visit },
    ];
    const itemsP = [
        { icon: 'Followed', key: 5, qt: data.follow },
        { icon: 'Following', key: 6, qt: data.following },
    ];
    const handlePosition = async (id: number) => {
        const res = await userAPI.getMore(token, offset.current, limit);

        setPosition(id);
    };
    return (
        <DivTitleP>
            <Div>
                {itemsT.map((i) => (
                    <Div
                        key={i.key}
                        width="50px"
                        wrap="wrap"
                        onClick={() => handlePosition(i.key)}
                        css={`
                            justify-content: center;
                            align-items: center;
                            font-size: 20px;
                            color: ${colorText};
                            div {
                                color: ${i.key === 3 && [id_o, id_f].includes(userId) && level === 2
                                    ? '#257fc2'
                                    : colorText};
                            }
                            @media (min-width: 768px) {
                                font-size: 22px;
                            }
                            @media (min-width: 1280px) {
                                font-size: 24px;
                            }
                        `}
                    >
                        <Div
                            width="100%"
                            css={`
                                align-items: center;
                                justify-content: center;
                                ${i.css};
                                cursor: var(--pointer);
                            `}
                        >
                            {i.icon}
                        </Div>
                        <P z="1.3rem">{i.qt < 0 ? 0 : i.qt}</P>
                    </Div>
                ))}{' '}
            </Div>
            <Div
                css={`
                    width: 165px;
                    justify-content: space-around;
                    margin-top: 10px;
                    @media (min-width: 495px) {
                        margin: 0;
                    }
                `}
            >
                {itemsP.map((i) => (
                    <Div
                        key={i.key}
                        width="50px"
                        wrap="wrap"
                        css={`
                            justify-content: center;
                            align-items: center;
                            font-size: 1.5rem;
                            color: ${colorText};
                        `}
                    >
                        <Div width="100%" css="align-items: center; justify-content: center; ">
                            <H3 css="font-size: 1.5rem; cursor: var(--pointer); " onClick={() => handlePosition(i.key)}>
                                <a href={`#title${i.key}`}> {i.icon}</a>
                            </H3>
                        </Div>
                        <P z="1.3rem">{i.qt}</P>
                    </Div>
                ))}
            </Div>
            <Div
                width="100%"
                wrap="wrap"
                css={`
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #727272b0;
                    color: ${colorText};
                `}
            >
                <Div width="100%" css=" align-items: center; font-size: 20px; margin-bottom: 4px;">
                    <Div width="20px" css="margin-right: 2px;">
                        <LocationI />
                    </Div>
                    <P css="font-size: 1.4rem; margin-top: 2.5px;">Tôt Động, Chương Mỹ, Hà Nội</P>
                </Div>
                <Div width="100%" css=" align-items: center;  font-size: 20px; margin-bottom: 4px;">
                    <Div width="20px" css="margin-right: 2px;">
                        <GenderMaleI />
                    </Div>
                    <P css="font-size: 1.4rem; margin-top: 2.5px;">Male</P>
                </Div>{' '}
                <Div width="100%" css=" align-items: center;  font-size: 18px; margin-bottom: 4px;">
                    <Div width="20px" css="margin-right: 2px;">
                        <WorkingI />
                    </Div>
                    <P css="font-size: 1.4rem; margin-top: 2.5px;">Developer</P>
                </Div>
                <Div width="100%" css=" align-items: center;  font-size: 18px; margin-bottom: 4px;">
                    <Div width="20px" css="margin-right: 2px;">
                        <BirthI />
                    </Div>
                    <P css="font-size: 1.4rem; margin-top: 2.5px;">05/07/2003</P>
                </Div>
                <Div width="100%" css=" align-items: center;  font-size: 18px; margin-bottom: 4px;">
                    <Div width="20px" css="margin-right: 2px;">
                        <HeartMI />
                    </Div>
                    <P css="font-size: 1.4rem; margin-top: 2.5px;">Single</P>
                </Div>
            </Div>
            {position > 0 && (
                <UserBar
                    id_loved={id_loved}
                    colorBg={colorBg}
                    colorText={colorText}
                    position={position}
                    setPosition={setPosition}
                />
            )}
        </DivTitleP>
    );
};
export default Title;
