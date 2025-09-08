import responses from "../helper/response";
import DataModel from "../models/wilayah";
import {  Points } from '../models';

 
class Wilayah {
  public router : any ;
  public secret :string;
  constructor(express :any, secret:any) {
    this.router = express.Router();
    this.secret = secret;
    this.registerRoutes();
  }

  registerRoutes() {
        /**
       * @swagger
       * components:
       *   schemas:
       *     Data:
       *       type: object
       *       properties:
       *         id:
       *           type: integer 
       *         title:
       *           type: string 
       *         created_at:
       *           type: string
       *           format: date-time
       *         updated_at:
       *           type: string
       *           format: date-time
       */


        /**
         * @swagger
         * /wilayah:
         *   get:
         *     tags:
         *       - Wilayah 
         *     summary: Get data wilayah
         *     description: list data wilayah
         *     parameters:
         *       - in: header
         *         name: Accept
         *         required: true
         *         schema:
         *           type: string
         *           example: application/json
         *         description: Must be 'application/json'
         *       - in: header
         *         name: profile-header
         *         required: true
         *         schema:
         *           type: string
         *           example: IMUSEPWEBDEVB4NDUN59007
         *         description: Authentication token in profile-header
         *     responses:
         *       200:
         *         description: Success
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: Now you are connected to here!!
         *       406:
         *         description: Not Acceptable (client must accept JSON)
         *       401:
         *         description: Unauthorized (invalid or missing profile-header)
         */
        this.router.get('/', async (req :any, res:any) => {
          const acceptHeader = req.headers['accept'] || '';
          const profileHeader = req.headers['profile-header'];

          // Cek apakah client menerima JSON
          if (!acceptHeader.includes('application/json')) {
            return res
              .status(406)
              .json({ error: 'Client must accept application/json' });
          }

          // Cek apakah profile-header sesuai
        
          if (profileHeader !== this.secret) {
            return res
              .status(401)
              .json({ error: 'Unauthorized. Invalid or missing profile-header.' });
          } 

          try {
            const users = await DataModel.findAll({
                                          include: [
                                            {
                                              model: Points,
                                              as: 'points',
                                              attributes: ['id', 'title','alamat']
                                            }
                                          ]
                                        });

            let row = await responses(true, "success get data",users)
            res.json(row);
          } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Failed to fetch users' });
          } 

        });
  
        /**
         * @swagger
         * /wilayah/{id}:
         *   get:
         *     summary: Get a data by ID
         *     tags: [Wilayah]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: Numeric ID of the data to get
         *     responses:
         *       200:
         *         description: Data found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Data'
         *       404:
         *         description: Data not found
         *       500:
         *         description: Failed to fetch data
         */
        this.router.get('/:id', async (req:any, res:any) => {
          try {
            let row = await responses(false, "failed get data",null)
            const data = await DataModel.findByPk(req.params.id,{raw: true});raw: true
            if (!data) return res.status(404).json(row);
            row = await responses(true, "success get data",data)
            res.json(row);
          } catch (err) {
            let row = await responses(true, "success get data",null)
            res.status(500).json(row);
          }
        });

        /**
         * @swagger
         * /wilayah/{id}:
         *   put:
         *     summary: Update a data by ID
         *     tags: [Wilayah]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: Numeric ID of the data to update
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               title:
         *                 type: string
         *     responses:
         *       200:
         *         description: Data updated successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Data'
         *       404:
         *         description: Data not found
         *       500:
         *         description: Failed to update data
         */
        this.router.put('/:id', async (req:any, res:any) => {
          let row = await responses(false, "failed update data",null)
          try {
            row.message = "data not found"
            const data = await DataModel.findByPk(req.params.id);
            if (!data) return res.status(404).json(row);
            const {  title } = req.body;
            await data.update({ title  });
            row.status =true;
            row.message = "success update data"
            row.data = data
            res.json(row);
          } catch (err) {
            res.status(500).json(row);
          }
        });

       
        /**
         * @swagger
         * /wilayah/{id}:
         *   delete:
         *     summary: Delete a Wilayah by ID
         *     tags: [Wilayah]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: Numeric ID of the data to delete
         *     responses:
         *       200:
         *         description: Wilayah deleted successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: Wilayah deleted
         *       404:
         *         description: Wilayah not found
         *       500:
         *         description: Failed to delete data
         */
        this.router.delete('/:id', async (req:any, res:any) => {
          let row = await responses(false, "failed delete data",null)
          try {
            const data = await DataModel.findByPk(req.params.id); 
            if (!data) return res.status(404).json(row);
            await data.destroy();

            row.message = "success delete";
            row.status = false;
            res.json(row);
          } catch (err) {
            res.status(500).json({ error: 'Failed to delete data' });
          }
        });

         
        /**
         * @swagger
         * /wilayah/:
         *   post:
         *     summary: Update a wilayah by ID
         *     tags: [Wilayah]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties: 
         *               title:
         *                 type: string 
         *     responses:
         *       200:
         *         description: Wilayah updated successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Data'
         *       404:
         *         description: Wilayah not found
         *       500:
         *         description: Failed to update data
         */
        this.router.post('/', async (req: any, res: any) => {
          let row = await responses(false, "failed create data",null)
          try {
            const newUser = await DataModel.create(req.body);
            row.status = true
            row.message = "success create"
            row.data = newUser
            res.status(201).json(row);
          } catch (error) {
            res.status(400).json(row);
          }
        });

  
  }

 
  getRouter() {
    return this.router;
  }
}

export {Wilayah};
