import styles from "./index.module.scss";
import Modal from "@/components/UI/Modal";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import UserContext from "@/context/UserContext";
import Selector from "@/components/UI/Selector";


import { useEffect, useState, useContext } from "react";




const Index = ({ setIsOpen, user, updateUsers }) => {
    const [token, setToken] = useState();
    const [userForm, setUserForm] = useState();
    const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate} = useFetch({url:`/user/admin/${user?._id}`, method:"PUT", body:userForm, token:token})
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
            console.log("new value : ", userForm.freelance[e.target.name])
        } else {
            console.log("value already exist")
        }
    }

    const freelanceRemoveList = (e) => {
        let freelance = {...userForm.freelance}
        let removeObj = JSON.parse(e.target.value)
        console.log("freelance[e.target.name] : ", freelance[e.target.name])
        console.log("removeObj : ", removeObj)
        let index = freelance[e.target.name].findIndex(obj => JSON.stringify(obj) === JSON.stringify(removeObj))
        console.log("index : ", index  )
        if (index > -1) {
            freelance[e.target.name].splice(index, 1);
            
            setUserForm({ ...userForm, freelance: freelance })
            console.log("new value : ", userForm.freelance[e.target.name])
        } else {
            console.log("value no exist")
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log("token : ", token)
        if (token != undefined && token != null && token != ""){
            fetchDataUpdate();
        }
    }

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

    useEffect(() => {
        console.log(user)
        if( user != undefined) {
            setUserForm(user)
        }
    }, [user]);

    useEffect(() => {
        if (dataUpdate.success) {
            updateUsers()
            setIsOpen(false);
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
                <Input 
                label="firstName" 
                type="text" 
                name="firstName" 
                value={userForm?.firstName}
                isRequired={true}
                placeholder="enter your firstName"
                onChange={(e) => handleChange(e)}
                />
                <Input 
                label="lastName" 
                type="text" 
                name="lastName" 
                value={userForm?.lastName}
                isRequired={true}
                placeholder="enter your lastName"
                onChange={(e) => handleChange(e)}
                />
                <Input 
                label="email" 
                type="text" 
                name="email" 
                value={userForm?.email}
                isRequired={true}
                placeholder="enter your email"
                onChange={(e) => handleChange(e)}
                />
                <Input
                label="address"
                type="text"
                name="address"
                value={userForm?.address}            
                isRequired={true}   
                placeholder="enter your address"    
                onChange={(e) => handleChange(e)}   
                />
                <Input      
                label="phone"
                type="text" 
                name="phone"          
                value={userForm?.phone}      
                isRequired={true}     
                placeholder="enter your phone"              
                onChange={(e) => handleChange(e)}   
                />
                <Input
                label="postcode"
                type="text"
                name="postcode"   
                value={userForm?.postcode}
                isRequired={true}   
                placeholder="enter your postcode" 
                onChange={(e) => handleChange(e)} 
                />
                <Input
                label="city"
                type="text"
                name="city"   
                value={userForm?.city}
                isRequired={true}
                placeholder="enter your city" 
                onChange={(e) => handleChange(e)}
                /> 
                {
                    user.freelance != null && (
                    <>
                        <Input
                        label="experience_years"
                        type="text"
                        name="experience_years"
                        value={userForm?.freelance.experience_years}
                        isRequired={true}
                        placeholder="enter your experience_years"
                        onChange={(e) => handleChange(e)}
                        />   
                        <Input
                        label="price"
                        type="text"
                        name="price"
                        value={userForm?.freelance.price}   
                        isRequired={true}
                        placeholder="enter your price"
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            user.freelance.jobs != null && (
                                <Selector
                                label="job"
                                name="jobs"
                                value={userForm?.freelance.job}
                                isRequired={true}   
                                placeholder="enter your job"
                                onChange={(e) => freelanceAppendList(e)}
                                options={jobs}
                                />
                            )   
                        }
                        <p>jobs : {user?.freelance?.jobs?.map((job) => {
                            return <Button type="button" key={job.id} title={job.name} value={JSON.stringify(job)} className="btn_delete" name="jobs" handleClick={freelanceRemoveList} />
                        } 
                        )}</p>
                        {
                            user.freelance.skills != null && (           
                                <Selector
                                label="skill"
                                name="skills"
                                value={userForm?.freelance.skill}
                                isRequired={true}
                                placeholder="enter your skill"              
                                onChange={(e) => freelanceAppendList(e)}
                                options={skills}    
                                />
                            )
                        }

                        <p>skills : {user?.freelance?.skills?.map((skill) => {
                            return <Button type="button" key={skill.id} title={skill.name} value={JSON.stringify(skill)} className="btn_delete" name="skills" handleClick={freelanceRemoveList} />
                        }
                        )}</p>
                    </>
                    )
                }
                <Button type="submit" title="modifier" className="btn__primary"/>
            </form>
        </Modal>
    );
}

export default Index;
