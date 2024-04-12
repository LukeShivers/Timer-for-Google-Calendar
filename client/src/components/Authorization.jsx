import { useEffect } from 'react';
import Google from '../assets/Google.svg';
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';


export default function Authorization() {

    const { auth, setAuth } = useAuth();
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
        setAuth(data.authorized);
        navigate('/timer');
    }

    // Left off with the delimea of the auth context and how to get it to pick up in the RequireAuth component

    useEffect(() => {
        console.log(auth)
    }, [auth])

    
    return (
        <>
            <div onClick={() => fetchAuthUrl()} id="authorize_button" className='flex justify-center items-center w-[250px] h-[50px] py-[12px] px-[18px] bg-off-white rounded-[100px] ml-[154px] mt-[55px] cursor-pointer'>
                <div className='flex justify-between items-center w-[214px] h-[50px]'>
                    <img src={Google} alt="/" />
                    <span className='font-semibold font-poppins'>Continue With Google</span>
                </div>
            </div>
            <div onClick={() => authenticate()} id="authorize_button" className='flex justify-center items-center w-[250px] h-[50px] py-[12px] px-[18px] bg-off-white rounded-[100px] ml-[154px] mt-[55px] cursor-pointer'>
                <div className='flex justify-between items-center w-[214px] h-[50px]'>
                    <span className='font-semibold font-poppins'>Authenticate</span>
                </div>
            </div>
        </>
    )
}