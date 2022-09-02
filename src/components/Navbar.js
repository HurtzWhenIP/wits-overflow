import '../styles/Navbar.css'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import {FcSettings,FcImport,FcContacts} from 'react-icons/fc'
import useStore from '../hooks/useStore';

export function NavItem({icon,path,clickable,children}){
    
    const [open,setOpen] = useState(false);

    return(
        <li className='nav-item'>
            <Link className="icon-button" to={path} onClick={() => {setOpen(!open)}}>
                {icon}
            </Link>
            {clickable && open && children}
        </li>
    );
}

export function Navbar({children}){
    return(
        <nav className="navbar">
            <ul className="navbar-nav ul">{children}</ul>
        </nav>
    );
}

export function DropdownMenu(){

    const setUserobj = useStore(state => {return(state.setUserobj)})

    const style = {"background-color": "inherit"}

    function DropdownItem({children,icon,path,log}){

        const logout = () => {
            if(log){
                setUserobj(null);
            }
        }

        return(
            <Link className='menu-item' to={path} onClick={logout}>
                <span className='icon-button' style={style}>{icon}</span>
                {children}
            </Link>
        )
    }

    return(
        <div className='dropdown'>
            <DropdownItem icon={<FcContacts size={65}/>} path="/profile">Profile</DropdownItem>
            <DropdownItem icon={<FcImport size={65}/>} path="#" log={true}>Log-out</DropdownItem>
            <DropdownItem icon={<FcSettings size={65}/>} path="/settings">Settings</DropdownItem>
        </div>
    )
}