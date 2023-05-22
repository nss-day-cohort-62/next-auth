// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context
import { useRouter } from 'next/router';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  const signOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(false);
    router.push('/signin');
  }, [router]);

  const signIn = useCallback((userObj) => {
    localStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
    router.push('/');
  }, [router]);

  useEffect(() => {
    if (!['/signin', '/register'].includes(router.pathname)) {
      const userStorage = localStorage.getItem('user');
      if (userStorage) {
        setUser(JSON.parse(userStorage));
      } else {
        signOut();
      }
    }
  }, [router.pathname, signOut]);

  const value = useMemo( // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      userLoading: user === null,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
      signOut,
      signIn,
    }),
    [user, signOut, signIn],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
