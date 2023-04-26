import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import useFetch from '../../../hooks/useFetch';
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Selector from "@/components/UI/Selector";
import Notification from "@/components/UI/Notification";

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
    console.log("appendObj : ", appendObj)
    setProposition({ mission_id: appendObj.id })
    setButtonDisabled(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("proposition : ", proposition)
    sendProposal();
  }

  useEffect(() => {
    console.log("dataProposal : ", dataProposal)
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
    console.log("dataMissions : ", dataMissions)
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


  if(loading) return <Loading/>
  if (error) console.log(error);
  if (errorMissions) console.log(errorMissions);
  if (errorProposal) console.log(errorProposal);


  return (
    <div>
      <div className={styles.thumbnail}>
        <img src={freelance?.thumbnail} alt={freelance?.name} />
      </div>
      <div className={styles.content}>
        <p>{freelance?.firstName}</p>
        <p>{freelance?.lastName}</p>
        <p>{freelance?.city}</p>
        <p>{freelance?.country}</p>

        <p>{freelance?.freelance?.price} €</p>
        <p>{freelance?.freelance?.experience_years}</p>
        {freelance?.freelance?.skills.map(skill => (
          <p key={skill.id}>{skill.name}</p>
        ))}
        {freelance?.freelance?.jobs.map(job => (
          <p key={job.id}>{job.name}</p>
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Selector
          label="Missions"
          name="missions"
          options={missionsTitle}
          onChange={(e) => handleChange(e)}
        />
        <Button title="Envoyer la proposition" className="btn__primary" type="submit" disabled={buttonDisabled} />
      </form>
      {errorProposal && <Notification type="warning" message={errorProposal.stack} />}
      {errorMissions && <Notification type="warning" message={errorMissions.stack} />}
    </div>
  );
}

export default Index;
