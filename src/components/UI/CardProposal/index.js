import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card"


const Index = ({proposal, token}) => {
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
      <>
          <Card key={proposal._id} className={proposal}>
              <h3>{proposal.mission?.title}</h3>
              <p>{proposal.mission?.description}</p>   
              <p>{proposal.mission?.date?.start}</p>
              <p>{proposal.mission?.date?.end}</p>  
              <p>{proposal.mission?.price}</p>
              <p>{proposal.mission?.status}</p>
              <p>{proposal.company?.name}</p>
              <p>{proposal.company?.address}</p>
              <Button type="submit" title="accepter" className="btn__primary" handleClick={() => acceptProposal()}/>
              <Button type="submit" title="refuser" className="btn__primary" handleClick={() => refuseProposal()}/>
          </Card>
      </>
  )
}


export default Index;
