import { useEffect } from 'react';
import Google from '../assets/Google.svg';
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';


export default function Authorization() {

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    function navWindow (url) {
        window.location.href = url
    }


    async function fetchAuthUrl () {
        const response = await fetch('http://localhost:3000/requests', {
            method: 'post'
        });
        const data = await response.json();
        console.log("Auth URL: ", data);
        navWindow(data.url);
    }

    
    async function authenticate () {
        const response = await fetch('http://localhost:3000/oauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: window.location.href })
        });
        const data = await response.json();
        if (data.authorized) {
            setAuth(data.authorized);
            const codeValue = getQueryParam("code");
            console.log(codeValue)
            // navigate(`/timer?code=${codeValue}`);
        }
    }

    // Left off figuring out how to send the code param to the /timer page so I cna then use it to make requests to the backend for Calendar

    function getQueryParam(name) {
        const url = window.location.href;
        console.log("Current URL: ", url)
        const urlParams = new URLSearchParams(url);
        return urlParams.get(name);
    }

    useEffect(() => {
        authenticate();
    }, [])

    
    return (
        <>
            <div onClick={() => fetchAuthUrl()} id="authorize_button" className='flex justify-center items-center w-[250px] h-[50px] py-[12px] px-[18px] bg-off-white rounded-[100px] ml-[154px] mt-[55px] cursor-pointer'>
                <div className='flex justify-between items-center w-[214px] h-[50px]'>
                    <img src={Google} alt="/" />
                    <span className='font-semibold font-poppins'>Continue With Google</span>
                </div>
            </div>
        </>
    )
}