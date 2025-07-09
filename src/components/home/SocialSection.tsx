import React from 'react'
import Styles from './SocialSection.module.css'

import Button from '@/ui/Button'

export default function SocialSection() {
    return (
        <section className={Styles.section}>
            <div className={Styles.container}>
                <div>
                    <h2>Facebook</h2>
                    <p className='muted-text'>Youtube</p>
                </div>
                <div  className={Styles.imageContainer}>
                    <img 
                        src="/image/instaDark.png" 
                        alt="Instagram Icon" 
                        className={Styles.image}
                        />
                </div>
                <div className={Styles.content}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing 
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Button
                        variant='primary'
                        label='Visit facebook'
                        showIcon
                    />
                </div>
            </div>
            <div className={Styles.container}>
                <div>
                    <h2>Instagram</h2>
                    <p className='muted-text'>Youtube</p>
                </div>
                                <div  className={Styles.imageContainer}>
                    <img 
                        src="/image/instaDark.png" 
                        alt="Instagram Icon" 
                        className={Styles.image}
                        />
                </div>
                <div className={Styles.content}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing 
                    </p>
                </div>
                
                <div className={Styles.footer}>
                    <Button
                        variant='primary'
                        label='Visit instagram'
                        showIcon
                    />
                </div>
            </div>
            <div className={Styles.container}>
                <div>
                    <h2>Youtube</h2>
                    <p className='muted-text'>Youtube</p>
                </div>
                                <div  className={Styles.imageContainer}>
                    <img 
                        src="/image/instaDark.png" 
                        alt="Instagram Icon" 
                        className={Styles.image}
                        />
                </div>
                <div className={Styles.content}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing 
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Button
                        variant='primary'
                        label='Visit Youtube'
                        showIcon
                    />
                </div>
            </div>
            <div className={Styles.container}>
                <div>
                    <h2>Linkedin</h2>
                    <p className='muted-text'>Youtube</p>
                </div>
                                <div  className={Styles.imageContainer}>
                    <img 
                        src="/image/instaDark.png" 
                        alt="Instagram Icon" 
                        className={Styles.image}
                        />
                </div>
                <div className={Styles.content}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing 
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Button
                        variant='primary'
                        label='Visit Linkedin'
                        showIcon
                    />
                </div>
            </div>
        </section>
    )
}