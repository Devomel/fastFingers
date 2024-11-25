import { ChangeEvent, FC, useState } from "react"

import { authService } from "../../services/authService";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput"



export const SignUp: FC = () => {

   const [userData, setUserData] = useState({
      username: "",
      email: "",
      password: ""
   })
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>, param: string) =>
      setUserData({ ...userData, [param]: e.target.value })
   const [signUp, { isLoading }] = authService.useSignUpMutation()
   const [signOut] = authService.useSignOutMutation()
   const handleRegistration = async () => {
      try {
         await signUp({ ...userData }).unwrap();
      } catch (err) {
         console.error('Failed to register:', err);
      }
   };
   const handleLogout = async () => {
      try {
         await signOut("").unwrap();
      } catch (err) {
         console.log(err)
      }
   };
   if (isLoading) return <>Loading.........................</>
   return (
      <div className="authForm__item">
         <MyInput
            value={userData.email}
            onChange={(e) => handleInputChange(e, "email")}
            placeholder="Email"
         />
         <MyInput
            type="password"
            value={userData.password}
            onChange={(e) => handleInputChange(e, "password")}
            placeholder="Password"
         />
         <MyInput
            type="text"
            value={userData.username}
            onChange={(e) => handleInputChange(e, "username")}
            placeholder="Username"
         />
         <MyButton text="Зареєструватись" onClick={handleRegistration} />
         <MyButton text="Вийти" onClick={handleLogout} />
      </div>
   )
}
