import Avatar from '../Avatars&Edeter/Avatar';
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
}
const TagProfle: React.FC<PropsTagP> = ({ data }) => {
    const css2 = `padding: 1.5px 4px`;
    return (
        <DivContainer width="138px" bk="#595959e0" wrap="wrap" margin="5px">
            <DivContainer wrap="wrap" bk=" #fffffff2">
                <DivImg>
                    <Avatar src={data.avatar} alt={data.fullName} gender={data.gender} />
                </DivImg>
                <Hname>{data.fullName}</Hname>
            </DivContainer>
            <DivContainer padding="10px 0 0 0" content="space-evenly">
                <Button size="1.2rem" padding="3.5px 9.5px" bk="#f6f6f6" color="var(--color-text-dark)">
                    View
                </Button>
                <Button size="1.2rem" padding="3.5px 9.5px" bk="#f6f6f6" color="var(--color-text-dark)">
                    Select
                </Button>
            </DivContainer>
        </DivContainer>
    );
};
export default TagProfle;
