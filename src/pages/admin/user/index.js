import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditUser from "@/components/Edit/EditUser";


const Index = () => {  
    const [token, setToken] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [editUser, setEditUser] = useState();
    const [deleteUser, setDeleteUser] = useState();
    const { fetchData : fetchUsers, data : dataUsers, error: errorUsers, loading: loadingUsers } = useFetch({ url: "/user/admin/", method: "GET", token: token })
    const { fetchData : fetchDeleteUser, data : dataDeleteUser, error: errorDeleteUser, loading: loadingDeleteUser } = useFetch({url:`/user/admin/${deleteUser?._id}`, method:"DELETE", token:token})

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

    useEffect(() => {
        fetchUsers();
    }, [token])


    useEffect(() => {
        if (deleteUser) {
            fetchDeleteUser();
        }   
    }, [deleteUser])

    useEffect(() => {
        if (dataDeleteUser) {
            fetchUsers();
        }
    }, [dataDeleteUser])




    if(loadingUsers) <Loading/> 
    if (errorUsers) console.log(errorUsers);
  
    return (
        <div>
            {
                isOpen && (
                    <EditUser setIsOpen={setIsOpen} user={editUser} updateUsers={fetchUsers} />
                )
            }
            <h1>Users</h1>
            { Array.isArray(dataUsers) && dataUsers.map(User => (
                <div key={User._id}>
                    {
                        User && (
                        <>
                            <p>Firstname : {User.firstName}</p>
                            <p>LastName : {User.lastName}</p>
                            <p>Email : {User.email}</p>
                            <p>Address : {User.address}</p>
                            <p>Phone : {User.phone}</p>
                            <p>post code : {User.postcode}</p>
                            <p>city : {User.city}</p>
                        </>
                        )
                    }
                    {
                        User.freelance != null && (
                        <>
                            <p>Freelance</p>
                            <p>experience_years : {User.freelance.experience_years} </p>
                            <p>jobs : {User.freelance.jobs.map((job) => {
                                return <p key={job.id}>{job.name}</p>
                            }
                            )}</p>
                            <p>price : {User.freelance.price}</p>
                            <p>skills : {User.freelance.skills.map((skill) => {
                                return <p key={skill.id}>{skill.name}</p>
                            }
                            )}</p>
                        </>
                        )
                    }
                    <Button title="modifier" className="btn__primary" type="button" handleClick={ 
                        () => {
                            setIsOpen(true);
                            setEditUser(User);
                        }
                    } />
                    <Button title="supprimer" className="btn__primary" type="button" handleClick={
                        () => {
                            setDeleteUser(User);
                        }
                    } />
                </div>
            ))}
        </div>
    );
}

export default Index;
