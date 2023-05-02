import styles from "./index.module.scss";
import Modal from "@/components/UI/Modal";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import Selector from "@/components/UI/Selector";


import { useEffect, useState, useContext } from "react";
 



const Index = ({ setIsOpen, mission, updateMissions }) => {
    const [token, setToken] = useState();
    const [missionForm, setMissionForm] = useState();
    const [edit, setEdit] = useState(false);
    const {data: dataUpdate, error:errorMission, loading:loadingMission, fetchData:fetchDataUpdate} = useFetch({url:`/mission/${mission?._id}`, method:"PUT", body:missionForm, token:token})
    const {data: dataAppend, error:errorAppend, loading:loadingAppend, fetchData:fetchDataAppend} = useFetch({url:`/mission`, method:"POST", body:missionForm, token:token})
    const {data: jobs, error: errorJobs, loading: loadingJobs, fetchData: fetchDataJobs} = useFetch({url:"/job", method:"GET", body:null, token:null})
    const {data: skills, error: errorSkills, loading: loadingSkills, fetchData: fetchDataSkills} = useFetch({url:"/skill", method:"GET", body:null, token:null})

    const handleChange = (e) => {
        if (e.target.name === "start" || e.target.name === "end"){
            if (missionForm.date === undefined) {
                setMissionForm({ ...missionForm, date: {} })
            }
            let newDate = {...missionForm.date}
            newDate[e.target.name] = e.target.value
            setMissionForm({ ...missionForm, date: newDate })
        }else {
            setMissionForm({ ...missionForm, [e.target.name]: e.target.value })
        }
    }



    const submitForm = (e) => {
        e.preventDefault();
        console.log("token : ", token)
        console.log("missionForm : ", missionForm)
        console.log("edit : ", edit)
        if (token != undefined && token != null && token != ""){
            if (edit) {
                fetchDataUpdate();
            } else {
                fetchDataAppend();
            }
        }
    }

    const missionAppendList = (e) => {
        let mission = {...missionForm}
        if(mission[e.target.name] === undefined) {
            mission[e.target.name] = []
        }
        console.log(e.target.value)
        let appendObj = JSON.parse(e.target.value)
        if (mission[e.target.name].includes(appendObj.name) === false) {
            mission[e.target.name].push(appendObj)
            setMissionForm(mission)
        } else {
            console.log("value already exist")
        }
    }

    const missionRemoveList = (e) => {
        let mission = {...missionForm}
        let removeObj = JSON.parse(e.target.value)
        console.log(mission[e.target.name])
        let index = mission[e.target.name].findIndex(obj => JSON.stringify(obj) === JSON.stringify(removeObj))
        if (index > -1) {
            mission[e.target.name].splice(index, 1);
            setMissionForm(mission)
        } else {
            console.log("value no exist")
        }
    }

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

    useEffect(() => {
        if( mission != undefined) {
            mission.date.start = new Date(mission.date.start).toISOString().split('T')[0]
            mission.date.end = new Date(mission.date.end).toISOString().split('T')[0]
            setMissionForm(mission)
            setEdit(true)
        } else {    
            setMissionForm()
            setEdit(false)
        }
    }, [mission]);

    useEffect(() => {
        if (dataUpdate.success || dataAppend.success) {
            updateMissions();
            setIsOpen(false);
        }
    }, [dataUpdate, dataAppend]);

    useEffect(() => {
        if (mission === undefined) {
            setMissionForm({date:{}})
        }
        fetchDataJobs();
        fetchDataSkills();
    }, []);


    if (loadingMission || loadingAppend || loadingJobs || loadingSkills) return <Loading />
    if (errorMission) console.log(errorMission);
    if (errorAppend) console.log(errorAppend);
    if (errorJobs) console.log(errorJobs);
    if (errorSkills) console.log(errorSkills);

    return (
        <Modal title="mission" closeModal={()=>setIsOpen(false)}>
            <form onSubmit={(e) => {submitForm(e)}}>
                <Input 
                label="title" 
                type="text" 
                name="title" 
                value={missionForm?.title}
                isRequired={true}
                placeholder="title"
                onChange={(e) => handleChange(e)}
                />
                <Input 
                label="description" 
                type="text" 
                name="description" 
                value={missionForm?.description}
                isRequired={true}
                placeholder="description"
                onChange={(e) => handleChange(e)}
                />
                <Input 
                label="date start" 
                type="date" 
                name="start" 
                value={missionForm?.date?.start}
                isRequired={true}
                placeholder="date start"
                onChange={(e) => handleChange(e)}
                />
                <Input 
                label="date end" 
                type="date" 
                name="end" 
                value={missionForm?.date?.end}
                isRequired={true}
                placeholder="date end name"
                onChange={(e) => handleChange(e)}
                />
                <Input 
                label="price" 
                type="number" 
                name="price" 
                value={missionForm?.price}
                isRequired={true}
                placeholder="price"
                onChange={(e) => handleChange(e)}
                />
                {
                    jobs != null && (
                        <Selector
                        label="jobs"
                        name="jobs"
                        value={missionForm?.jobs}
                        isRequired={true}   
                        placeholder="enter your jobs"
                        onChange={(e) => missionAppendList(e)}
                        options={jobs}
                        />
                    )   
                }
                <p>jobs : {missionForm?.jobs?.map((job) => {
                    return <Button type="button" key={job.id} title={job.name} value={JSON.stringify(job)} className="btn_delete" name="jobs" handleClick={missionRemoveList} />
                } 
                )}</p>
                {
                    skills != null && (           
                        <Selector
                        label="skill"
                        name="skills"
                        value={missionForm?.skill}
                        isRequired={true}
                        placeholder="enter your skill"              
                        onChange={(e) => missionAppendList(e)}
                        options={skills}    
                        />
                    )
                }

                <p>skills : {missionForm?.skills?.map((skill) => {
                    return <Button type="button" key={skill.id} title={skill.name} value={JSON.stringify(skill)} className="btn_delete" name="skills" handleClick={missionRemoveList} />
                }
                )}</p>
                {edit && <Button type="submit" title="modifier" className="btn__primary"/> || <Button type="submit" title="ajouter" className="btn__primary"/>}
                
            </form>
        </Modal>
    );
}

export default Index;
