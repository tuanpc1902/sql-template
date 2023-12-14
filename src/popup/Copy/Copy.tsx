import { Button } from "antd";
import { useRef, useState } from "react";

type CopyProps = {
    content: string;
}

function Copy({content}: CopyProps){

    const [label, setLabel] = useState('Copy');
    const audioRef = useRef(new Audio('/media/sound-copy.m4a'));


    function copyToClipboard(){
        setLabel('Copied');
        navigator.clipboard.writeText(content);
        audioRef.current.play();
        setTimeout(() => {
            setLabel('Copy');
        }, 3000);
    }

    return (
        <Button onClick={copyToClipboard} className="absolute top-[15px] right-[15px]">{label}</Button>
    )
}
export default Copy;