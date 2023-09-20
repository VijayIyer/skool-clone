import {useEffect, useState} from "react";

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        setDebouncedValue(value)
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 1000);

        return () => {
            clearTimeout(timer);
        }
    },[value, delay])

    return debouncedValue;
}

export default useDebounce;