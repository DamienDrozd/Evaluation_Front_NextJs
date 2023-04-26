import { useEffect, useState, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditSkill from "@/components/Edit/EditSkill";


const Index = () => {  
    const [token, setToken] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [editSkill, setEditSkill] = useState();
    const [deleteSkill, setDeleteSkill] = useState();
    const { fetchData : fetchSkills, data : dataSkills, error: errorSkills, loading: loadingSkills } = useFetch({ url: "/Skill", method: "GET", token: token })
    const { fetchData : fetchDeleteSkill, data : dataDeleteSkill, error: errorDeleteSkill, loading: loadingDeleteSkill } = useFetch({url:`/Skill/${deleteSkill?._id}`, method:"DELETE", token:token})

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
        fetchSkills();
    }, [])


    useEffect(() => {
        if (deleteSkill) {
            fetchDeleteSkill();
        }   
    }, [deleteSkill])

    useEffect(() => {
        if (dataDeleteSkill) {
            fetchSkills();
        }
    }, [dataDeleteSkill])




    if(loadingSkills) <Loading/> 
    if (errorSkills) console.log(errorSkills);
  
    return (
        <div>
            {
                isOpen && (
                    <EditSkill setIsOpen={setIsOpen} Skill={editSkill} updateSkills={fetchSkills} />
                )
            }
            <h1>Skills</h1>
            <Button title="Ajouter" className="btn__primary" type="button" handleClick={ 
                () => {
                    setIsOpen(true)
                    setEditSkill();
                } } 
            />
            { Array.isArray(dataSkills) && dataSkills.map(Skill => (
                <div key={Skill._id}>
                    <p>{Skill.name}</p>
                    <Button title="modifier" className="btn__primary" type="button" handleClick={ 
                        () => {
                            setIsOpen(true);
                            setEditSkill(Skill);
                        }
                    } />
                    <Button title="supprimer" className="btn__primary" type="button" handleClick={
                        () => {
                            setDeleteSkill(Skill);
                        }
                    } />
                </div>
            ))}
        </div>
    );
}

export default Index;
