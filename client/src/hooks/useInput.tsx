import { useState } from "react";

export default function useInput (initialValue?:string) {
    const [value, setValue] = useState<string|undefined>(initialValue);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange: handleChange
    };
};