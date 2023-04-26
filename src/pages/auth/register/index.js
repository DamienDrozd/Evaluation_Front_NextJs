import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import useFetch from '@/hooks/useFetch';
import Selector from "@/components/UI/Selector";


const Index = () => {


  return (
    <>
      <Title title="Inscription" Level="h1" />
        <div className="form__group">
          <label htmlFor="userType">Je suis </label>
            <Link  href="/auth/register/freelance">un freelance</Link> 
            <Link  href="/auth/register/company">une entreprise</Link>
        </div>
       
      <p>
        Vous avez déjà un compte ? <Link href="/auth/login">Connectez-vous ?</Link>
      </p>
    </>
  );
}

export default Index;
