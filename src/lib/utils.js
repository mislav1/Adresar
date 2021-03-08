export const validateLoginForm = (email, password) => {

    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        return "Please enter valid email address!"
    }
    
    if(!/^(?=.*?[0-9]).{6,}$/.test(password)){
        return "Password must contain minimum 6 characters, at least one number and one special character"
    }

    let specialCharsCount = 0;
    const specialCharacters = ['+','-','!','#','$']
    for (let i = 0; i < password.length; i++){
        let character = password[i]
        if(specialCharacters.includes(character)){
            specialCharsCount++;
        }
    }

    if(specialCharsCount !== 1){
        return "Password must contain minimum 6 characters, at least one number and one special character"
    }

    console.log(specialCharsCount)

    return ''
}