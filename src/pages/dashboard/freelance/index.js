import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import ImageBanner from "@/components/UI/ImageBanner";
import CardProposal from "@/components/UI/CardProposal";


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
            <ImageBanner  title={`Propositions`} image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZWxhbmNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            {dataProposals.success && dataProposals?.map((proposal) => {
                return <CardProposal proposal={proposal} key={proposal._id} token={token}/>
            })}
        </div>
    );
}



export default Index;
