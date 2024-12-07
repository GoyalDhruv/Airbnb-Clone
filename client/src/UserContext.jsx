import { createContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export const UserContext = createContext({});


export function UserContextProvider({ children }) {

  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/profile');
        setUser(data.user)
        setReady(true);
      } catch (error) {
        if (error.response.status === 401) {
          console.log('Unauthorized. Please log in.');
          await axios.post('/logout');
          navigate('/')
          setUser(null);
        } else {
          console.error('An error occurred:', error);
        }
      }
    };

    fetchUser();
  }, [ready]);


  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}
