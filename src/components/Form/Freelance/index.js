import Input from "@/components/UI/Input";
import Selector from "@/components/UI/Selector";
import Button from "@/components/UI/Button";

const Index = ({userForm, handleChange, freelanceAppendList, freelanceRemoveList, skills, jobs}) => {
  return (
    <>
        {/* price */}
        <Input
          label="Prix"
          type="price"
          name="price"
          placeholder="veuillez saisir votre prix"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.price}
        />
        {/* experience_years */}
        <Input
          label="Experience years"
          type="experience_years"
          name="experience_years" 
          placeholder="veuillez saisir votre nombre d'années d'expérience"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm?.experience_years}
        />
        <Selector
          label="job"
          name="jobs"
          value={userForm?.jobs}
          isRequired={true}   
          placeholder="enter your job"
          onChange={(e) => freelanceAppendList(e)}
          options={jobs}
        />
        <p>jobs : {userForm?.jobs?.map((job) => {
        return <Button type="button" key={job.id} title={job.name} value={JSON.stringify(job)} className="btn_delete" name="jobs" handleClick={freelanceRemoveList} />
        } 
        )}</p>
                
        <Selector
          label="skill"
          name="skills"
          value={userForm?.skill}
          isRequired={true}
          placeholder="enter your skill"              
          onChange={(e) => freelanceAppendList(e)}
          options={skills}    
        />
        <p>skills : {userForm?.skills?.map((skill) => {
        return <Button type="button" key={skill.id} title={skill.name} value={JSON.stringify(skill)} className="btn_delete" name="skills" handleClick={freelanceRemoveList} />
        }
        )}</p>
    </>
  );
}

export default Index;