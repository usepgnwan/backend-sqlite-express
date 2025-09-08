import responses from "../helper/response";
import User from "../models/users";

 
class Profile {
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
       *     User:
       *       type: object
       *       properties:
       *         id:
       *           type: integer
       *         name:
       *           type: string
       *         title:
       *           type: string
       *         phone:
       *           type: string
       *         email:
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
         * /profile:
         *   get:
         *     tags:
         *       - Profile 
         *     summary: Get profile
         *     description: Retrieve user profile if proper headers are sent
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
            const users = await User.findAll({
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
         * /profile/{id}:
         *   get:
         *     summary: Get a user by ID
         *     tags: [Profile]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: Numeric ID of the user to get
         *     responses:
         *       200:
         *         description: User found
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/User'
         *       404:
         *         description: User not found
         *       500:
         *         description: Failed to fetch user
         */
        this.router.get('/:id', async (req:any, res:any) => {
          try {
            let row = await responses(false, "failed get data",null)
            const user = await User.findByPk(req.params.id,{raw: true});raw: true
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
         * /profile/{id}:
         *   put:
         *     summary: Update a user by ID
         *     tags: [Profile]
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
         *               phone:
         *                 type: string 
         *               email:
         *                 type: string 
         *     responses:
         *       200:
         *         description: User updated successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/User'
         *       404:
         *         description: User not found
         *       500:
         *         description: Failed to update user
         */
        this.router.put('/:id', async (req:any, res:any) => {
          let row = await responses(false, "failed update data",null)
          try {
            row.message = "user not found"
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json(row);
            const { name, title, phone,email } = req.body;
            await user.update({ name, title, phone,email });
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
         * /profile/{id}:
         *   delete:
         *     summary: Delete a profile by ID
         *     tags: [Profile]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: Numeric ID of the user to delete
         *     responses:
         *       200:
         *         description: User deleted successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: User deleted
         *       404:
         *         description: User not found
         *       500:
         *         description: Failed to delete user
         */
        this.router.delete('/:id', async (req:any, res:any) => {
          let row = await responses(false, "failed delete data",null)
          try {
            const user = await User.findByPk(req.params.id); 
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
         * /profile/:
         *   post:
         *     summary: Update a user by ID
         *     tags: [Profile]
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
         *               phone:
         *                 type: string 
         *               email:
         *                 type: string 
         *     responses:
         *       200:
         *         description: User updated successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/User'
         *       404:
         *         description: User not found
         *       500:
         *         description: Failed to update user
         */
        this.router.post('/', async (req: any, res: any) => {
          let row = await responses(false, "failed create data",null)
          try {
            const newUser = await User.create(req.body);
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

export {Profile};
