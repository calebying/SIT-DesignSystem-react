import { Breadcrumb, BreadcrumbItem } from "@sit-canvas/canvas-react"

const BreadcrumbCom = () => {
    return <Breadcrumb>
        <BreadcrumbItem href="https://www.designsystem.tech.gov.sg/">
            Home
        </BreadcrumbItem>
        <BreadcrumbItem href="https://github.com/calebying/SIT-DesignSystem-react/">
            Library
        </BreadcrumbItem>
        <BreadcrumbItem active>
            Data
        </BreadcrumbItem>
    </Breadcrumb>
}

export default BreadcrumbCom;
