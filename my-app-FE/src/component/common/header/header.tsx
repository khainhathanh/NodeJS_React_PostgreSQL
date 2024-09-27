'use client'
import { signOut } from "next-auth/react";
import Button from "../button/button";
import { useAccessControl } from "../accessControl/useAccessControl";

function Header(){
    const { status, session} = useAccessControl();
    return (
        <nav className="navbar navbar-dark bg-mynav">
            <div className="container-fluid " >
            <a className="navbar-brand" >My App</a>
            {status === 'authenticated'&& 
                <>
                    <a className="profile" >{session?.user.name}</a>
                    <Button 
                    className = 'btn btn-logout' 
                    onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}/>
                </>
            }
            </div>
        </nav>
    )
}
export default Header;