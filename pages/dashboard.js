import React, { useState, useEffect } from 'react';
import {getSession , signIn } from 'next-auth/client'

function Dashboard() {
    const [loading, setLoading] = useState(true);
     
    useEffect(() => {
        const securePage = async () => {
            const session = await getSession();
            if (!session) {
                signIn()
            } else {
                setLoading(false)
            }
        }
       securePage()
    }, [])

    if (loading) {
        return <h2>Loadin.....</h2>
    }

    return (
        <h2>this is dashboard</h2>
     );
}               

export default Dashboard;               