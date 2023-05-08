import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Button from "@/components/UI/Button";
import EditMission from "@/components/Edit/EditMission";
import Card from "@/components/UI/Card";
import CategoryCard from "@/components/UI/CategoryCard";
import ImageBanner from "@/components/UI/ImageBanner";



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

  
    return (
        <div>
            {
                isOpen && (
                    <EditMission setIsOpen={setIsOpen} mission={editMission} updateMissions={fetchMissions} />
                )
            }
            <ImageBanner  title={`Missions`} image="https://512pixels.net/wp-content/uploads/2021/06/12-Light-thumbnail-500x500.jpg"/>

            <Button title="Ajouter" className="btn__primary" type="button" handleClick={ 
                () => {
                    setIsOpen(true)
                    setEditMission();
                } } 
            />
            { Array.isArray(dataMissions) && dataMissions.map(Mission => (
                <Card key={Mission._id}>
                    <h3>{Mission.title}</h3>
                    <p>{Mission.description}</p>
                    <p>Début de la mission : {new Date(Mission.date.start).toDateString()}</p>
                    <p>Fin de la mission : {new Date(Mission.date.end).toDateString()}</p> 
                    <p>{Mission.price}</p>
                    {Mission?.jobs.length > 0 && (
                        <p>jobs : {Mission?.jobs.map((job) => {
                            return <CategoryCard key={job.id} title={job.name} className="category__job"/>
                        }
                        )}</p>
                    )}
                    {Mission?.skills.length > 0  && (
                        <p>skills : {Mission?.skills.map((skill) => {
                            return <CategoryCard key={skill.id} title={skill.name} className="category__skill"/>
                        }
                        )}</p>
                    )}              
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
                </Card>
            ))}
        </div>
    );
}

export default Index;
