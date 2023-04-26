import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import Button from "@/components/UI/Button";
import EditProfile from "@/components/Edit/EditProfile";
import EditCompany from "@/components/Edit/EditCompany";
import Link from "next/link";


const Index = () => {  

  const { isLogged, user, fetchUser } = useContext(UserContext);
  const [isOpenUser , setIsOpenUser] = useState(false);
  const [isOpenCompany , setIsOpenCompany] = useState(false);
  
  
  return (
    <div>
      {
        isOpenUser && (
          <EditProfile setIsOpen={setIsOpenUser} />
        )
      }
      {
        isOpenCompany && (
          <EditCompany setIsOpen={setIsOpenCompany} Company={user?.company} isAdmin={false} updateCompanys={fetchUser} />
        )
      }
      <p>Profil page</p>
      {
        user && (
          <>
            <p>Firstname : {user?.firstName}</p>
            <p>LastName : {user?.lastName}</p>
            <p>Email : {user?.email}</p>
            <p>Address : {user?.address}</p>
            <p>Phone : {user?.phone}</p>
            <p>post code : {user?.postcode}</p>
            <p>city : {user?.city}</p>
          </>
        )
      }
      {
        user?.freelance != null && (
          <>
            <p>Freelance</p>
            <p>experience_years : {user?.freelance.experience_years} </p>
            <p>jobs : {user?.freelance.jobs.map((job) => {
                return <p key={job.id}>{job.name}</p>
              }
            )}</p>
            <p>price : {user?.freelance.price}</p>
            <p>skills : {user?.freelance.skills.map((skill) => {
                return <p key={skill.id}>{skill.name}</p>
              }
            )}</p>
          </>
        )
      }
      <Button title="modifier" className="btn__primary" type="button" handleClick={ 
        () => {
          setIsOpenUser(true);
        }
      } />
      {
        user?.company != null && (
          <>
            <p>Company</p>
            <p>name : {user?.company.name}</p>
            <p>status : {user?.company.status}</p>
            <p>siret : {user?.company.siret}</p>
            <p>address : {user?.company.address}</p>
            <p>city : {user?.company.city}</p>
            <p>postcode : {user?.company.postcode}</p>
          </>
        )
      }
      <Button title="modifier" className="btn__primary" type="button" handleClick={ 
        () => {
          setIsOpenCompany(true);
        }
      } />
    </div>
  );
}

export default Index;
