import Link from 'next/link'
import {signIn , signOut, useSession } from 'next-auth/client'

const Navbar = () => {
    const [session , loading] = useSession()
    return (
        <nav className="flex justify-between shadow-xl pt-2 pb-2">
            <h1 className="m-0 text-3xl text-blue-900 pt-1 pb-1 pl-4 pr-3 text-center block uppercase">
                <a href="#" > NextAuth</a>
            </h1>
            <ul className={`flex mt-3  uppercase text-center block ${!session && loading ? 'opacity-0 transition duration-400 ease-in' : 'opacity-100 transition duration-400 ease-in'}`}>
                <li >
                    <Link href="/">
                        <a className="pt-1 pb-1 pl-4 pr-3"> Home</a>
                    </Link>
                </li>
                <li className={`${session ? '' : 'hidden' }`}>
                    <Link  href="/dashboard">
                        <a className="pt-1 pb-1 pl-4 pr-3" >Dashborad</a>
                    </Link>
                </li>
                <li>
                    <Link href="/blog">
                        <a className="pt-1 pb-1 pl-4 pr-3"> Blog </a>
                    </Link>
                </li>

                {!loading && !session && (
                        <li>
                        <Link href="/signin">
                            <a className="pt-1 pb-1 pl-4 pr-3"> sign In</a>
                        </Link>
                    </li>
                )}

                {session && (
                         <li>
                         <Link href="/api/auth/signout">
                             <a className="pt-1 pb-1 pl-4 pr-3"  onClick={e => {
                                 e.preventDefault();
                                 signOut()
                             }} > sign Out</a>
                         </Link>
                     </li>
                )}
                
               
            </ul>
        </nav>
     );
}
 
export default Navbar;