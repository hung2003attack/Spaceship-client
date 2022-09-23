import React, { useState, useEffect } from 'react';

const useDebounce: React.FC<any> = (value, delay) => {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const handle = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounce;
};

export default useDebounce;
