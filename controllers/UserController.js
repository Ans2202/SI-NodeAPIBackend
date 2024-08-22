import bcrypt  from 'bcrypt';
import pool from '../DB/db.js';


    const registerUser = async (req, res) => {
        try {
            const { user_name, user_password, email } = req.body;
    
           
            if (!user_name || !user_password || !email) {
                return res.status(400).json({ error: 'All fields are required' });
            }
    
            const saltRounds = 8;
            const hashedPassword = await bcrypt.hash(user_password, saltRounds); 
    
            const query = `
                INSERT INTO users (name, password, email)
                VALUES ($1, $2, $3)
                RETURNING *
            `;
            const values = [user_name, hashedPassword, email];
            
            const result = await pool.query(query, values);
    
          
            return res.status(201).json(result.rows[0]);
    
        } catch (error) {
            console.error("Error registering user:", error.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const loginUser=async (req,res)=>{
        try{
            const {user_name, user_password}=req.body
            
            const selectQuery=`select password from users where name ilike '${user_name}'`;
            const result= await pool.query(selectQuery)
            if(result.rows.length===0){
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            const hashedPassword = result.rows[0].password;
            const match = bcrypt.compareSync(user_password, hashedPassword);
    
            if (match) {
                console.log('Login successful')
                return res.status(200).json({ message: 'Login successful' });
            } else {
                console.log('Invalid username or password')
                return res.status(401).json({ error: 'Invalid username or password' });
            }
    
        }
        catch(error){
            console.log("Error Caught: "+error?.message)
            return res.status(500).json({error: `Internal Error ${error.message}`})
        }
    }

    
    export { registerUser,loginUser };