import React, { PropsWithChildren } from "react";
import { CSSProperties } from "react"

export interface DraggableIconProps extends PropsWithChildren{
    style?: CSSProperties, className?: string
}

const DraggableIcon: React.FC<DraggableIconProps> = ({ style, className, children }) =>{
    return (<div className={className} style={{cursor:"pointer", ...style}}>{children}</div>);
}

export default DraggableIcon;