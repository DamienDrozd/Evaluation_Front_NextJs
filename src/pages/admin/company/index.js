import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditCompany from "@/components/Edit/EditCompany";
import EditMission from "@/components/Edit/EditMission";
import Card from "@/components/UI/Card";
import CategoryCard from "@/components/UI/CategoryCard";
import ImageBanner from "@/components/UI/ImageBanner";




const Index = () => {  
    const [token, setToken] = useState();
    const [isOpenCompany , setIsOpenCompany] = useState(false);
    const [isOpenMission , setIsOpenMission] = useState(false);
    const [editCompany, setEditCompany] = useState();
    const [editMission, setEditMission] = useState();
    const [deleteCompany, setDeleteCompany] = useState();
    const { fetchData : fetchCompanys, data : dataCompanys, error: errorCompanys, loading: loadingCompanys } = useFetch({ url: "/user/company/admin/", method: "GET", token: token })
    const { fetchData : fetchDeleteCompany, data : dataDeleteCompany, error: errorDeleteCompany, loading: loadingDeleteCompany } = useFetch({url:`/user/company/admin/${deleteCompany?._id}`, method:"DELETE", token:token})

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

    useEffect(() => {
        fetchCompanys();
    }, [token])


    useEffect(() => {
        if (deleteCompany) {
            fetchDeleteCompany();
        }   
    }, [deleteCompany])

    useEffect(() => {
        if (dataDeleteCompany) {
            fetchCompanys();
        }
    }, [dataDeleteCompany])

    console.log(dataCompanys);


    if(loadingCompanys) <Loading/> 
    if (errorCompanys) console.log(errorCompanys);
  
    return (
        <div>
            {
                isOpenCompany && (
                    <EditCompany setIsOpen={setIsOpenCompany} Company={editCompany} updateCompanys={fetchCompanys} />
                )
            }
            {
                isOpenMission && (
                    <EditMission setIsOpen={setIsOpenMission} mission={editMission} updateMissions={fetchCompanys} />
                )
            }
            <ImageBanner  title="Companies" image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZWxhbmNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            { Array.isArray(dataCompanys) && dataCompanys.map(Company => (
                <Card key={Company?._id}>
                    {
                        Company && (
                        <>
                            <p>name : {Company?.name}</p>
                            <p>status : {Company?.status}</p>
                            <p>siret : {Company?.siret}</p>
                            <p>address : {Company?.address}</p>
                            <p>post code : {Company?.postcode}</p>
                            <p>city : {Company?.city}</p>
                            <p>missions : </p>
                            {Company?.missions.map(Mission => (
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
                                            setIsOpenMission(true);
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

                        </>
                        )
                    }
                    <Button title="modifier" className="btn__primary" type="button" handleClick={ 
                        () => {
                            setIsOpenCompany(true);
                            setEditCompany(Company);
                        }
                    } />
                    <Button title="supprimer" className="btn__primary" type="button" handleClick={
                        () => {
                            setDeleteCompany(Company);
                        }
                    } />
                </Card>
            ))}
        </div>
    );
}

export default Index;
