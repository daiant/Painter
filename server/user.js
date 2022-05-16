const { pool } = require('./db'); 

module.exports = {
    getUser: async function(username, password) {
        const text = `SELECT * from users WHERE username = $1 AND password = $2`;
        const values = [username, password];
        const res = await pool.query(text, values);

        try {
            return res.rows[0];
        } catch(e) {
            return {};
        }
    },
    getFavoritesFromUser: async function(user_id) {
        const text = `SELECT * from clothes WHERE clothes_id = (SELECT clothes_id FROM favorites WHERE user_id = $1)`
        const values = [user_id];

        const res = await pool.query(text, values);
        try {
            return res.rows;
        } catch(e) {
            console.log(e);
            return {};
        }
    }
}