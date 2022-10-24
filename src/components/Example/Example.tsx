import React, { FC } from 'react'
import { Button, H1, H4, H5, H6 } from "@pureman/react-ui";
import './Example.scss';

interface ExampleProps {
    title: string
    onClick?: () => void
}

const Example: FC<ExampleProps> = ({ title, onClick }) => {
    return (
        <div className='example'>
            <H1>{title}</H1>
            <H4>this component is showing how we usually use React components</H4>
            <H5>also, check out style file for understanding our css guidelines</H5>
            <H6>also, sorry for my English</H6>
            <div className="example__button-container">
                <div onClick={() => onClick ? onClick() : undefined}>
                    <Button title='Destroy PC' short />
                </div>
            </div>
        </div>
    )
}

export default Example