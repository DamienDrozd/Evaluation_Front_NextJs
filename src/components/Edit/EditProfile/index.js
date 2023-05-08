import styles from "./index.module.scss";
import Modal from "@/components/UI/Modal";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import UserContext from "@/context/UserContext";
import Selector from "@/components/UI/Selector";

import FormFreelance from "@/components/Form/Freelance";
import FormUser from "@/components/Form/User";


import { useEffect, useState, useContext } from "react";




const Index = ({ setIsOpen }) => {
    const [token, setToken] = useState();
    const [userForm, setUserForm] = useState();
    const { user, updateUser } = useContext(UserContext);
    const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate} = useFetch({url:"/user", method:"PUT", body:userForm, token:token})
    const {data: jobs, error: errorJobs, loading: loadingJobs, fetchData: fetchDataJobs} = useFetch({url:"/job", method:"GET", body:null, token:null})
    const {data: skills, error: errorSkills, loading: loadingSkills, fetchData: fetchDataSkills} = useFetch({url:"/skill", method:"GET", body:null, token:null})

    const handleChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const freelanceAppendList = (e) => {
        let freelance = {...userForm.freelance}
        if(freelance[e.target.name] === undefined) {
            freelance[e.target.name] = []
        }
        let appendObj = JSON.parse(e.target.value)
        if (freelance[e.target.name].includes(appendObj.name) === false) {
            freelance[e.target.name].push(appendObj)
            setUserForm({ ...userForm, freelance: freelance })
        } else {
            console.log("value already exist")
        }
    }

    const freelanceRemoveList = (e) => {
        let freelance = {...userForm.freelance}
        let removeObj = JSON.parse(e.target.value)
        let index = freelance[e.target.name].findIndex(obj => JSON.stringify(obj) === JSON.stringify(removeObj))
        if (index > -1) {
            freelance[e.target.name].splice(index, 1);
            
            setUserForm({ ...userForm, freelance: freelance })
        } else {
            console.log("value no exist")
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        const newToken = localStorage.getItem('token');
        setToken(newToken);
        if (token != undefined && token != null && token != ""){
            fetchDataUpdate();
        }
    }

    useEffect(() => {
        if( user != undefined) {
            setUserForm(user)
        }
    }, [user]);

    useEffect(() => {
        if (dataUpdate.success) {
            setIsOpen(false);
            updateUser(dataUpdate.user)
        }
    }, [dataUpdate]);

    useEffect(() => {
        fetchDataJobs();
        fetchDataSkills();
    }, []);

    if (loadingUpdate || loadingJobs || loadingSkills) return <Loading />
    if (errorUpdate) console.log(errorUpdate);
    if (errorJobs) console.log(errorJobs);
    if (errorSkills) console.log(errorSkills);

    return (
        <Modal title="Modifier mon profil" closeModal={()=>setIsOpen(false)}>
            <form onSubmit={(e) => {submitForm(e)}}>
                <FormUser edit={true} userForm={userForm} handleChange={handleChange} />
                {
                    user.freelance != null && (
                        <>
                            <FormFreelance userForm={userForm} handleChange={handleChange} freelanceAppendList={freelanceAppendList} freelanceRemoveList={freelanceRemoveList} jobs={jobs} skills={skills} />
                        </>
                    )
                } 
                <Button type="submit" title="modifier" className="btn__primary"/>
            </form>
        </Modal>
    );
}

export default Index;
