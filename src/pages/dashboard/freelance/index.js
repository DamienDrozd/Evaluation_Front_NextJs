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
            fetchDataProposals()
        }
    }, [token]);

    


    if (loadingProposals ) return <Loading />
    if (errorProposals) console.log(errorProposals)
    
  
    return (
        <div>
            <h1>freelance Dashboard</h1>
            <h2>Vos propositions de Mission : </h2>
            {dataProposals.success && dataProposals?.map((proposal) => {
                return <Proposal proposal={proposal} key={proposal._id} token={token}/>
            })}
        </div>
    );
}

const Proposal = ({proposal, token}) => {

    const {data: dataAccept, error:errorAccept, loading:loadingAccept, fetchData:fetchAccept} = useFetch({url:`/proposal/freelance/accept/${proposal._id}`, method:"GET", token:token})
    const {data: dataDeny, error:errorDeny, loading:loadingDeny, fetchData:fetchDeny} = useFetch({url:`/proposal/freelance/deny/${proposal._id}`, method:"GET", token:token})

    const acceptProposal = () => {
        fetchAccept()
    }

    const refuseProposal = () => {
        fetchDeny()
    }   

    if (loadingAccept || loadingDeny) return <Loading />

    if (errorAccept) console.log(errorAccept)
    if (errorDeny) console.log(errorDeny)

    return (
        <div key={proposal._id}>
            <h3>proposal : </h3>
            <p>{proposal.mission?.title}</p>
            <p>{proposal.mission?.description}</p>   
            <p>{proposal.mission?.date?.start}</p>
            <p>{proposal.mission?.date?.end}</p>  
            <p>{proposal.mission?.price}</p>
            <p>{proposal.mission?.status}</p>
            <p>{proposal.company?.name}</p>
            <p>{proposal.company?.address}</p>
            <Button type="submit" title="accepter" className="btn__primary" handleClick={() => acceptProposal()}/>
            <Button type="submit" title="refuser" className="btn__primary" handleClick={() => refuseProposal()}/>
        </div>
    )
}

export default Index;
