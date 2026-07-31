import { ProgressBar } from "@sit-canvas/canvas-react";

const ProgressBarCom = () => {
    const now = 60;
    return <ProgressBar now={now} label={`${now}%`} />;
}

export default ProgressBarCom;
