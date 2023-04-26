import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditCompany from "@/components/Edit/EditCompany";


const Index = () => {  
    const [token, setToken] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [editCompany, setEditCompany] = useState();
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




    if(loadingCompanys) <Loading/> 
    if (errorCompanys) console.log(errorCompanys);
  
    return (
        <div>
            {
                isOpen && (
                    <EditCompany setIsOpen={setIsOpen} Company={editCompany} updateCompanys={fetchCompanys} />
                )
            }
            <h1>Companys</h1>
            { Array.isArray(dataCompanys) && dataCompanys.map(Company => (
                <div key={Company._id}>
                    {
                        Company && (
                        <>
                            <p>name : {Company.name}</p>
                            <p>status : {Company.status}</p>
                            <p>siret : {Company.siret}</p>
                            <p>address : {Company.address}</p>
                            <p>post code : {Company.postcode}</p>
                            <p>city : {Company.city}</p>
                            <p>missions : {Company.missions}</p>
                        </>
                        )
                    }
                    <Button title="modifier" className="btn__primary" type="button" handleClick={ 
                        () => {
                            setIsOpen(true);
                            setEditCompany(Company);
                        }
                    } />
                    <Button title="supprimer" className="btn__primary" type="button" handleClick={
                        () => {
                            setDeleteCompany(Company);
                        }
                    } />
                </div>
            ))}
        </div>
    );
}

export default Index;
