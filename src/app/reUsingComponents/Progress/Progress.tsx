import { Div, H3 } from '../styleComponents/styleDefault';

const Progress: React.FC<{ title: { vn: string; en: string } }> = ({ title }) => {
    return (
        <Div
            width="100%"
            css="height: 100%; align-items: center; text-align: center; justify-content: center; background-color: #202124; color: #cbcbcb "
        >
            <H3 css="padding: 5px">
                {title.vn} <p>( {title.en} )</p>
            </H3>
        </Div>
    );
};
export default Progress;
