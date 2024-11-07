import { FC, useState } from "react"

import { authService } from "../../services/authService";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput"



export const SignUp: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, { isLoading }] = authService.useSignUpMutation()
  const [signOut] = authService.useSignOutMutation()
  const handleRegistration = async () => {
    try {
      console.log({ email, password })
      await signUp({ email, password }).unwrap();
    } catch (err) {
      console.error('Failed to register:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ email, password }).unwrap();
    } catch (err) {
      console.log(err)
    }
  };
  if (isLoading) return <>Loading.........................</>
  return (
    <div className="authForm__item">
      <MyInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <MyInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <MyButton text="Зареєструватись" onClick={handleRegistration} />
      <MyButton text="Вийти" onClick={handleLogout} />
    </div>
  )
}
