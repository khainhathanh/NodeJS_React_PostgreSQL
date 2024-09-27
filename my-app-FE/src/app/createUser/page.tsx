'use client'

import createUser from "@/adapter/currencyApi/swr/hooks/createUser";
import { findUser } from "@/adapter/currencyApi/swr/hooks/findUser";
import updateUser from "@/adapter/currencyApi/swr/hooks/updateUser";
import "@/styles/app.css";
import { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const idUser = searchParams.get('id');
    const [user, setUser] = useState<any[]>([]);
    const { register, handleSubmit, watch ,setValue} = useForm();
    useEffect( ()=>{
        if(idUser != null){
            const fetchData = async () =>{
                const res: AxiosResponse<any> = await findUser({id : idUser})
                setUser(res.data)
                return res.data
              }
            fetchData().then((user)=>{
                setValue('username', user[0].username || '');
                setValue('fullname', user[0].fullname || '');
                setValue('email', user[0].email || '');
                setValue('phone', user[0].phone || '');
                setValue('password', user[0].pass || '');
            });
        }
       
    },[idUser])    
    const submitCreateUser: any = (async ()=>
        {
            let res: AxiosResponse<any>
            if(user.length > 0){
                res = await updateUser(
                    {
                        id: user[0].id,
                        userName : watch('username'),
                        fullName : watch('fullname'),
                        email    : watch('email'),
                        phone    : watch('phone'),
                        password : watch('password')
                    })
            }else{
                res = await createUser(
                    {
                        userName : watch('username'),
                        fullName : watch('fullname'),
                        email    : watch('email'),
                        phone    : watch('phone'),
                        password : watch('password')
                    })
            }
            if(res.data > 0){
                router.push('/dashboard')
            }
        }
    )

    return(
        <div className="main-block">
            <div className="left-part">
                <i className="fa fa-user-plus"></i>
                <h1>Welcom to Add User System</h1>
            </div>
            <form>
                
                <div className="title">
                    <i className="fas fa-pencil-alt"></i> 
                    <h2>New User</h2>
                </div>
                <div className="info">
                    <input {...register('username')} type="text" name="username" placeholder="Username" />
                    <input {...register('fullname')} type="text" name="fullname" placeholder="Full name"/>
                    <input {...register('email')} type="text" name="email" placeholder="Email" />
                    <input {...register('phone')} type="text" name="phone" placeholder="Phone" />
                    <input {...register('password')} type="text" name="password" placeholder="Password" />
                    {/* <select>
                        <option value="course-type" selected>Course type*</option>
                        <option value="short-courses">Short courses</option>    
                        <option value="featured-courses">Featured courses</option>
                        <option value="undergraduate">Undergraduate</option>
                        <option value="diploma">Diploma</option>
                        <option value="certificate">Certificate</option>
                        <option value="masters-degree">Masters degree</option>
                        <option value="postgraduate">Postgraduate</option>
                    </select>  */}
                </div>
                {/*  <div className="checkbox">
                <input type="checkbox" name="checkbox"><span>I agree to the <a href="https://www.w3docs.com/privacy-policy">Privacy Poalicy for W3Docs.</a></span>
                </div>  */}
                <button type="button" className = "btn btn-createuser" onClick={handleSubmit(submitCreateUser)}>Submit</button>
            </form>
    </div>
    )
}