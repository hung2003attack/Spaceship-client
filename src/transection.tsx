import { useTransition, useState } from 'react';

function Ap() {
    const [isPending, startTransition] = useTransition();
    const [count, setCount] = useState(0);
    console.log(isPending);

    function handleClick() {
        startTransition(() => {
            setCount((c) => c + 1);
        });
    }

    return (
        <div>
            <button onClick={handleClick} style={{ fontSize: '50px' }}>
                {count}
            </button>
            {isPending && <div>ok</div>}
        </div>
    );
}
export default Ap;
