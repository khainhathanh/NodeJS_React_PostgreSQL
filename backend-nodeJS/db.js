const Pool = require('pg').Pool;
const Pagination = require('./src/model/Pagination');
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5632,
    database: 'nhathanhshop',
  })

const findOneUser = (req, res) =>{
    let rootQuery = 'select id, username, pass, fullname, email, phone, date_create from public.user ';
    let queryCondition = '';
    let Loginflag = false;
    if(req.body.id != null && req.body.id != undefined){
        queryCondition = "where id = '"+ req.body.id +"'";
    }
    if((req.body.user != '' && req.body.user != null && req.body.user != undefined) && 
            (req.body.user != '' && req.body.pass != null && req.body.pass != undefined)){
        queryCondition = "where username = '"+ req.body.user +"' and pass = '"+ req.body.pass +"'";
        Loginflag = true;
    }
    const dataQuery = rootQuery + queryCondition;
    pool.query(dataQuery,(err,rs) => {
        if (err){
            return res.status(500).json(err)
        }
        if(rs.rows.length  < 1){
            return res.status(400).json('Not Found!')
        }
        if(rs.rows.length  > 1){
            return res.status(400).json('Find to many record!')
        }
        if(Loginflag){
            const code = generateRandomNumericString(6);
            deleteAllOTP();
            pool.query('INSERT INTO public."oneTimeOTP" (code,username,id_user) VALUES ($1,$2,$3)',[code,rs.rows[0].username,rs.rows[0].id])
        }
        return res.status(200).json(rs.rows)
    })
}

const getAllUser =  async (req,res) =>{
    
    try {
        let keySearch = req.query.keySearch;
        let limit = req.query.pageSize;
        let offset = (req.query.pageCurrent - 1)* limit ;
        let countQuery = 'SELECT COUNT(*) FROM public.user ';
        let dataQuery = 'SELECT username, id, phone, date_create FROM public.user ';
        let dataLimitQuery = ' LIMIT $1 OFFSET $2'
        let dataSearchQuery = '';
        
        // Lấy số lượng người dùng
        if (keySearch != '' && keySearch != undefined && keySearch != null){
            dataSearchQuery = "WHERE username LIKE '%"+ keySearch +"%' OR phone LIKE '%"+ keySearch +"%'";
        }
        
        const countKeySearchQuery = countQuery + dataSearchQuery
        const countResult = await pool.query(countKeySearchQuery);
        const totalCount = Math.ceil(parseInt(countResult.rows[0].count)/limit);
    
        if (totalCount < 0) {
          return res.status(400).json('Count user error!');
        }

        // Lấy dữ liệu người dùng
        const dataKeySearchQuery = dataQuery + dataSearchQuery + dataLimitQuery
        const dataResult = await pool.query(dataKeySearchQuery, [limit, offset]);
        if(dataResult.rows.length  < 0){
            return res.status(400).json('Find all user is error!')
        }
        
        const pagination = new Pagination(dataResult.rows,totalCount)
        return res.status(200).json(pagination); // Trả về dữ liệu phân trang
      } catch (error) {
        console.error('Error retrieving user data:', error);
        return res.status(500).json(error.message);
      }

    
}

const deleteAllOTP = () =>{
    pool.query('DELETE FROM public."oneTimeOTP"' )
}

const authOTP = (req, res) =>{
    pool.query('select username, id_user from public."oneTimeOTP" where username = $1 and code = $2',[req.body.user,req.body.code], (err,rs) => {
        if (err){
            return res.status(500).json(err)
        }
        if(rs.rows.length  < 1){
            return res.status(400).json('Not Found!')
        }
        if(rs.rows.length  > 1){
            return res.status(400).json('Find to many record!')
        }
        pool.query('DELETE FROM public."oneTimeOTP" where username = $1 and code = $2',[req.body.user,req.body.code])
        return res.status(200).json(rs.rows)
    })
}

const createUser = (req, res) =>{
    pool.query('INSERT INTO public."user"(username, pass, fullname, email, phone, date_create) VALUES ($1, $2, $3, $4, $5, $6)',
        [
            req.body.user.userName,
            req.body.user.password,
            req.body.user.fullName,
            req.body.user.email,
            req.body.user.phone,
            new Date(Date.now())

        ],
        (err,rs) => {
            if (err){
                return res.status(500).json(err)
            }
            return res.status(200).json(rs.rowCount)
        }
    )
}

const updateUser = (req, res) =>{
    pool.query('UPDATE public."user" SET username=$1, pass=$2, fullname=$3, email=$4, phone=$5, date_create=$6 WHERE id=$7',
        [
            req.body.user.userName,
            req.body.user.password,
            req.body.user.fullName,
            req.body.user.email,
            req.body.user.phone,
            new Date(Date.now()),
            req.body.user.id
        ],
        (err,rs) => {
            if (err){
                return res.status(500).json(err)
            }
            return res.status(200).json(rs.rowCount)
        }
    )
}

const deleteUser = (req, res) =>{
    pool.query('DELETE FROM public."user" WHERE id = $1',
        [
            req.params.id
        ],
        (err,rs) => {
            if (err){
                return res.status(500).json(err)
            }
            return res.status(200).json(rs.rowCount)
        }
    )
}


const generateRandomNumericString = (length) => {
    return Array.from({ length }, generateRandomDigit).join('');
};

const generateRandomDigit = () => generateRandomInteger(0, 9);
const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;
module.exports = {
    findOneUser, 
    authOTP,
    getAllUser,
    createUser,
    updateUser,
    deleteUser
}