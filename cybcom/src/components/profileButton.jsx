import Link from "next/link";


export default function ProfileButton(){
    
    return (
        <>
            <Link href="/profile">
                <img className="rounded-full w-15" src="https://deivyson-silva.vercel.app/imgs/perfil.JPG" alt="profile" />
            </Link>
        </>
    )
}