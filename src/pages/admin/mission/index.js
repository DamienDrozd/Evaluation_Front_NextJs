import { useEffect, useState, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditMission from "@/components/Edit/EditMission";
import Card from "@/components/UI/Card";
import ImageBanner from "@/components/UI/ImageBanner";


const Index = () => {  
    const [token, setToken] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [editMission, setEditMission] = useState();
    const [deleteMission, setDeleteMission] = useState();
    const { fetchData : fetchMissions, data : dataMissions, error: errorMissions, loading: loadingMissions } = useFetch({ url: "/mission/admin/", method: "GET", token: token })
    const { fetchData : fetchDeleteMission, data : dataDeleteMission, error: errorDeleteMission, loading: loadingDeleteMission } = useFetch({url:`/mission/${deleteMission?._id}`, method:"DELETE", token:token})

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
        fetchMissions();
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





    if(loadingMissions) <Loading/> 
    if (errorMissions) console.log(errorMissions);
  
    return (
        <div>
            {
                isOpen && (
                    <EditMission setIsOpen={setIsOpen} Mission={editMission} updateMissions={fetchMissions} />
                )
            }
            <ImageBanner  title="Missions" image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZWxhbmNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            { Array.isArray(dataMissions) && dataMissions.map(Mission => (
                <Card key={Mission._id}>
                    <p>{Mission.name}</p>
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
