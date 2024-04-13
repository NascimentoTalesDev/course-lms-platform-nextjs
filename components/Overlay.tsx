import React, { MouseEventHandler } from "react";

interface OverlayProps{
    onClick: MouseEventHandler<HTMLDivElement>;
}

const Overlay:React.FC<OverlayProps> = ({onClick}) => {
    return (
        <div onClick={onClick} className="absolute z-20 top-0 left-0 w-full h-full">
            
        </div>
    );
}
 
export default Overlay;