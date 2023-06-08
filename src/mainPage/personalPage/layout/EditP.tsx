import { useState } from 'react';
import { ImageI } from '~/assets/Icons/Icons';
import { Buttons, Div } from '~/reUsingComponents/styleComponents/styleDefault';
import { Label } from '~/social_network/components/Header/layout/Home/Layout/FormUpNews/styleFormUpNews';

const EditP: React.FC<{
    editP: { name: string; id: number; icon?: { id: number; name: string }[] }[];
    onClick: (e?: any, id?: number) => void;
    onName: (id: number) => Promise<void>;
    colorText: string;
}> = ({ editP, onClick, onName, colorText }) => {
    const [more, setMore] = useState<number | null>(null);

    const handleMore = (e: any, id: number) => {
        console.log(e.target.getAttribute('id'));

        if (e.target.getAttribute('id') === 'edit') {
            if (id !== more) {
                setMore(id);
            } else {
                setMore(null);
            }
        }
    };
    // : (
    //                             <Div
    //                                 width="100%"
    //                                 css="justify-content: start; align-items: center; background-color: #2b2c2d; padding: 10px;"
    //                             >
    //                                 {ed.icon?.map((i) => (
    //                                     <Div css="font-size: 1.6rem; padding: 3px 9px; background-color: #434546; border-radius: 5px; ">
    //                                         {i.name}
    //                                     </Div>
    //                                 ))}
    //                             </Div>
    //                         )
    return (
        <>
            <Div
                wrap="wrap"
                css="background-color: #252525; position: absolute; right: 55px; top: -14px; border-radius: 5px; z-index: 2;"
            >
                {editP.map((ed) => (
                    <Div
                        key={ed.id}
                        width="100%"
                        wrap="wrap"
                        css="justify-content: center; padding: 3px; margin: 5px; background-color: #636363; font-size: 1.4rem; form{width: 100%;}"
                        onClick={(e) => handleMore(e, ed.id)}
                    >
                        <Div
                            id="edit"
                            width="100%"
                            css="cursor: pointer; justify-content: center;"
                            onClick={() => {
                                if (ed.id === 2) onName(ed.id);
                            }}
                        >
                            {ed.name}
                        </Div>
                        {more === ed.id && ed.icon && (
                            <Div
                                width="100%"
                                css="justify-content: start; align-items: center; background-color: #2b2c2d; padding: 10px;"
                            >
                                {ed.icon?.map((i) => (
                                    <Div
                                        key={i.id}
                                        css="font-size: 1.6rem; padding: 3px 9px; margin: 0 5px; background-color: #434546; border-radius: 5px; "
                                    >
                                        {i.id === 1 ? (
                                            <form encType="multipart/form-data">
                                                <input
                                                    id={`uploads${ed.id}`}
                                                    type="file"
                                                    name="file[]"
                                                    hidden
                                                    onChange={(e) => onClick(e, ed.id)}
                                                />
                                                <Label htmlFor={`uploads${ed.id}`} color={colorText}>
                                                    {i.name}
                                                </Label>
                                            </form>
                                        ) : (
                                            <Buttons
                                                text={[
                                                    {
                                                        text: i.name,
                                                        css: `color:${colorText}; box-shadow: none;`,
                                                        onClick: (e: any) => onClick(e, ed.id),
                                                    },
                                                ]}
                                            />
                                        )}
                                    </Div>
                                ))}
                            </Div>
                        )}
                    </Div>
                ))}
            </Div>
        </>
    );
};
export default EditP;
