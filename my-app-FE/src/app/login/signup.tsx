function SignUp(){
    return (
        <form className = "formSign">
          <input type="text" className="text" name="username" />
          <span>username</span>
          <br />
          <br />
          <input type="password" className="text" name="password" />
          <span>password</span>
          <br />
          <button className="signin" type="button">Sign Up</button>
          <hr />
          <a href="#">SignUp by Gmail?</a>
        </form>
    )
}

export default SignUp;