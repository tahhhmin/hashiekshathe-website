import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Styles from './page.module.css'

import { BadgeCheck } from 'lucide-react'
import HorizontalDivider from "@/ui/dividers/HorizontalDivider";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const { name, image } = session.user || {};

    const isDept = true;
    const isTeam = false;

    return (
        <section className={Styles.profilePage}>
            <div className={Styles.mainContainer}>
                <div className={Styles.profileHeader}>
                    <div className={Styles.profileIdentity}> 
                        <Image
                            src={image || 'www.image.com' }
                            width={96}
                            height={96}
                            alt="avatar"
                            className={Styles.avatar}
                        />
                        <div className={Styles.userMetadata}>
                            <div className={Styles.name}>
                                <h1>{name}</h1>
                                <BadgeCheck size={32} className={Styles.icon}/>
                            </div>
                            <div className={Styles.profileTagsContainer}>
                                <div className={Styles.tagContainer}>
                                    <p className={Styles.username}>@Username</p>
                                </div>
                            </div>
                        </div>
                    </div>   

                    <div className={Styles.headerContent}> 
                        <div className={Styles.roleContainer}>
                            {isDept && <div>
                                {/* Department related content */}
                            </div>}
                            
                            {isTeam && <div>
                                {/* Team related content */}
                            </div>}
                        </div>
                        {/* Institution Media links */}
                        <div className={Styles.bioContainer}>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                                Aliquid voluptas nam sed laborum? Voluptates neque laboriosam 
                                ipsum! Tempore, officiis praesentium. Corporis, voluptatibus. 
                                Voluptas exercitationem consectetur, ex dolorem eius soluta 
                                rerum.
                            </p>
                        </div>
                    </div>  
                </div>

                <div> {/* Navbar */}</div>
                <div>
                    <div> {/* About */} </div>
                    <div> {/* Projects worked in */} </div>
                    <div> {/* Achievements */} </div>
                    <div> {/* Skills */} </div>
                </div>
            </div>

            <div className={Styles.sideContainer}>
                <div className={Styles.userOrgInfo}>
                    <div>
                        <p className="muted-text">Date Joined</p>
                        <h2>10th June 2024</h2>
                    </div>
                    <HorizontalDivider />
                    <div>
                        <p className="muted-text">Total Hours Contributed</p>
                        <h2>20 hours</h2>
                    </div>
                </div>
                
                <div className={Styles.socialLinksCardsContainer}>
                    <div>
                        {/* Social links content */}
                    </div>
                </div>

            </div>
        </section>
    );
}
