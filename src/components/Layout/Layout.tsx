import { ReactNode, FC } from "react"
import './Layout.scss'

interface LayoutProps {
    children: ReactNode
    Navbar: ReactNode
}

export const Layout: FC<LayoutProps> = ({children, Navbar}) => (
    <div className="layout">
        <nav className="layout__navbar">
            { Navbar }
        </nav>

        <div className="layout__content">
            {children}
        </div>
    </div>
)
