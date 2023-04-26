import { useEffect, useState, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/context/UserContext";
import Button from "@/components/UI/Button";
import ProfileEdit from "@/components/Edit/EditProfile";
import Link from "next/link";


const Index = () => {  
  
  
    return (
        <div>
            <h1>Admin</h1>
            <Link href="/admin/user">
                <p>Users</p>
            </Link>
            <Link href="/admin/company">
                <p>Companies</p>
            </Link>
            <Link href="/admin/skill">
                <p>Skills</p>
            </Link>
            <Link href="/admin/job">
                <p>Jobs</p>
            </Link>
        </div>
    );
}

export default Index;
