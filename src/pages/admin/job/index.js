import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditJob from "@/components/Edit/EditJob";


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
            <h1>Jobs</h1>
            <Button title="Ajouter" className="btn__primary" type="button" handleClick={ 
                () => {
                    setIsOpen(true)
                    setEditJob();
                } } 
            />
            { Array.isArray(dataJobs) && dataJobs.map(job => (
                <div key={job._id}>
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
                </div>
            ))}
        </div>
    );
}

export default Index;
