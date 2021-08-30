const table = 'users';

const userQuery = {
    insert : ({email = null, password = null, phone = null, role = null, avatar = null, username = null, name = null, bio = null, job = null, bg_profile = null}) =>{
       return `INSERT INTO ${table} (email, password, phone, role, avatar, username, name, bio, job, bg_profile) 
       VALUES('${email}','${password}','${phone}','${role}','${avatar}','${username}','${name}','${bio}',
       '${job}','${bg_profile}')`;
    },
    updateUser : (data)=>{ 
        const {email, password, phone, role, avatar, username, name, bio, job, bg_profile, id} = data
        return `UPDATE ${table} SET email = '${email}', password = '${password}', phone = '${phone}', role = '${role}', avatar = '${avatar}', username = '${username}',
        name = '${name}', bio = '${bio}', job = '${job}', bg_profile = '${bg_profile}' WHERE id = '${id}'`;
    },
    updateBackground :(data)=>{
        const {bg_profile, id} = data
        return `UPDATE ${table} SET bg_profile = '${bg_profile}' WHERE id = '${id}'`;
    },
    getAllUser : (field = '*', limit = 5, offset = 1)=>{
        return `SELECT ${field} FROM ${table} LIMIT ${limit} OFFSET ${offset}`
    },
    getByEmail : ( email, field = '*') =>{
        return `SELECT ${field} FROM ${table} WHERE email = '${email}'`;
    },
    getByPhoneOrEmail : ({email, phone}, field = '*')=>{
        return `SELECT ${field} FROM ${table} WHERE email = '${email}' OR phone = '${phone}'`;
    },
    getById : (id, field = '*')=>{
        return `SELECT ${field} FROM ${table} WHERE id = '${id}'`;
    }
}

module.exports = userQuery