import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

// 3. Define providers props type
type AuthContextProviderProps = {
  children: ReactNode;
};

// 5. Define the type for the context
type AuthContextType = {
  user: User | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// 6. Create variable with the initial value of all the elements we share in our context

const contextInitialValue: AuthContextType = {
  user: null,
  register: () => {
    throw new Error("context not initialised");
  },
  login: () => {
    throw new Error("context not initialised");
  },
  logout: () => {
    throw new Error("context not initialised");
  },
};

// 1. create and export context
export const AuthContext = createContext<AuthContextType>(contextInitialValue);

// 2. Create and export the provider: a component that contains the states, functions, etc...

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // 4. Move to the provider all the states and functions you want to share#

  const [user, setUser] = useState<User | null>(null);

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
     
      
      console.log("user registered", user);
    } catch (err) {
      const error = err as Error;
      console.log("error", error.message);
    }
  };

  const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const email =user.email;
        const id= user.uid
        if (email && id) {
          setUser({email,id})
        }
        else {throw new Error("User information not found")}
        console.log("user login", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
       
      });
      
  };

  const checkUserStatus = ()=> {
    onAuthStateChanged (auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        
        const email =user.email;
        const id= user.uid
        if (email && id) {
          setUser({email,id})
        }
        else {throw new Error("User information not found")}

        console.log("user is logged in", user.email);
        console.log("id", id);
       
      } else {
        // User is signed out
        console.log("user is signed out");
        setUser(null)
  }})
  }



  const logout = () => {

    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null);
    }).catch((error) => {
      // An error happened.
      console.log("sign out not succesful", error
      );
    });
  };
  // 7. in providers property value include the elements (states, functions, variables) you want to share
  
  useEffect(() => {
   checkUserStatus();
  }, [])
  
  
  
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
