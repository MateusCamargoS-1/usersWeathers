import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/userController";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const userRoutes = Router();

const userValidation = [
  body('name')
    .notEmpty().withMessage('O nome é obrigatório')
    .isLength({ min: 2 }).withMessage('O nome deve ter no mínimo 2 caracteres'),
  body('email')
    .notEmpty().withMessage('O e-mail é obrigatório')
    .isEmail().withMessage('O e-mail deve ser válido'),
];

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
userRoutes.post('/', userValidation, validateRequest, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
userRoutes.put('/:id', validateRequest, updateUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
userRoutes.get('/', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.get('/:id', getUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 */

userRoutes.delete('/:id', deleteUser);    

export default userRoutes;
