import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Loggin = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch( 'http://localhost:8000');
                const result = await response.json();
                setData(result)
                console.log(result)
            } catch (error) {
                console.log('Error fetching data: ', error)
            }
        }
       
       fetchData();
    }, []);

  return (
    <div>
      <p>{data}</p>
    </div>
  )
}

export default Loggin