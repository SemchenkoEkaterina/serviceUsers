const sequelize = require('../db');
const ApiError = require('../error/apiError');

class UserController {
    async create(req, res, next){
        try {
            const {name, email, password} = req.query;
            if (!password || !email) {
                return next(ApiError.badRequest('Incorrect email or password'));
            }
            const sql = `
    	INSERT INTO users (name, email, password)
    	VALUES ('${name}', '${email}', '${password}')
        RETURNING id, name
  		`;
          const newUser = await sequelize.query(sql, {
				type: sequelize.QueryTypes.INSERT
			});
            const sqlHistories = `
    	INSERT INTO histories (inf, date, "userId")
    	VALUES ('Create user', '${new Date().toISOString()}', '${newUser[0][0].id}')
  		`;
          await sequelize.query(sqlHistories, {
            type: sequelize.QueryTypes.INSERT
        });
			return res.json(newUser);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
		try {
			let sql = `
        SELECT * FROM users`;
			const users = await sequelize.query(sql, {
				type: sequelize.QueryTypes.SELECT
			})
			return res.json(users);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
    }

    async updateUsers(req, res, next) {
		try {
			const {id, name} = req.query;
            const sql = `UPDATE users SET name='${name}' WHERE id=${id}`;
			const user = await sequelize.query(sql, {
				type: sequelize.QueryTypes.UPDATE
			});
            const sqlHistories = `
    	INSERT INTO histories (inf, date, "userId")
    	VALUES ('Update user', '${new Date().toISOString()}', '${id}')
  		`;
          await sequelize.query(sqlHistories, {
            type: sequelize.QueryTypes.INSERT
        });
			return res.json(user);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}

	}
}

module.exports = new UserController();