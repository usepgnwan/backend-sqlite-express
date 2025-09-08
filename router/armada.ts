import responses from "../helper/response";
import ArmadaModel from "../models/armada";

 
class Armada {
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
         * /armada:
         *   get:
         *     tags:
         *       - Armada 
         *     summary: Get data armada
         *     description: list data armada
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
            const users = await ArmadaModel.findAll({
              raw: true
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
         * /armada/{id}:
         *   get:
         *     summary: Get a user by ID
         *     tags: [Armada]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: Numeric ID of the user to get
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
         *         description: Failed to fetch user
         */
        this.router.get('/:id', async (req:any, res:any) => {
          try {
            let row = await responses(false, "failed get data",null)
            const user = await ArmadaModel.findByPk(req.params.id,{raw: true});raw: true
            if (!user) return res.status(404).json(row);
            row = await responses(true, "success get data",user)
            res.json(row);
          } catch (err) {
            let row = await responses(true, "success get data",null)
            res.status(500).json(row);
          }
        });

        /**
         * @swagger
         * /armada/{id}:
         *   put:
         *     summary: Update a user by ID
         *     tags: [Armada]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: Numeric ID of the user to update
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
         *         description: Failed to update user
         */
        this.router.put('/:id', async (req:any, res:any) => {
          let row = await responses(false, "failed update data",null)
          try {
            row.message = "user not found"
            const user = await ArmadaModel.findByPk(req.params.id);
            if (!user) return res.status(404).json(row);
            const {  title } = req.body;
            await user.update({ title  });
            row.status =true;
            row.message = "success update data"
            row.data = user
            res.json(row);
          } catch (err) {
            res.status(500).json(row);
          }
        });

       
        /**
         * @swagger
         * /armada/{id}:
         *   delete:
         *     summary: Delete a Armada by ID
         *     tags: [Armada]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: Numeric ID of the user to delete
         *     responses:
         *       200:
         *         description: Armada deleted successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: Armada deleted
         *       404:
         *         description: Armada not found
         *       500:
         *         description: Failed to delete user
         */
        this.router.delete('/:id', async (req:any, res:any) => {
          let row = await responses(false, "failed delete data",null)
          try {
            const user = await ArmadaModel.findByPk(req.params.id); 
            if (!user) return res.status(404).json(row);
            await user.destroy();

            row.message = "success delete";
            row.status = false;
            res.json(row);
          } catch (err) {
            res.status(500).json({ error: 'Failed to delete user' });
          }
        });

         
        /**
         * @swagger
         * /armada/:
         *   post:
         *     summary: Update a armada by ID
         *     tags: [Armada]
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
         *         description: Armada updated successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Data'
         *       404:
         *         description: Armada not found
         *       500:
         *         description: Failed to update user
         */
        this.router.post('/', async (req: any, res: any) => {
          let row = await responses(false, "failed create data",null)
          try {
            const newUser = await ArmadaModel.create(req.body);
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

export {Armada};
