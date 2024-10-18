export const validateSignup = ({name, email, password, cpassword}) =>{
  if(name.length<3){
    return "name must be atleast 3 characters";
  }
  if(password.length<8 || cpassword.length<8 ) return "password must be atleast 8 characters"
}