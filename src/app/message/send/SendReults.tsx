import Avatar from '~/reUsingComponents/Avatars/Avatar';
import { Hname } from '~/reUsingComponents/styleComponents/styleComponents';
import { Div, P } from '~/reUsingComponents/styleComponents/styleDefault';

const ListAccounts: React.FC<{ colorText: string; colorBg: number }> = ({ colorText, colorBg }) => {
    return (
        <Div
            width="100%"
            css="height: 50px; align-items: center; padding: 0 3px; margin: 5px 0; @media(min-width: 768px) {cursor: var(--pointer); &:hover{background-color: #484848ba;}}"
        >
            <Avatar
                src="https://pbs.twimg.com/media/DefM3PPXcAABTmm.jpg"
                gender={0}
                radius="50%"
                css="min-width: 40px; width: 40px; height: 40px; margin: 3px 5px; "
            />
            <Div
                width="84%"
                wrap="wrap"
                css={`
                    color: ${colorText};
                `}
            >
                <Hname>Nguyen Trong Hung</Hname>
                <Div width="80%" css="align-items: center;">
                    <Avatar
                        src="https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg"
                        gender={0}
                        radius="50%"
                        css="min-width: 17px; width: 17px; height: 17px; margin-right: 5px;"
                    />
                    <P
                        z="1.2rem"
                        css="width: 100%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-top: 3px; "
                    >
                        but I don't know'
                    </P>
                    <P z="1.2rem">3h</P>
                </Div>
            </Div>
        </Div>
    );
};
export default ListAccounts;
