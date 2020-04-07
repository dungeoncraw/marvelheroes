import { useState } from "react";

export const useVisible = (initialState: boolean = false) => {
    const [visible, setVisible] = useState(initialState);
    const onChange = (b: boolean = !visible) => { setVisible(b); };
    const onClick = () => { setVisible(!visible); };
    return {
        value: visible,
        onChange: onChange,
        onClick: onClick
    };
};