import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Styles from './page.module.css'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const { name, email, image } = session.user || {};

    return (
        <section className={Styles.profilePage}>
            <div className={Styles.profilePageIdentity}>
                <div className={Styles.IdentityContainer}>
                    <div className={Styles.avatarContainer}>
                        <Image className={Styles.avatar}
                            src={image || "/default-avatar.png"}
                            width={86}
                            height={86}
                            alt="avatar"
                        />
                    </div>
                    <div className={Styles.userMetadata}>
                        <h1>{name}</h1>
                        <p className={Styles.username}>@tahhhmin</p>
                        <p className="muted-text">{email}</p>
                    </div>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Temporibus quasi ex, autem id beatae cumque dolorum 
                    provident nesciunt, error repellat, excepturi officia 
                    tenetur tempora? Eveniet fugit vitae quo a laborum!
                </p>
            </div>

            <div className={Styles.profilePageNav}>
                {/* 
                    pfp, name, email
                */}

            </div>

            <div className={Styles.profilePageContent}>
                {/* 
                    pfp, name, email
                */}

            </div>
        </section>
  );
}
