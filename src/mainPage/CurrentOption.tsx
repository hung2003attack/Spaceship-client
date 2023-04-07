import NextListWeb, { PropsListWeb } from './listWebs/ListWebs';
import Profile from './profiles/profile';
interface PropsOps extends PropsListWeb {
    options: boolean;
}
const CurrentOptions: React.FC<PropsOps> = ({ options, data }) => {
    return <>{options ? <Profile /> : <NextListWeb data={data} />}</>;
};
export default CurrentOptions;
