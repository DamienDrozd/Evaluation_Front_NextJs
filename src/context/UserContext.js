import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";

const UserContext = createContext({
  isLogged: false,
  user: {}
});

export default UserContext;

export const UserContextProvider = ({ children }) => {

  const router = useRouter();
  
  const [user, setUser] = useState({});

  const [token, setToken] = useState()

  const [isAdmin, setIsAdmin] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const { data, error, loading, fetchData } = useFetch({ url: "/user", method: "GET", body: null, token: token });

  const autorizePath = ["/", "/freelance/[id]", "/auth/login", "/auth/register", "/auth/forgot-password", "/auth/register/freelance", "/auth/register/company"]

  const adminPath = ["/", "/freelance/[id]", "/admin", "/admin/user", "/admin/company", "/admin/skill", "/admin/job", "/admin/mission"]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        setToken(token);
      } else if (!autorizePath.includes(router.pathname)) {
        router.push("/auth/login")
      }
    }
  }, [router])
  
  useEffect(() => {
    if (token && !isLogged) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (data && data.success) {
      login(data);
    }
  }, [data]);

  useEffect(() => {
    if (isLogged){
      if (user.isAdmin && !adminPath.includes(router.pathname)) {
        router.push("/admin")
      }else if (!user.isAdmin && adminPath.includes(router.pathname)) {
        router.push("/")
      }
    }
  }, [user, router])

  const login = (data) => {
    if (data.isAdmin) {
      setIsAdmin(true)
    }
    setUser(data)
    setIsLogged(true)
  }


  const logout = () => {
    setIsLogged(false);
    setUser({});
    localStorage.removeItem("token");
    router.push('/auth/login')
  }
  const updateUser = (data) => {
    setUser(data)
  }

  const fetchUser = () => {
    fetchData();
  }

  const context = {
    login, 
    logout, 
    user,
    isLogged,
    updateUser,
    isAdmin,
    fetchUser
  }

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  )


}