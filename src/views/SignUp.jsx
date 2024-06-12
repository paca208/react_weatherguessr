import { useState } from "react"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom";

function SignIn( {setUsername} ){
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        setUsername(inputValue);
        navigate('/')
    }
    return (
        <>
        <div className='w-full h-full min-h-screen bg-slate-100 flex flex-col justify-start items-center font-Reddit-mono'>
            <form className="my-auto" action="" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-6">
                    <label className="font-semibold text-2xl" htmlFor="username">Enter username</label>
                    <input id="username" type="text" minLength={3} className="border-2 rounded-lg p-1 pl-2" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <Button isSubmit={true} text={'Submit'} />
                </div>
            </form>
        </div>
        </>
    )
}

export default SignIn