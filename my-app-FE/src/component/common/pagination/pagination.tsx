function Pagination({page, setPage , itemPage}:any){
    return (
        <div className="pagination" >
        {itemPage.length > 0 && 
          (
            <>
              <a  onClick={() => page > 1 ? setPage(page-1): setPage(page)}>&laquo;</a>
              {
                itemPage?.map((itemPage: any,index : any)=>{
                    if(page == itemPage){
                      return (
                        <a key= {index} className = "active" onClick={() => {setPage(itemPage)}}>{itemPage}</a>
                      )
                    }else{
                      return (
                        <a key= {index} onClick={() => {setPage(itemPage)}}>{itemPage}</a>
                      )
                    }
                })
              }
              <a  onClick={() => page < itemPage.length ? setPage(page+1) : setPage(page)}>&raquo;</a>
            </>
          )
        }
        
      </div>
    )
}
export default Pagination;