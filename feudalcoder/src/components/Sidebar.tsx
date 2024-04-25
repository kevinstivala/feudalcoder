import Image from "next/image";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const sidebarItems =[
    {
        name: "Home",
        href: "/",
        icon: AiOutlineHome,
    },
    {
        name: "About",
        href: "/about",
        icon: BsPeople,
    },
    {
        name: "Mails",
        href: "/mails",
        icon: FiMail,
    },
    {
        name: "Contact",
        href: "/contact",
        icon: TiContacts,
    },
];

export default function Sidebar() {
    return( 
    <div>
        <aside className="sidebar">
            <div className="sidebar__top">
                <Image src="/logo.jpg" 
                width={80} 
                height={80} 
                className="sidebar__logo"
                alt="logo"
                />
                <p className="sidebar__logo-name">Feudalcoder</p>
            </div>
            <ul className="sidebar__list">
                {sidebarItems.map(({name, href, icon: Icon})=>(
                    <li className="sidebar__item" key={name}>
                    <Link href={href} className="sidebar__link">
                        <span className="sidebar__icon">
                            <Icon />
                            </span>
                        <span className="sidebar__name">{name}</span>
                    </Link>
                </li>
                ))}
            </ul>
        </aside>
    </div>
    );
}