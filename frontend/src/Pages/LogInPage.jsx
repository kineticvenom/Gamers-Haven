import axios from 'axios'


function LogIn(){


    function LogIn(event){
        event.preventDefault()

        let email = document.getElementById('email') 
        let password = document.getElementById('password')
        console.log(email.value)
        console.log(password.value)

        axios.post('/login', {email: email.value, password: password.value}).then((response)=>{
          console.log('response from server: ', response)
          
          if (response.data.Success == false) {
            alert('Failed Login')
            console.log('failed login')
        } else {
            window.location.href = '/'
        }
        })
      }


    return (
             <form>
                    <label for='email'>Please enter your email:</label><br></br>
                    <input type="text" id="email" placeholder='enter email'/><br></br>
                    <label for="password">Please enter a password:</label><br></br>
                    <input type="password" id='password' placeholder='enter password'/><br></br>
                    <div className="py-3"></div>
                    <button onClick={LogIn}>Log In</button>
                    <h4>Or click <a href='/#/signup'>here</a> if you don't have an account</h4>
                </form>
    )
}

export default LogIn