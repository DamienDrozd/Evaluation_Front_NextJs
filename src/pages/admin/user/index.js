import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditUser from "@/components/Edit/EditUser";
import Card from "@/components/UI/Card";
import ImageBanner from "@/components/UI/ImageBanner";
import CategoryCard from "@/components/UI/CategoryCard";



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
            <ImageBanner  title="Users" image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZWxhbmNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>

            { Array.isArray(dataUsers) && dataUsers.map(User => (
                <Card key={User?._id}>
                    {
                        User && (
                        <>
                            <p>Firstname : {User?.firstName}</p>
                            <p>LastName : {User?.lastName}</p>
                            <p>Email : {User?.email}</p>
                            <p>Address : {User?.address}</p>
                            <p>Phone : {User?.phone}</p>
                            <p>post code : {User?.postcode}</p>
                            <p>city : {User?.city}</p>
                        </>
                        )
                    }
                    {
                        User?.freelance != null && (
                        <>
                            <p>Freelance</p>
                            <p>experience_years : {User?.freelance?.experience_years} </p>
                            <p>price : {User?.freelance?.price}</p>
                            {User?.freelance?.jobs.length > 0 && (
                                <p>jobs : {User?.freelance?.jobs.map((job) => {
                                    return <CategoryCard key={job.id} title={job.name} className="category__job"/>
                                }
                                )}</p>
                            )}
                            {User?.freelance?.skills.length > 0  && (
                                <p>skills : {User?.freelance?.skills.map((skill) => {
                                    return <CategoryCard key={skill.id} title={skill.name} className="category__skill"/>
                                }
                                )}</p>
                            )}

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
                </Card>
            ))}
        </div>
    );
}

export default Index;
