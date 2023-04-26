import Modal from "@/components/UI/Modal";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import Selector from "@/components/UI/Selector";


import { useEffect, useState, useContext } from "react";


const Index = () => {  
    const [token, setToken] = useState(null);
    const {data: dataProposals, error:errorProposals, loading:loadingProposals, fetchData:fetchDataProposals} = useFetch({url:`/proposal/freelance/`, method:"GET", token:token})

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

    useEffect(() => {
        if( token != undefined) {
            console.log("token : ", token)
            fetchDataProposals()
        }
    }, [token]);



    console.log("dataProposals : ", dataProposals)

    if (loadingProposals) return <Loading />
    if (errorProposals) console.log(errorProposals)
  
    return (
        <div>
            <h1>freelance Dashboard</h1>
            <h2>Vos propositions de Mission : </h2>
            {dataProposals.success && dataProposals?.map((proposal) => {
                return (
                    <div key={proposal._id}>
                        <h3>proposal : </h3>
                        <p>{proposal.title}</p>
                        <p>{proposal.description}</p>   
                        <p>{proposal.date.start}</p>
                        <p>{proposal.date.end}</p>  
                        <p>{proposal.price}</p>
                        <p>{proposal.status}</p>
                        <p>{proposal.company.name}</p>
                        <p>{proposal.company.address}</p>
                    </div>
                )

            })}
        </div>
    );
}

export default Index;
