import styles from "./index.module.scss";
import Modal from "@/components/UI/Modal";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import Selector from "@/components/UI/Selector";


import { useEffect, useState, useContext } from "react";




const Index = ({ setIsOpen, job, updateJobs }) => {
    const [token, setToken] = useState();
    const [jobForm, setJobForm] = useState();
    const [edit, setEdit] = useState(false);
    const {data: dataUpdate, error:errorJob, loading:loadingJob, fetchData:fetchDataUpdate} = useFetch({url:`/job/${job?._id}`, method:"PUT", body:jobForm, token:token})
    const {data: dataAppend, error:errorAppend, loading:loadingAppend, fetchData:fetchDataAppend} = useFetch({url:`/job`, method:"POST", body:jobForm, token:token})

    const handleChange = (e) => {
        setJobForm({ ...jobForm, [e.target.name]: e.target.value })
    }



    const submitForm = (e) => {
        e.preventDefault();
        console.log("token : ", token)
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
        if( job != undefined) {
            setJobForm(job)
            setEdit(true)
        } else {    
            setJobForm()
            setEdit(false)
        }
    }, [job]);

    useEffect(() => {
        if (dataUpdate.success || dataAppend.success) {
            updateJobs();
            setIsOpen(false);
        }
    }, [dataUpdate, dataAppend]);


    if (loadingJob || loadingAppend) return <Loading />
    if (errorJob) console.log(errorJob);
    if (errorAppend) console.log(errorAppend);

    return (
        <Modal title="Job" closeModal={()=>setIsOpen(false)}>
            <form onSubmit={(e) => {submitForm(e)}}>
                <Input 
                label="name" 
                type="text" 
                name="name" 
                value={jobForm?.name}
                isRequired={true}
                placeholder="job name"
                onChange={(e) => handleChange(e)}
                />
                {edit && <Button type="submit" title="modifier" className="btn__primary"/> || <Button type="submit" title="ajouter" className="btn__primary"/>}
                
            </form>
        </Modal>
    );
}

export default Index;
