const table = 'news';

const newsQuery = {
    insert : ({id_user, title, tags, created_at, text_news, poster, category}) =>{
       return `INSERT INTO ${table} (id_user, title, tags, created_at, text_news, poster, category) VALUES('${id_user}','${title}','${tags}','${created_at}','${text_news}','${poster}','${category}')`;
    },

    getAllNews : (field = '*', limit = 6, offset = 1)=>{
        return `SELECT ${field} FROM categories JOIN ${table} ON categories.id = news.category ORDER BY news.created_at ASC LIMIT '${limit}' OFFSET '${offset}'`
    },
    getByEmail : ( {email}, field = '*') =>{
        return `SELECT ${field} FROM ${table} WHERE email = '${email}'`;
    },
    getById : ({id_news}, field = '*')=>{
       /*  news.id AS news_id, news.poster, news.created_at, news.title, news.id_user, users.name, users.username, users.role, news.text_news */
        return `SELECT ${field}
        FROM news JOIN users ON news.id_user = users.id WHERE news.id = ${id_news}`;
    },
    getByTitleAndId : ({id_user, title}, field)=>{
        return `SELECT ${field} FROM ${table} WHERE id_user = ${id_user} AND title = '${title}'`;
    }
}

module.exports = newsQuery