import axios from 'axios'

function SignUpPage(){



    function SignUp(event){
        event.preventDefault()

        let email = document.getElementById('email')
        let username = document.getElementById('username') 
        let password = document.getElementById('password')

        axios.post('/signup', {email: email.value, username: username.value, password: password.value}).then((response)=>{
            if (response.data.Success){
                window.location.href = '/#/login'
            }
            else{
                window.alert('Please try again')
            }
        // console.log('response from server: ', response)
    })
    
  }

    return (
                <form>
                    <label for='email'>Please enter your email:</label><br></br>
                    <input type="text" id="email" placeholder='enter email'/><br></br>
                    <label for='username'>Please enter a username:</label><br></br>
                    <input type="text" id="username" placeholder='enter desired username'/><br></br>
                    <label for="password">Please create a password:</label><br></br>
                    <input type="password" id='password' placeholder='enter password'/><br></br>
                    <div className="py-3"></div>
                    <button onClick={SignUp}>Sign Up</button>
                </form>
    )

}


export default SignUpPage