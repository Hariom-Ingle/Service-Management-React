import { useState } from "react";


export const Register = () => {

    const [user ,setUser]= useState({
        username :"",
        email :"",
        password :"" 
    });

    const handleInput=(e)=>{
        console.log(e)

        let name =e.target.name;
        let value=e.target.value;

        setUser({
            ...user,
            [name]:value,

        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        alert(user);
        console.log(user);

        // database Connetction 
        const  response = fetch('')
    
    }




  return (
    <>
      <div className="registration-form">
        <h1 className="main-heading  mb-3">register Form</h1>

        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username"></label>

            <input
              type="text"
              name="username"
              placeholder="Enter Your Name"
              id="username"
              required
              autoComplete="off"
              value={user.username}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="email"></label>

            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              id="email"
              required
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
            />
          </div>
          
          <div>
            <label htmlFor="password"></label>

            <input
              type="text"
              name="password"
              placeholder="Enter Your password"
              id="password"
              required
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-submit">Submit</button>
        </form>
      </div>
    </>
  );
};
