import { Div } from '~/reUsingComponents/styleComponents/styleDefault';
import { Label } from '~/social_network/components/Header/layout/Home/Layout/FormUpNews/styleFormUpNews';

const EditP: React.FC<{
    editP: { name: string; id: number }[];
    onClick: (e: any, id: number) => void;
    onName: (id: number) => Promise<void>;
    colorText: string;
}> = ({ editP, onClick, onName, colorText }) => {
    return (
        <>
            <Div
                wrap="wrap"
                css="background-color: #252525; position: absolute; right: 55px; top: -14px; border-radius: 5px;"
            >
                {editP.map((ed) => (
                    <Div
                        key={ed.id}
                        width="100%"
                        css="justify-content: center; padding: 3px; margin: 5px; background-color: #636363; font-size: 1.4rem; form{width: 100%;}"
                    >
                        {ed.id === 0 || ed.id === 1 ? (
                            <form encType="multipart/form-data">
                                <input
                                    id={`uploads${ed.id}`}
                                    type="file"
                                    name="file[]"
                                    hidden
                                    onChange={(e) => onClick(e, ed.id)}
                                />
                                <Label htmlFor={`uploads${ed.id}`} color={colorText}>
                                    {ed.name}
                                </Label>
                            </form>
                        ) : (
                            <Div
                                width="100%"
                                css="cursor: pointer; justify-content: center; "
                                onClick={() => onName(ed.id)}
                            >
                                {ed.name}
                            </Div>
                        )}
                    </Div>
                ))}
            </Div>
        </>
    );
};
export default EditP;
