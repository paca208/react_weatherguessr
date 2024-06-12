function Button( {isSubmit, text} ){
    return(
        <>
        <button type={isSubmit ? 'submit' : 'button'} className="className='bg-white rounded-md p-2 border transition-all duration-200 hover:bg-slate-200 ml-8">{text}</button>
        </>
    )
}

export default Button