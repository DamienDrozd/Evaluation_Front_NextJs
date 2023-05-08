import { useEffect, useState, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/context/UserContext";
import Button from "@/components/UI/Button";
import ProfileEdit from "@/components/Edit/EditProfile";
import Link from "next/link";
import ButtonLink from "@/components/UI/ButtonLink";


const Index = () => {  
  
  
    return (
        <div>
            <h1>Admin</h1>
            <ButtonLink title="Voir les utilisateurs" className={"btn__admin"} link="/admin/user"  />

            <ButtonLink title="Voir les entreprises" className={"btn__admin"} link="/admin/company"  />

            <ButtonLink title="Voir les skills" className={"btn__admin"} link="/admin/freelance"  />

            <ButtonLink title="Voir les jobs" className={"btn__admin"} link="/admin/job"  />

            {/* <ButtonLink title="Voir les missions" className={"btn__admin"} link="/admin/mission"  /> */}
        </div>
    );
}

export default Index;
