import { memo } from 'react';
import Avatar from '../Avatars/Avatar';
import { DivContainer, DivImg, Hname } from '../styleComponents/styleComponents';
import { Button } from '../styleComponents/styleDefault';
interface PropsTagP {
    data: {
        id: string;
        fullName: string;
        nickName: string | undefined;
        avatar: string | undefined;
        gender: number;
    };
    onClick: (id: string) => void;
    button?: boolean;
    margin?: string;
    bg?: string;
}
const TagProfle: React.FC<PropsTagP> = ({ data, onClick, button = false, margin, bg }) => {
    console.log('1');
    return (
        <DivContainer width="138px" bg={bg} wrap="wrap" margin={margin}>
            <DivContainer wrap="wrap" bg=" #fffffff2">
                <DivImg>
                    <Avatar src={data.avatar} alt={data.fullName} gender={data.gender} />
                </DivImg>
                <Hname>{data.fullName}</Hname>
            </DivContainer>
            {button && (
                <DivContainer padding="10px 0 0 0" content="space-evenly">
                    <Button
                        size="1.2rem"
                        padding="3.5px 9.5px"
                        bk="#f6f6f6"
                        color="var(--color-text-dark)"
                        onClick={() => onClick(data.id)}
                    >
                        View
                    </Button>
                    <Button
                        size="1.2rem"
                        padding="3.5px 9.5px"
                        bk="#f6f6f6"
                        color="var(--color-text-dark)"
                        onClick={() => onClick(data.id)}
                    >
                        Select
                    </Button>
                </DivContainer>
            )}
        </DivContainer>
    );
};
export default memo(TagProfle);
