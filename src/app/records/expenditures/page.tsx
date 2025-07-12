import React from 'react'
import Styles from './page.module.css'
import Storycard from '@/ui/cards/Storycard'
import ExpenditureTable from '@/components/records/ExpenditureTable'

export default function page() {
    return (
        <section className={Styles.section}>
            <div>
                <Storycard
                    showIcon
                    icon="Archive"
                    title="Expenditure Logs"
                    subtitle="This is a data table for all our expenditures"
                    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Iusto eaque similique id inventore ea eius soluta voluptatibus. 
                    Excepturi necessitatibus corrupti explicabo? Earum voluptatum 
                    quaerat ipsum? Voluptatibus ea enim ducimus sequi!"
                    
                    linkTo="https://docs.google.com/spreadsheets/d/1SIgCAMpZhHtNM3p0HgKjO3-9Lsk6KUiyc2Zn7Lya9qM/edit?gid=598987426#gid=598987426"
                    buttonLabel="View google sheets"
                />
            </div>

            <div className='table-container'>
                <ExpenditureTable />
            </div>
        </section>
    )
}