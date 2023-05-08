import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import Button from "@/components/UI/Button";
import EditProfile from "@/components/Edit/EditProfile";
import EditCompany from "@/components/Edit/EditCompany";
import UserDetail from "@/components/user/UserDetail"
import styles from "./index.module.scss";
import ImageBanner from "@/components/UI/ImageBanner"


const Index = () => {  

  const { isLogged, user, fetchUser } = useContext(UserContext);
  const [isOpenUser , setIsOpenUser] = useState(false);
  const [isOpenCompany , setIsOpenCompany] = useState(false);
  
  
  return (
    <div>
      {
        isOpenUser && (
          <EditProfile setIsOpen={setIsOpenUser} user={user} updateUser={fetchUser} />
        )
      }
      {
        isOpenCompany && (
          <EditCompany setIsOpen={setIsOpenCompany} Company={user?.company} isAdmin={false} updateCompanys={fetchUser} />
        )
      }
      <ImageBanner  title={`Votre profil`} image="https://ryder-daviesvets.co.uk/wp-content/uploads/2016/03/computer-desktop-wallpaper-300x188.jpg"/>
      <UserDetail user={user}/>
      <div className={styles.center}>
        <Button title="modifier le profil" className="btn__primary" type="button" handleClick={ 
          () => {
            setIsOpenUser(true);
          }
        } />
        { user?.company && (
          <Button title="modifier l'entreprise" className="btn__primary" type="button" handleClick={ 
            () => {
              setIsOpenCompany(true);
            }
          } />
        )}
      </div>

    </div>
  );
}

export default Index;
