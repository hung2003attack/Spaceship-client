import { FriendI, HeartI, PeopleI, StarI } from '~/assets/Icons/Icons';
import { Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { Div, H3, P } from '~/reUsingComponents/styleComponents/styleDefault';
import { DivTitleP } from './styleLayout';
export interface PropsTitleP {
    position: string;
    star: number;
    love: number;
    visit: number;
    follow: number;
    following: number;
}
const Title: React.FC<{ colorText: string; colorBg: number; data: PropsTitleP }> = ({ colorText, colorBg, data }) => {
    console.log(data, 'datattt');
    const itemsT = [
        { icon: <StarI />, key: 2, qt: data.star },
        { icon: <HeartI />, key: 3, qt: data.love },
        { icon: <PeopleI />, key: 4, qt: data.visit },
        { icon: <FriendI />, key: 5, qt: 10 },
    ];
    const itemsP = [
        { icon: 'Followed', key: 1, qt: data.follow },
        { icon: 'Following', key: 2, qt: data.following },
    ];

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
                            <H3 css="font-size: 1.5rem;">{i.icon}</H3>
                        </Div>
                        <P z="1.3rem">{i.qt}</P>
                    </Div>
                ))}
            </Div>
        </DivTitleP>
    );
};
export default Title;
