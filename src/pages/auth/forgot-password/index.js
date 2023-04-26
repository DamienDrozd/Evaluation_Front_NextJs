import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/";
import Title from "@/components/UI/Title";
import Loading from "@/components/UI/Loading";
import Notification from "@/components/UI/Notification";

const Index = () => {

  const router = useRouter();

  const { login } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    email: ""
  });

  const [token, setToken] = useState();

  const { fetchData, data, error, loading } = useFetch({ url: "/auth/password/forgot", method: "PUT", body: userForm, token: null })




  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submit = (e) => {
    e.preventDefault();
    fetchData();
  }

  return (
    <>
      <Loading isLoad={loading} />
      <Title title="Mot de passe oublié" Level="h1" />
      <form onSubmit={(e)=>submit(e)}>
        <Input
        label="Email"
        type="email" 
        name="email" 
        placeholder="veuillez saisir votre email"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm.email}
        />
        <Button
          type="submit"
          title="Réinitialiser le mot de passe"
          className="btn__secondary"
        />
      </form>
      {
        error && (
          <Notification type="warning" message={error.message}/>
        )
      }
      <p>
         <Link href="/auth/login">Retour au login</Link>
      </p>
      <p>
        <Notification type="success" message={data.message}/>
      </p>
    </>
  );

}

export default Index;
