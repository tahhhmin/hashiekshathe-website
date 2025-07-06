import React from 'react'
import Styles from './page.module.css'


export default function page() {
    return (
        <>
            <section className={Styles.section}>
                <div className={Styles.container}>
                    <div className={Styles.primaryContainer}>
                        <div className={Styles.wrapper}>
                            <h1>Title</h1>
                            <p>
                                Hashi Ekshathe is a student-led nonprofit organization operating across 
                                Bangladesh with a mission to stand beside the people in need—regardless 
                                of age, location, or background. From urban centers like Dhaka, Chattogram, 
                                and Cumilla, to underserved districts like Rangpur, our initiatives reach 
                                across borders and barriers.
                            </p>
                        </div>
                        <div className={Styles.wrapper}>
                            <h1>Title</h1>
                            <p>
                                Hashi Ekshathe is a student-led nonprofit organization operating across 
                                Bangladesh with a mission to stand beside the people in need—regardless 
                                of age, location, or background. From urban centers like Dhaka, Chattogram, 
                                and Cumilla, to underserved districts like Rangpur, our initiatives reach 
                                across borders and barriers.
                            </p>
                        </div>
                        <div className={Styles.wrapper}>
                            <h1>Title</h1>
                            <p>
                                Hashi Ekshathe is a student-led nonprofit organization operating across 
                                Bangladesh with a mission to stand beside the people in need—regardless 
                                of age, location, or background. From urban centers like Dhaka, Chattogram, 
                                and Cumilla, to underserved districts like Rangpur, our initiatives reach 
                                across borders and barriers.
                            </p>
                        </div>
                    </div>
                
                    <div className={Styles.sideContainer}>
                        <h1>Learn More</h1>
                        <ul>
                            <li><a href="">Organizational Constitution</a></li>
                            <li><a href="">Privacy Policy</a></li>
                            <li><a href="">Code of Conduct</a></li>
                            <li><a href="">Volunteer Ethics Guide</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

