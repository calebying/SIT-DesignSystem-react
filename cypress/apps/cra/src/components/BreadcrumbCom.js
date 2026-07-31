import { Breadcrumb } from "@sit-canvas/canvas-react"

const BreadcrumbCom = () => {
    return <Breadcrumb>
        <Breadcrumb.Item href="https://www.designsystem.tech.gov.sg/">
            Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="https://github.com/calebying/SIT-DesignSystem-react/">
            Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
            Data
        </Breadcrumb.Item>
    </Breadcrumb>
}

export default BreadcrumbCom;
