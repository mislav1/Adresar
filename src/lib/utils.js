export const validateLoginForm = (email, password) => {

    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        return "Please enter valid email address!"
    } else if(!/^(?=.*?[0-9])(?=.*[+!-#$]).{6,}$/.test(password)){
        return "Password must contain minimum 6 characters, at least one number and one special character (+,-,!,#,$)"
    }

    return ''
}