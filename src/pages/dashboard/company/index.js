import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditMission from "@/components/Edit/EditMission";


const Index = () => {  
    const [token, setToken] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [editMission, setEditMission] = useState();
    const [deleteMission, setDeleteMission] = useState();
    const { fetchData : fetchMissions, data : dataMissions, error: errorMissions, loading: loadingMissions } = useFetch({ url: "/mission", method: "GET", token: token })
    const { fetchData : fetchDeleteMission, data : dataDeleteMission, error: errorDeleteMission, loading: loadingDeleteMission } = useFetch({url:`/mission/${deleteMission?._id}`, method:"DELETE", token:token})

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

    useEffect(() => {
        if (deleteMission) {
            fetchDeleteMission();
        }   
    }, [deleteMission])

    useEffect(() => {
        if (dataDeleteMission) {
            fetchMissions();
        }
    }, [dataDeleteMission])

    useEffect(() => {
        fetchMissions();
    }, [token])

    console.log(dataMissions);
  
    return (
        <div>
            {
                isOpen && (
                    <EditMission setIsOpen={setIsOpen} mission={editMission} updateMissions={fetchMissions} />
                )
            }
            <h1>Missions</h1>
            <Button title="Ajouter" className="btn__primary" type="button" handleClick={ 
                () => {
                    setIsOpen(true)
                    setEditMission();
                } } 
            />
            { Array.isArray(dataMissions) && dataMissions.map(Mission => (
                <div key={Mission._id}>
                    <p>{Mission.title}</p>
                    <p>{Mission.description}</p>
                    <p>{Mission.date.start}</p>
                    <p>{Mission.date.end}</p> 
                    <p>{Mission.price}</p>
                    <p>jobs : {Mission?.jobs.map((job) => {
                        return <p key={job.id}>{job.name}</p>
                    }
                    )}</p>
                    <p>skills : {Mission?.skills.map((skill) => {
                        return <p key={skill.id}>{skill.name}</p>
                    }
                    )}</p>
                    <Button title="modifier" className="btn__primary" type="button" handleClick={ 
                        () => {
                            setIsOpen(true);
                            setEditMission(Mission);
                        } 
                    } />
                    <Button title="supprimer" className="btn__primary" type="button" handleClick={
                        () => {
                            setDeleteMission(Mission);
                        }
                    } />
                </div>
            ))}
        </div>
    );
}

export default Index;
