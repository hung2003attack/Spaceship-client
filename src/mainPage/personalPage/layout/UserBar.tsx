import { FollowI, FriendI, HeartMI, PeopleI, StarI, UndoIRegister } from '~/assets/Icons/Icons';
import { DivPos } from '../../../app/reUsingComponents/styleComponents/styleComponents';
import { Div, P, Span } from '../../../app/reUsingComponents/styleComponents/styleDefault';
import Avatar from '../../../app/reUsingComponents/Avatars/Avatar';
import { useEffect, useState } from 'react';
import { Input } from '~/social_network/components/Header/layout/MakingFriends/styleMakingFriends';
import { DivSearch } from './styleLayout';
import { GiBurningBook } from 'react-icons/gi';
import { useCookies } from 'react-cookie';

const UserBar: React.FC<{
    colorText: string;
    colorBg: number;
    position: number;
    setPosition: React.Dispatch<React.SetStateAction<number>>;
    id_loved: string;
}> = ({ colorText, colorBg, position, setPosition, id_loved }) => {
    const [cookies, setCookies] = useCookies(['k_user']);
    const [search, setSearch] = useState<boolean>(false);
    const [valueS, setValueS] = useState<string>('');
    const userId = cookies.k_user;
    const handleSearch = (e: any) => {
        setValueS(e.target.value);
    };
    const dataMark = [
        { name: 'Star', icon: <StarI />, id: 1 },
        { name: 'Love', css: id_loved === userId && 'color: #c73434; !important', icon: <HeartMI />, id: 2 },
        { name: 'Friends', icon: <FriendI />, id: 3 },
        { name: 'Visit', icon: <PeopleI />, id: 4 },
        { name: 'Followed', icon: <FollowI />, id: 5 },
        { name: 'Following', icon: <FollowI />, id: 6 },
    ];
    useEffect(() => {
        const searchId = document.querySelectorAll('.searchID');
        Array.from(searchId).forEach((item) => {
            console.log(item, 'item', item.getAttribute('href'));

            if (item.getAttribute('href') === `#title${position}`) {
                item.dispatchEvent(new MouseEvent('click'));
            }
        });
    }, []);
    return (
        <Div
            onClick={(e: any) => {
                if (e.target.getAttribute('id') === 'qqq') setPosition(0);
            }}
            id="qqq"
            width="100%"
            css={`
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                justify-content: center;
                background-color: #7071717a;
                border-radius: 0;
                z-index: 2;
            `}
        >
            <Div
                width="100%"
                wrap="wrap"
                css={`
                    height: 100%;
                    align-items: unset;
                    background-color: ${colorBg === 1 ? '#181819' : '#cbc2c2'};
                    @media (min-width: 500px) {
                        width: 570px;
                    }
                `}
            >
                <DivSearch color={colorText}>
                    <DivPos size="20px" left="6px" css="padding: 3px;" onClick={() => setPosition(0)}>
                        <UndoIRegister />
                    </DivPos>
                    {search && (
                        <Input
                            color={colorText}
                            value={valueS}
                            onChange={handleSearch}
                            border="1px solid rgb(107 107 107 / 83%)"
                        />
                    )}
                    <P
                        z="1.4rem"
                        css={`
                            width: 100px;
                            text-align: center;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            ${search ? 'width: 20% ' : 'width: 100%'};
                        `}
                        onClick={() => setSearch(!search)}
                    >
                        Search <Span css="font-size: 1.1rem; display: unset">( {dataMark[position - 1].name} )</Span>
                    </P>
                </DivSearch>
                <Div
                    width="100%"
                    css={`
                        justify-content: start;
                        overflow-x: overlay;
                        margin-top: 10px;
                        padding: 3px 7px;
                        &::-webkit-scrollbar {
                            width: 0px;
                            height: 0px;
                        }
                        color: ${colorText};
                    `}
                >
                    {dataMark.map((res) => (
                        <Div
                            key={res.id}
                            width="80px"
                            onClick={() => setPosition(res.id)}
                            css={`
                                min-width: 80px;
                                align-items: center;
                                justify-content: center;
                                margin: 0 5px;
                                padding: 6px 0;
                                ${res.id === position && 'border-bottom: 1px solid #207eba;'}
                            `}
                        >
                            <a href={`#title${res.id}`} className="searchID">
                                <P z="1.4rem">{res.name}</P>
                            </a>
                            <Div
                                css={`
                                    font-size: 16px;
                                    margin: 0 3px;
                                    ${res.css}
                                `}
                            >
                                {res.icon}
                            </Div>
                        </Div>
                    ))}
                </Div>
                <Div width="100%" display="block" css="height: 94%; padding 3px 8px; overflow-y: overlay;">
                    {/* {data?.map((v) => (
                        <Div key={v.id} width="100%" css="height: 45px; padding 3px 8px; margin-top: 3px;">
                            <Div width="39px" css="margin: 0 8px 0 0">
                                <Avatar id={v.id} src={v.avatar} alt={v.fullName} gender={v.gender} radius="50%" />
                            </Div>
                            <Div css="align-items:center;">
                                <P color={colorText} z="1.5rem;">
                                    {v.fullName}
                                </P>
                            </Div>
                        </Div>
                    ))} */}
                </Div>
            </Div>
        </Div>
    );
};
export default UserBar;
