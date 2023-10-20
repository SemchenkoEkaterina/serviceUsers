const sequelize = require('../db');
const ApiError = require('../error/apiError');
const request = require('request');

class UserController {
	async create(req, res, next) {
		try {
			const { name, email, password } = req.body;
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

			request.post(
				{
					url: 'http://localhost:6000/api/histories',
					form: {
						id: newUser[0][0].id,
						inf: 'Create user',
					},
				}
			);
			return res.json(newUser);
		} catch (error) {
			next(ApiError.internalServerError(error.message))
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
			next(ApiError.internalServerError(error.message));
		}
	}

	async updateUsers(req, res, next) {
		try {
			const { id, name } = req.body;
			const sql = `UPDATE users SET name='${name}' WHERE id=${id}`;
			const user = await sequelize.query(sql, {
				type: sequelize.QueryTypes.UPDATE
			});
			request.post(
				{
					url: 'http://localhost:6000/api/histories',
					form: {
						id: id,
						inf: 'Update user',
					},
				}
			);
			return res.json(user);
		} catch (error) {
			next(ApiError.internalServerError(error.message));
		}

	}
}

module.exports = new UserController();