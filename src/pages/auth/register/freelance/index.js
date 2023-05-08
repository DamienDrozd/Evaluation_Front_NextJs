import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Title from '@/components/UI/Title';
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import useFetch from '@/hooks/useFetch';
import FreelanceForm from "@/components/Form/Freelance";
import UserForm from "@/components/Form/User";
import Loading from "@/components/UI/Loading";



const Index = () => {

  const router = useRouter();
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [PhaseNumber, setPhaseNumber] = useState(0);
  const [formError, setFormError] = useState(null);

  const {fetchData, data, error, loading} = useFetch({url:'/auth/register/freelance', method:"POST", body:userForm, token:null})
  const {data: jobs, error: errorJobs, loading: loadingJobs, fetchData: fetchDataJobs} = useFetch({url:"/job", method:"GET", body:null, token:null})
  const {data: skills, error: errorSkills, loading: loadingSkills, fetchData: fetchDataSkills} = useFetch({url:"/skill", method:"GET", body:null, token:null})
    
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    fetchDataJobs();
    fetchDataSkills();
  }, []);

  const freelanceAppendList = (e) => {
    let freelance = {...userForm}
    if(freelance[e.target.name] === undefined) {
        freelance[e.target.name] = []
    }
    let appendObj = JSON.parse(e.target.value)
    let index = freelance[e.target.name].findIndex(obj => JSON.stringify(obj) === JSON.stringify(appendObj))
    if (index === -1) {
        freelance[e.target.name].push(appendObj)
        setUserForm(freelance)
    } else {
        console.log("value already exist")
    }
  }

  const freelanceRemoveList = (e) => {
    let freelance = {...userForm}
    if(freelance[e.target.name] === undefined) {
        freelance[e.target.name] = []
    }
    let removeObj = JSON.parse(e.target.value)
    let index = freelance[e.target.name].findIndex(obj => JSON.stringify(obj) === JSON.stringify(removeObj))
    if (index > -1) {
      freelance[e.target.name].splice(index, 1);
      setUserForm(freelance)
    } else {
      console.log("value no exist")
    }
  }

  const submitRegister = (e) => {
    e.preventDefault();    
    
    if(userForm.password !== userForm.confirmPassword && userForm.confirmPassword !== undefined ){
      setFormError('Les mots de passe ne correspondent pas');
    } else {
      setFormError(null);
      setPhaseNumber(PhaseNumber + 1);
    }
    if( PhaseNumber === 2 ){
      fetchData();
      setPhaseNumber(1);
    }
  }

  useEffect(() => {
    if (data !== undefined && data !== null && data !== {} && data.token !== undefined ) {
      localStorage.setItem('token', data.token);
      router.push('/account/profil')
    } else {
      setPhaseNumber(1);
    }
  }, [data, error])

  if (loading || loadingJobs || loadingSkills) {
    return  <Loading/> 
  }
  if (error || errorJobs || errorSkills) {
    console.log(error)
    console.log(errorJobs)
    console.log(errorSkills)
  }



  return (
    <>
      <Title title="Inscription" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        {PhaseNumber === 1 && (
              <>
                <UserForm userForm={userForm} handleChange={handleChange} />
              </>
            )}
            {PhaseNumber === 2 && (
              <>
                <FreelanceForm userForm={userForm} handleChange={handleChange} freelanceAppendList={freelanceAppendList} freelanceRemoveList={freelanceRemoveList} jobs={jobs} skills={skills} />
              </>
            )}
            {PhaseNumber > 1 && (
                <Button
                    type="button"
                    title="Précédent"
                    className="btn__secondary"
                    handleClick={() => setPhaseNumber(PhaseNumber - 1)}
                />
            )}
            <Button
                type="submit"
                title="Suivant"
                className="btn__secondary"
            />
        </form>
      
      {
        error && (
          <Notification type="warning" message={error?.message} />
        )
      }
      {
        formError && (
          <Notification type="warning" message={formError} />
        )
      }
    </>
  );
}

export default Index;
