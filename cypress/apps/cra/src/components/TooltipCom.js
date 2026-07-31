import { Button, Tooltip } from "@sit-canvas/canvas-react"

const TooltipCom = () => {
    return (
        <Tooltip content="This is a sample Tooltip">
            <Button>
                Hover me!
            </Button>
        </Tooltip>
    )
}

export default TooltipCom;
