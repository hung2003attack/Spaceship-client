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
import { useState } from 'react';
import UserBar from '~/reUsingComponents/Bar/UserBar';
interface PropsFlw {
    id: string;
    avatar: any;
    fullName: string;
    gender: number;
}
export interface PropsTitleP {
    position: string;
    star: number;
    love: number;
    visit: number;
    follow: number;
    following: number;
    flwed_data: PropsFlw[];
    flwing_data: PropsFlw[];
}
const Title: React.FC<{ colorText: string; colorBg: number; data: PropsTitleP; status: string }> = ({
    colorText,
    colorBg,
    data,
    status,
}) => {
    const [flwData, setFlwData] = useState<{ id: string; avatar: any; fullName: string; gender: number }[]>();
    console.log(data, 'datattt');
    const itemsT = [
        { icon: <StarI />, key: 1, qt: data.star },
        { icon: <HeartI />, key: 2, qt: data.love },
        { icon: <PeopleI />, key: 3, qt: data.visit },
        { icon: <FriendI />, key: 4, qt: 10 },
    ];
    const itemsP = [
        { icon: 'Followed', key: 5, qt: data.follow },
        { icon: 'Following', key: 6, qt: data.following },
    ];
    const handleFlwData = (id: number) => {
        if (id === 5) {
            setFlwData(data.flwed_data);
        }
    };
    return (
        <DivTitleP>
            <Div>
                {itemsT.map((i) => (
                    <Div
                        key={i.key}
                        width="50px"
                        wrap="wrap"
                        css={`
                            justify-content: center;
                            align-items: center;
                            font-size: 20px;
                            color: ${colorText};
                            @media (min-width: 768px) {
                                font-size: 22px;
                            }
                            @media (min-width: 1280px) {
                                font-size: 24px;
                            }
                        `}
                    >
                        <Div width="100%" css="align-items: center; justify-content: center; cursor: var(--pointer);">
                            {i.icon}
                        </Div>
                        <P z="1.3rem">{i.qt}</P>
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
                            <H3 css="font-size: 1.5rem; cursor: var(--pointer); " onClick={() => handleFlwData(i.key)}>
                                {i.icon}
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
            {flwData && <UserBar colorBg={colorBg} colorText={colorText} data={flwData} setFlwData={setFlwData} />}
        </DivTitleP>
    );
};
export default Title;