import NextListWeb, { PropsListWeb } from './listWebs/ListWebs';
import Profile from './profiles/profile';
interface PropsOps extends PropsListWeb {
    options: boolean;
    darkShining: boolean;
}
const CurrentOptions: React.FC<PropsOps> = ({ options, data, darkShining }) => {
    return <>{options ? <Profile /> : <NextListWeb data={data} darkShining={darkShining} />}</>;
};
export default CurrentOptions;
