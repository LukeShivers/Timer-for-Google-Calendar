import React, { useState } from 'react'

const Loggin = () => {

    const [fromGoogle, setFromGoogle] = useState({});

    const fetchData = async () => {
        try {
            const response = await fetch('/authorization');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log('Error fetching Google data:', error);
        }
    };

    fetchData();

  return (
    <div>Loggin</div>
  )
}

export default Loggin