'use client'
import "@/styles/app.css";
import { useEffect, useRef, useState } from "react";
import { useAccessControl } from "../../component/common/accessControl/useAccessControl";
import { AxiosResponse } from "axios";
import Pagination from "../../component/common/pagination/pagination";
import { getAllUser } from "../../adapter/currencyApi/swr/hooks/getAllUser";
import { useRouter } from "next/navigation";
import { deleteUser } from "../../adapter/currencyApi/swr/hooks/deleteUser";

function Users() {
  const [user, setUser] = useState<any[]>([])
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(false)
  const [isDelUser, setIsDelUser] = useState(0)
  const [itemPage, setItemPage] = useState<any[]>([])
  const keySearch = useRef<HTMLInputElement>(null);
  const totalPage: any[] = [];
  const router = useRouter();
  const auth  = useAccessControl();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchUser = async () =>{
        const fetchData = async () =>{
          const res: AxiosResponse<any> = await getAllUser({page : page, keySearch: keySearch.current?.value})
          return res;
        }
        
        await fetchData().then((rs) =>{
          // Kiem tra neu data khong co thi chuyen den trang truoc
          if(rs.data.data.length == 0 && page > 1){
            setPage(page-1);
          }
         
          setUser(rs.data.data)
          // Kiem tra neu list totalPage rong moi add, vi goi API 2 lan nen xay ra tinh trang bi add chong len nhau
          if(totalPage.length == 0){
            for(let page = 1 ; page < rs.data.totalPage+1; page++){
              totalPage.push(page)
            }
          }
          setItemPage(totalPage)
        })

        // neu click button search
        if(search){
          setPage(1)
          setSearch(false)
        }

        // neu click button delete
        if(isDelUser > 0){
          const fetchDelUser = async () =>{
            const res: AxiosResponse<any> = await deleteUser({id:isDelUser})
            return res;
          }
        await  fetchDelUser();
          setIsDelUser(0);
        }
      }
      fetchUser();
    }
  },[page,search,isDelUser])
  return (

    <div className="container">
      <div className="d-flex bd-highlight mb-3">
        <div className="me-auto p-2 bd-highlight"><h2>Users</h2></div>
        <div className="me-auto p-2 bd-highlight">
          <div className="search-container">
            <form action="">
              <input type="text"  className = "search-item" placeholder="Search..." name="search" ref={keySearch}/>
              <button type="button" onClick={()=> setSearch(true)}><i className="fa fa-search"></i></button>
            </form>
          </div>
        </div>
        <div className="p-2 bd-highlight">
          <button type="button" className="btn btn-secondary" onClick={()=>router.push('/createUser')}>Create</button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">DateCreate</th>
              <th scope="col" >Actions</th>
            </tr>
          </thead>
          <tbody id="mytable">
            {user?.map((us) => {
              return(
              <tr key = {us.id}>
                <td>{us.username}</td>
                <td>{us.phone}</td>
                <td>{us.date_create}</td>
                <td>
                    <a className="edit" title="Edit" data-toggle="tooltip" onClick={()=>router.push(`/createUser?id=${us.id}`)}><i className="material-symbols-outlined" >&#xE254;</i></a>
                    <a className="delete" title="Delete" data-toggle="tooltip" onClick={()=>setIsDelUser(us.id)}><i className="material-symbols-outlined">&#xE872;</i></a>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} itemPage={itemPage} />
    </div>
  )
}

export default Users;
