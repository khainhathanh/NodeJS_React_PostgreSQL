
function SignIn({register,isSentCode,submitCode,setIsCheckLogin} : any){
    return (
        <form className = "formSign">
          <input {...register('username')} type="text" className="text" name="username" autoComplete="username" />
          <span>username</span>
          <br />
          <br />
          <input {...register('password')} type="password" className="text" name="password" autoComplete="current-password"/>
          <span>password</span>
          <br />
          <input type="checkbox" id="checkbox-1-1" className="custom-checkbox"/>
          <label>Keep me Signed in</label>
          <br />
          <br />
          <br />
          {isSentCode && (
            <>
              <input {...register('otp')} type="text" className="text" name="otp" />
              <span>OTP</span>
              <br />
              <button className="signin" type="button" onClick={() => submitCode()}>nextauth</button>
            </>
          )}
          {!isSentCode && (
            <>
              <button className="signin" type="button" onClick={() =>setIsCheckLogin(true)}>Sign In</button>
              <hr />
              <a href="#">Forgot Password?</a>
            </>
          )}
        </form>
    )
}

export default SignIn;