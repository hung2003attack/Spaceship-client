import { useState } from 'react';
import { EyedI, EyemI } from '~/assets/Icons/Icons';
import { Peye } from '../styleComponents/styleComponents';
interface PropsEye {
    value: string;
    setShow: React.Dispatch<
        React.SetStateAction<{
            icon: boolean;
            check: number;
        }>
    >;
    show: {
        icon: boolean;
        check: number;
    };
    top: string;
}
const Eyes: React.FC<PropsEye> = ({ value, setShow, show, top }) => {
    return (
        <>
            {show.icon && (
                <>
                    {show.check && value ? (
                        <Peye onClick={() => setShow({ ...show, check: 0 })} top={top}>
                            <EyemI />
                        </Peye>
                    ) : (
                        <Peye onClick={() => setShow({ ...show, check: 1 })} top={top}>
                            <EyedI />
                        </Peye>
                    )}
                </>
            )}
        </>
    );
};
export default Eyes;
