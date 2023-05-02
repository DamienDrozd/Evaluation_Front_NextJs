import React from 'react';
import styles from "./index.module.scss";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import useFetch from "@/hooks/useFetch";
import Selector from "@/components/UI/Selector";
import Button from "@/components/UI/Button";
import { useEffect, useState } from "react";


const Index = ({submit, title, setFilters, filters}) => {
    const {data: jobs, error: errorJobs, loading: loadingJobs, fetchData: fetchDataJobs} = useFetch({url:"/job", method:"GET", body:null, token:null})
    const {data: skills, error: errorSkills, loading: loadingSkills, fetchData: fetchDataSkills} = useFetch({url:"/skill", method:"GET", body:null, token:null})

    const filterAppendList = (e) => {
        let newFilter = {...filters}
        if(newFilter[e.target.name] === undefined) {
            newFilter[e.target.name] = []
        }
        let appendObj = JSON.parse(e.target.value)
        if (newFilter[e.target.name].includes(appendObj.name) === false) {
            newFilter[e.target.name].push(appendObj)
            setFilters(newFilter)
        }
    }

    const filterRemoveList = (e) => {
        let newFilter = {...filters}
        let removeObj = JSON.parse(e.target.value)
        let index = newFilter[e.target.name].findIndex(obj => JSON.stringify(obj) === JSON.stringify(removeObj))
        if (index > -1) {
            newFilter[e.target.name].splice(index, 1);
            setFilters(newFilter)
        } 
    }

    useEffect(() => {
        fetchDataJobs();
        fetchDataSkills();
    }, []);


    if (loadingJobs || loadingSkills) return <Loading />;
    if (errorJobs) console.log(errorJobs);
    if (errorSkills) console.log(errorSkills);

    return (
        <div className={styles.filters}>
            <form onSubmit={(e) => submit(e)}>
                <div className={styles.center}>
                    <Button type="submit" title="search" className="btn__primary" />
                </div>
                {/* price min */}
                <Input value={filters["price_min"]} type="number" name="price_min" placeholder="prix minimum" onChange={(e) => setFilters({...setFilters, price_min: e.target.value})}/>
                {/* price max */}
                <Input value={filters["price_max"]} type="number" name="price_max" placeholder="prix maximum" onChange={(e) => setFilters({...setFilters, price_max: e.target.value})}/>
                {/* experience min */}    
                <Input value={filters["experience_min"]} type="number" name="experience_min" placeholder="experience minimum" onChange={(e) => setFilters({...setFilters, experience_min: e.target.value})}/>
                {/* experience max */}
                <Input value={filters["experience_max"]} type="number" name="experience_max" placeholder="experience maximum" onChange={(e) => setFilters({...setFilters, experience_max: e.target.value})}/>
                {/* skills */}
                <Selector
                label="skill"
                name="skills"
                value={filters?.skills}
                isRequired={true}
                placeholder="enter your skill"              
                onChange={(e) => filterAppendList(e)}
                options={skills}    
                />
                { filters?.skills !== [] && filters?.skills !== undefined ?
                    <p>skills : {filters?.skills?.map((skill) => {
                            return <Button type="button" key={skill.id} title={skill.name} value={JSON.stringify(skill)} className="btn__remove" name="skills" handleClick={filterRemoveList} />
                        })}
                    </p> : null
                }
                {/* jobs */}
                <Selector
                label="job"
                name="jobs"
                value={filters?.jobs}
                isRequired={true}   
                placeholder="enter your job"
                onChange={(e) => filterAppendList(e)}
                options={jobs}
                />
                { filters?.jobs !== [] && filters?.jobs !== undefined ?
                    <p>jobs : {filters?.jobs?.map((job) => {
                            return <Button type="button" key={job.id} title={job.name} value={JSON.stringify(job)} className="btn__remove" name="jobs" handleClick={filterRemoveList} />
                        })}
                    </p> : null
                }
                {/* location */}
            </form>
        </div>
    );
}

export default Index;
