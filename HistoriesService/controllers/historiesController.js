const sequelize = require('../db');
const ApiError = require('../error/apiError');

class HistoriesController {
    async getAll(req, res, next) {
        try {
            const { userId, limit, page } = req.query;
            const pageCol = page || 1;
            const limitCol = limit || 7;
            let offset = pageCol * limitCol - limitCol;
            let sql;
            if (userId === undefined) {
                sql = `
				SELECT histories.inf, histories.date, histories.id, users.name FROM histories 
                JOIN users ON histories."userId" = users.id OFFSET ${offset} LIMIT ${limitCol}
      `;
            } else {
                sql = `
                SELECT histories.inf, histories.date, histories.id, users.name FROM histories 
                JOIN users ON histories."userId" = users.id WHERE "userId"=${userId} OFFSET ${offset} LIMIT ${limitCol}
      `;
            }
            const historiesUsers = await sequelize.query(sql, {
                type: sequelize.QueryTypes.SELECT
            })

            return res.json(historiesUsers);
        } catch (error) {
            next(ApiError.internalServerError(error.message));
        }

    }

    async create(req, res, next) {
        try {
            const { id, inf } = req.body;

            const sql = `
    	INSERT INTO histories (inf, date, "userId")
    	VALUES ('${inf}', '${new Date().toISOString()}', '${id}')
  		`;
            const newHistories = await sequelize.query(sql, {
                type: sequelize.QueryTypes.INSERT
            });
            return res.json(newHistories);
        } catch (error) {
            next(ApiError.internalServerError(error.message))
        }
    }
}

module.exports = new HistoriesController();