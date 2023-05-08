import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditJob from "@/components/Edit/EditJob";
import Card from "@/components/UI/Card";
import ImageBanner from "@/components/UI/ImageBanner";





const Index = () => {  
    const [token, setToken] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [editJob, setEditJob] = useState();
    const [deleteJob, setDeleteJob] = useState();
    const { fetchData : fetchJobs, data : dataJobs, error: errorJobs, loading: loadingJobs } = useFetch({ url: "/job", method: "GET", token: token })
    const { fetchData : fetchDeleteJob, data : dataDeleteJob, error: errorDeleteJob, loading: loadingDeleteJob } = useFetch({url:`/job/${deleteJob?._id}`, method:"DELETE", token:token})

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
        fetchJobs();
    }, [])


    useEffect(() => {
        if (deleteJob) {
            fetchDeleteJob();
        }   
    }, [deleteJob])

    useEffect(() => {
        if (dataDeleteJob) {
            fetchJobs();
        }
    }, [dataDeleteJob])




    if(loadingJobs) <Loading/> 
    if (errorJobs) console.log(errorJobs);
  
    return (
        <div>
            {
                isOpen && (
                    <EditJob setIsOpen={setIsOpen} job={editJob} updateJobs={fetchJobs} />
                )
            }
            <ImageBanner  title="Jobs" image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZWxhbmNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <Button title="Ajouter" className="btn__primary" type="button" handleClick={ 
                () => {
                    setIsOpen(true)
                    setEditJob();
                } } 
            />
            { Array.isArray(dataJobs) && dataJobs.map(job => (
                <Card key={job._id}>
                    <p>{job.name}</p>
                    <Button title="modifier" className="btn__primary" type="button" handleClick={ 
                        () => {
                            setIsOpen(true);
                            setEditJob(job);
                        }
                    } />
                    <Button title="supprimer" className="btn__primary" type="button" handleClick={
                        () => {
                            setDeleteJob(job);
                        }
                    } />
                </Card>
            ))}
        </div>
    );
}

export default Index;
