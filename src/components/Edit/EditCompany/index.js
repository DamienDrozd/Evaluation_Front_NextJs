import Modal from "@/components/UI/Modal";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";


import { useEffect, useState } from "react";




const Index = ({ setIsOpen, Company, updateCompanys, isAdmin }) => {
    const [token, setToken] = useState();
    const [CompanyForm, setCompanyForm] = useState();
    const {data: dataAdminUpdate, error:errorAdminUpdate, loading:loadingAdminUpdate, fetchData:fetchDataAdminUpdate} = useFetch({url:`/user/company/admin/${Company?._id}`, method:"PUT", body:CompanyForm, token:token})
    const {data: dataUserUpdate, error:errorUserUpdate, loading:loadingUserUpdate, fetchData:fetchDataUserUpdate} = useFetch({url:`/user/company/`, method:"PUT", body:CompanyForm, token:token})

    const handleChange = (e) => {
        setCompanyForm({ ...CompanyForm, [e.target.name]: e.target.value })
    }


    const submitForm = (e) => {
        e.preventDefault();
        if (token != undefined && token != null && token != ""){
            if (isAdmin !== false) {
                fetchDataAdminUpdate();
            } else {
                fetchDataUserUpdate();
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
        if( Company != undefined) {
            setCompanyForm(Company)
        }
    }, [Company]);

    useEffect(() => {
        if (dataAdminUpdate.success) {
            updateCompanys()
            setIsOpen(false);
        }
    }, [dataAdminUpdate]);

    useEffect(() => {
        if (dataUserUpdate.success) {
            updateCompanys()
            setIsOpen(false);
        }
    }, [dataUserUpdate]);



    if (loadingUserUpdate || loadingAdminUpdate) return <Loading />
    if (errorUserUpdate) console.log(errorUserUpdate);
    if (errorAdminUpdate) console.log(errorAdminUpdate);


    return (
        <Modal title="Modifier mon profil" closeModal={()=>setIsOpen(false)}>
            <form onSubmit={(e) => {submitForm(e)}}>
                <Input 
                label="name" 
                type="text" 
                name="name" 
                value={CompanyForm?.name}
                isRequired={true}
                placeholder="enter your company name"
                onChange={(e) => handleChange(e)}
                />
                <Input 
                label="status" 
                type="text" 
                name="status" 
                value={CompanyForm?.status}
                isRequired={true}
                placeholder="enter your company status"
                onChange={(e) => handleChange(e)}
                />
                <Input 
                label="siret" 
                type="text" 
                name="siret" 
                value={CompanyForm?.siret}
                isRequired={true}
                placeholder="enter your company siret"
                onChange={(e) => handleChange(e)}
                />
                <Input
                label="address"
                type="text"
                name="address"
                value={CompanyForm?.address}            
                isRequired={true}   
                placeholder="enter your company address"    
                onChange={(e) => handleChange(e)}   
                />
                <Input
                label="postcode"
                type="text"
                name="postcode"   
                value={CompanyForm?.postcode}
                isRequired={true}   
                placeholder="enter your company postcode" 
                onChange={(e) => handleChange(e)} 
                />
                <Input
                label="city"
                type="text"
                name="city"   
                value={CompanyForm?.city}
                isRequired={true}
                placeholder="enter your company city" 
                onChange={(e) => handleChange(e)}
                /> 
                <Button type="submit" title="modifier" className="btn__primary"/>
            </form>
        </Modal>
    );
}

export default Index;
