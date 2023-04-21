import { DivContainer } from '~/reUsingComponents/styleComponents/styleComponents';
import { DivNews } from './stylePost';

interface PropsPosts {
    colorBg: string;
    colorText: string;
}
const Posts: React.FC<PropsPosts> = ({ colorBg, colorText }) => {
    return (
        <DivContainer width="100%" display="inline-grid" wrap="wrap" content="center" margin="85px">
            <DivNews>Xin chào mọi nguòi</DivNews>
            <DivNews>Xin chào mọi nguòi</DivNews>
            <DivNews>Xin chào mọi nguòi</DivNews>
            <DivNews>Xin chào mọi nguòi</DivNews>
        </DivContainer>
    );
};
export default Posts;
