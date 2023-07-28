import React from 'react';

export default function App(props) {
    return(
        <>
            <h1 className='Title'>Gensho Lmao</h1>
            
            <p>Hi my prop is {props.color} </p>

            <button onClick={() => {
                electron.notificationApi.sendNotification('My custom notification');
            }}>Notify</button>
        </>
    )
}