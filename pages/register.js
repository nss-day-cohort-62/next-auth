import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { register } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Register() {
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const router = useRouter();

  const { signIn } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        bio: bio.current.value,
        password: password.current.value,
      };

      register(newUser)
        .then((res) => {
          const { data } = res;
          if ('token' in data) {
            signIn(data);
            router.push('/');
          }
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <main>

      <dialog ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button type="button" onClick={() => passwordDialog.current.close()}>Close</button>
      </dialog>

      <form onSubmit={handleRegister}>
        <h1>Register an account</h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input ref={firstName} type="text" name="firstName" placeholder="First name" required />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input ref={lastName} type="text" name="lastName" placeholder="Last name" required />
        </fieldset>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input ref={username} type="text" name="username" placeholder="Username" required />
        </fieldset>
        <fieldset>
          <label htmlFor="password"> Password </label>
          <input ref={password} type="password" name="password" placeholder="Password" required />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input ref={verifyPassword} type="password" name="verifyPassword" placeholder="Verify password" required />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <textarea ref={bio} name="bio" placeholder="Let other gamers know a little bit about you..." />
        </fieldset>
        <fieldset>
          <button type="submit">Register</button>
        </fieldset>
      </form>
      <section>
        Already registered? <Link href="/login">Login</Link>
      </section>
    </main>
  );
}

export default Register;
