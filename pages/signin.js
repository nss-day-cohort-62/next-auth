import { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { login } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Signin() {
  const username = useRef();
  const password = useRef();
  const invalidDialog = useRef();
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    login(user).then((res) => {
      const { data } = res;
      if (data.valid && 'token' in data) {
        signIn(data);
        router.push('/');
      } else {
        invalidDialog.current.showModal();
      }
    });
  };

  return (
    <main>
      <dialog ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button type="button" onClick={() => invalidDialog.current.close()}>Close</button>
      </dialog>
      <section>
        <form onSubmit={handleLogin}>
          <h1>Level Up</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="username"> Username </label>
            <input ref={username} type="text" id="username" placeholder="Username" required />
          </fieldset>
          <fieldset>
            <label htmlFor="password"> Password </label>
            <input ref={password} type="password" id="password" placeholder="Password" required />
          </fieldset>
          <fieldset>
            <button type="submit">Sign In</button>
          </fieldset>
        </form>
      </section>
      <section>
        <Link href="/register">Not a member yet?</Link>
      </section>
    </main>
  );
}

export default Signin;
