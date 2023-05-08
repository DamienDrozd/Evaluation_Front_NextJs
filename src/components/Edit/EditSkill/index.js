import styles from "./index.module.scss";
import Modal from "@/components/UI/Modal";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import Selector from "@/components/UI/Selector";


import { useEffect, useState, useContext } from "react";




const Index = ({ setIsOpen, Skill, updateSkills }) => {
    const [token, setToken] = useState();
    const [SkillForm, setSkillForm] = useState();
    const [edit, setEdit] = useState(false);
    const {data: dataUpdate, error:errorSkill, loading:loadingSkill, fetchData:fetchDataUpdate} = useFetch({url:`/Skill/${Skill?._id}`, method:"PUT", body:SkillForm, token:token})
    const {data: dataAppend, error:errorAppend, loading:loadingAppend, fetchData:fetchDataAppend} = useFetch({url:`/Skill`, method:"POST", body:SkillForm, token:token})

    const handleChange = (e) => {
        setSkillForm({ ...SkillForm, [e.target.name]: e.target.value })
    }



    const submitForm = (e) => {
        e.preventDefault();
        if (token != undefined && token != null && token != ""){
            if (edit) {
                fetchDataUpdate();
            } else {
                fetchDataAppend();
            }
        }
    }

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

    useEffect(() => {
        if( Skill != undefined) {
            setSkillForm(Skill)
            setEdit(true)
        } else {    
            setSkillForm()
            setEdit(false)
        }
    }, [Skill]);

    useEffect(() => {
        if (dataUpdate.success || dataAppend.success) {
            updateSkills();
            setIsOpen(false);
        }
    }, [dataUpdate, dataAppend]);


    if (loadingSkill || loadingAppend) return <Loading />
    if (errorSkill) console.log(errorSkill);
    if (errorAppend) console.log(errorAppend);

    return (
        <Modal title="Skill" closeModal={()=>setIsOpen(false)}>
            <form onSubmit={(e) => {submitForm(e)}}>
                <Input 
                label="name" 
                type="text" 
                name="name" 
                value={SkillForm?.name}
                isRequired={true}
                placeholder="Skill name"
                onChange={(e) => handleChange(e)}
                />
                {edit && <Button type="submit" title="modifier" className="btn__primary"/> || <Button type="submit" title="ajouter" className="btn__primary"/>}
                
            </form>
        </Modal>
    );
}

export default Index;
