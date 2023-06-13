import { UndoIRegister } from '~/assets/Icons/Icons';
import { DivPos } from '../styleComponents/styleComponents';
import { Div, P } from '../styleComponents/styleDefault';
import { DivSearch } from './styleBar';
import Avatar from '../Avatars/Avatar';
import { useState } from 'react';
import { Input } from '~/social_network/components/Header/layout/MakingFriends/styleMakingFriends';

const UserBar: React.FC<{
    colorText: string;
    colorBg: number;
    data: { id: string; avatar: any; fullName: string; gender: number }[] | undefined;
    setFlwData: React.Dispatch<
        React.SetStateAction<
            | {
                  id: string;
                  avatar: any;
                  fullName: string;
                  gender: number;
              }[]
            | undefined
        >
    >;
}> = ({ colorText, colorBg, data, setFlwData }) => {
    const [search, setSearch] = useState<boolean>(false);
    const [valueS, setValueS] = useState<string>('');
    const handleSearch = (e: any) => {
        setValueS(e.target.value);
    };
    return (
        <DivPos
            width="100%"
            position="fixed"
            top="0"
            left="0"
            css={`
                background-color: #7071717a;
                border-radius: 0;
                z-index: 1;
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
                        width: 500px;
                    }
                `}
            >
                <DivSearch color={colorText}>
                    <DivPos size="20px" left="6px" css="padding: 3px;" onClick={() => setFlwData(undefined)}>
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
                            text-align: center;
                            ${search ? 'width: 20% ' : 'width: 100%'};
                        `}
                        onClick={() => setSearch(!search)}
                    >
                        Search
                    </P>
                </DivSearch>
                <Div width="100%" display="block" css="height: 94%; padding 3px 8px; overflow-y: overlay;">
                    {data?.map((v) => (
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
                    ))}
                </Div>
            </Div>
        </DivPos>
    );
};
export default UserBar;
