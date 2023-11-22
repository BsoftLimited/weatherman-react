export default class DragManager{
    private onDragListener?: (dragX: number, dragY: number)=>void;
    private onHoverListener?: (hover: boolean, x: number, y: number)=>void;
    private element: HTMLElement;
    private initX: number;
    private initY: number;
    private isDraging = false;
    
    constructor(element: HTMLElement){
        this.element = element;
        this.initX = 0;
        this.initY = 0;
        this.element.onmousedown = this.mouseDown;
        this.element.onmouseleave = this.mouseLeave;
        this.element.onmousemove = this.mouseMove;
    }

    mouseLeave = () =>{
        if(this.onHoverListener){
            this.onHoverListener(false, 0, 0);
        }
    }

    mouseUp = (event: any) =>{
        event = event || window.event;
        event.preventDefault();

        document.onmouseup = null;
        document.onmousemove = null;
        this.element.style.cursor = "pointer";
        this.isDraging = false;
    }

    mouseDown = (event: any) =>{
        event = event || window.event;
        event.preventDefault();
        this.isDraging = true;

        this.element.style.cursor = "grabbing";

        [this.initX, this.initY] = [event.clientX, event.clientY];

        document.onmouseup = this.mouseUp;
        document.onmousemove = this.mouseMove;
    }

    mouseMove = (event: any) =>{
        //event = event || window.event;
        event.preventDefault();

        if(this.isDraging){
            const [dragX, dragY] = [event.clientX - this.initX, event.clientY - this.initY];
            [this.initX, this.initY] = [event.clientX, event.clientY];
            if(this.onDragListener){
                this.onDragListener(dragX, dragY);
            }
        }else if(this.onHoverListener){
            //console.log(`hover x:${event.clientX - this.element.offsetLeft}, y:${event.clientY - this.element.offsetTop}`)
            this.onHoverListener(true, event.clientX - this.element.offsetLeft - 80, event.clientY - this.element.offsetTop - 80);
        }
    }

    setDragListener = (onDragListener?: (dragX: number, dragY: number)=>void) => this.onDragListener = onDragListener;
    setHoverListener = (onHoverListener?: (hover: boolean, dragX: number, dragY: number)=>void) => this.onHoverListener = onHoverListener;
}