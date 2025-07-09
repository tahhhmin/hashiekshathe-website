import Styles from './not-found.module.css'
import Button from '@/ui/Button'
import Link from 'next/link';

export default function NotFound() {
    return (
        <section className={Styles.notFoundPage}>
            <div className={Styles.container}>
                <h1 className={Styles.error404}>ERROR 404</h1>
                <h1 className='muted-text'>Page was not found.</h1>
                <p className='muted-text'>We are sorry for the inconvenience</p>
                <p className='muted-text'>- Team Hashi Ekshathe</p>

                    <Link href='/' className={Styles.button}><Button
                        variant='primary'
                        label='Return to home page'
                        showIcon
                    /></Link>    

            </div>
        </section>
    );
}
