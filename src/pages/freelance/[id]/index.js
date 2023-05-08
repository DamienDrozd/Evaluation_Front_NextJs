import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import useFetch from '../../../hooks/useFetch';
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import UserContext from "@/context/UserContext";
import Selector from "@/components/UI/Selector";
import Notification from "@/components/UI/Notification";
import ImageBanner from "@/components/UI/ImageBanner"
import UserDetail from "@/components/user/UserDetail"
import Card from "@/components/UI/Card"

const Index = () => {

  const router = useRouter();
  const { user } = useContext(UserContext);
  const [token, setToken] = useState();
  const [missionsTitle, setMissionsTitle] = useState([]);
  const [id, setId] = useState();
  const [proposition, setProposition] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const {data: freelance, loading, error, fetchData} = useFetch({url:`/user/freelance/${id}`,method:"GET", body:null, token:null})
  const { fetchData : fetchMissions, data : dataMissions, error: errorMissions, loading: loadingMissions } = useFetch({ url: "/mission", method: "GET", token: token })
  const { fetchData : sendProposal, data : dataProposal, error: errorProposal, loading: loadingProposal } = useFetch({ url: `/proposal/company/${id}`, method: "POST", token: token, body: proposition})

  const handleChange = (e) => {
    let appendObj = JSON.parse(e.target.value)
    setProposition({ mission_id: appendObj.id })
    setButtonDisabled(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendProposal();
  }

  useEffect(() => {
    if (dataProposal.success) {
      router.push(`/`)
    }
  }, [dataProposal])

  useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
    if (id) {
      fetchData();
    }
  }, [router.isReady, id])

  useEffect(() => {
    if (user.company != undefined && token != undefined) {
      fetchMissions();
    }
  }, [user, token])

  useEffect(() => {
    if (dataMissions.length > 0) {
      const missions = dataMissions.map(mission => {
        if (mission.proposals.find(proposal => proposal.user == id)) {
          return { id: mission._id, name: mission.title, disabled: true }
        } else {
          return { id: mission._id, name: mission.title }
        }
      })
      setMissionsTitle(missions);
    }
  }, [dataMissions])


  if(loading || loadingMissions || loadingProposal) return <Loading/>
  if (error) console.log(error);
  if (errorMissions) console.log(errorMissions);
  if (errorProposal) console.log(errorProposal);


  return (
    <div>
      <ImageBanner  title={`${freelance?.firstName} ${freelance?.lastName}`} image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZWxhbmNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
      <UserDetail user={freelance}/>
      {user.company &&
        <Card>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Proposer une mission</h3>
            <Selector
              label="Missions"
              name="missions"
              options={missionsTitle}
              onChange={(e) => handleChange(e)}
            />
            <Button title="Envoyer la proposition" className="btn__primary" type="submit" disabled={buttonDisabled} />
          </form>
        </Card>
      }
      {errorProposal && <Notification type="warning" message={errorProposal.stack} />}
      {errorMissions && <Notification type="warning" message={errorMissions.stack} />}
    </div>
  );
}

export default Index;
