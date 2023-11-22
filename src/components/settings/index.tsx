import React, { CSSProperties, MouseEvent, PropsWithChildren, ReactElement, useCallback, useEffect, useRef, useState } from "react"
import DraggableIcon, { DraggableIconProps } from "./dragagble";
import { bounds } from "../../utils";
import "../../assets/styles/settings.scss";

export interface SettingsProps extends PropsWithChildren{
    style?: CSSProperties, className?: string, boundsLeft?: number, 
    boundsRight?: number, boundsTop?: number, boundsBottom?: number
}

const Settings: React.FC<SettingsProps> & { Icon: React.FC<DraggableIconProps> } = (props: SettingsProps) =>{
    const [values, setValues] = useState<{top?: string, left?: string , width?:string, height?:string }>();
    const [isDragging, setDragging] = useState(false);

    let icon: ReactElement<DraggableIconProps> | undefined;
    let contents: Array<any> = [];
    
    React.Children.map(props.children, (child) => {
        if(React.isValidElement(child) && child.type === DraggableIcon) {
            icon = child as ReactElement<DraggableIconProps>; 
        }else {
            contents.push(child);
        }
    });

    const draggableRef = useRef<HTMLDivElement>(null);
    const draggableCallback = useCallback(()=>{
        if(draggableRef.current){
            document.documentElement.style.setProperty('--draggable-width', `${draggableRef.current.offsetWidth}px`);
            document.documentElement.style.setProperty('--draggable-height', `${draggableRef.current.offsetHeight}px`);
            document.documentElement.style.setProperty('--draggable-left', `${window.innerWidth - draggableRef.current.offsetWidth}px`);
            document.documentElement.style.setProperty('--draggable-top', `60px`);
        }
    }, [draggableRef.current]);

    const containerRef = useRef<HTMLDivElement>(null);
    const containerCallback = useCallback(()=>{
        if(containerRef.current){
            document.documentElement.style.setProperty('--container-width', `${containerRef.current.offsetWidth}px`);
            document.documentElement.style.setProperty('--container-left', `${window.innerWidth}px`);
        }
    }, [containerRef.current]);

    useEffect(()=>{
        draggableCallback();
        containerCallback();
    }, [draggableRef.current, containerRef.current]);

    const mouseDown = (event: MouseEvent<HTMLDivElement>)=>{
        event = event || window.event;
        event.preventDefault();
        
        const draggable = draggableRef.current as HTMLDivElement;
        
        let [initX, initY] = [event.clientX, event.clientY];

        let finalboundsLeft = props.boundsLeft || 0;
        let finalboundsTop = props.boundsTop || 0;

        document.onmouseup = (innerEvent: any) =>{
            innerEvent = innerEvent || window.event;
            innerEvent.preventDefault();

            document.onmouseup = null;
            document.onmousemove = null;

            setDragging(false);

            let width = draggable.offsetWidth;
            let height = draggable.offsetHeight;
            let finalboundsRight = props.boundsRight || window.innerWidth - width;

            
            let finalLeft = ((initX >= window.innerWidth/2) ? (finalboundsRight) : finalboundsLeft) + "px";

            let finalWidth = width + "px";
            let finalTop = draggable.offsetTop + "px";
            let finalHeight = height + "px";

            setValues({left: finalLeft, width: finalWidth, top: finalTop, height: finalHeight });
        }

        document.onmousemove = (innerEvent: any) =>{
            innerEvent = innerEvent || window.event;
            innerEvent.preventDefault();

            setDragging(true);

            let width = draggable.offsetWidth;
            let height = draggable.offsetHeight;

            let finalboundsRight = props.boundsRight || window.innerWidth - width;
            let finalboundsBottom = props.boundsBottom || window.innerHeight - height;

            const drag = { x: initX - innerEvent.clientX, y: initY - innerEvent.clientY};
            
            const finalTop = bounds(draggable.offsetTop - drag.y, finalboundsTop, finalboundsBottom) + "px";
            const finalHeight = height + "px";

            const finalLeft = bounds(draggable.offsetLeft - drag.x, finalboundsLeft, finalboundsRight) + "px";
            const finalWidth = width + "px";

            //console.log( finalboundsBottom);

            [initX, initY] = [innerEvent.clientX, innerEvent.clientY];
            setValues({top: finalTop, height: finalHeight, left: finalLeft, width: finalWidth});
        }

    }

    return (
        <div className={props.className} style={{position:"fixed", zIndex: 200, display:"flex", flexDirection: "column", ...props.style }}>
            <div ref={draggableRef} onMouseDown={mouseDown} style={{ cursor: isDragging ? "grabbing" : "pointer", ...values }} >{icon}</div>
            { !isDragging && (<div className="settings-contents" ref={containerRef}>{ contents }</div>) }
        </div>
    );
}

Settings.Icon = DraggableIcon;

export default Settings;