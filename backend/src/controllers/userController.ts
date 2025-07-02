import { Request, Response } from "express";
import connectDB from "../database/db";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: "Nome e email são obrigatórios" });
    return;
  }

  try {
    const connection = await connectDB();
    const id = uuidv4();

    await connection.execute(
      "INSERT INTO users (id, name, email) VALUES (?, ?, ?)",
      [id, name, email]
    );

    res.status(201).json({ id, name, email });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Email já cadastrado." });
    } else {
      res.status(500).json({ message: "Erro interno.", error: error.message });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { name, email, page = "1", limit = "10" } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (
    isNaN(pageNumber) ||
    pageNumber < 1 ||
    isNaN(limitNumber) ||
    limitNumber < 1
  ) {
    res.status(400).json({
      message: "Parâmetros page e limit devem ser números maiores que zero.",
    });
    return;
  }

  try {
    const connection = await connectDB();

    let query = "SELECT id, name, email FROM users WHERE 1=1";
    const params: any[] = [];

    if (name) {
      query += " AND name LIKE ?";
      params.push(`${name}%`);
    }

    if (email) {
      query += " AND email LIKE ?";
      params.push(`${email}%`);
    }

    const offset = (pageNumber - 1) * limitNumber;
    query += " LIMIT ? OFFSET ?";
    params.push(limitNumber, offset);

    const [rows] = await connection.execute(query, params);

    let countQuery = "SELECT COUNT(1) as total FROM users WHERE 1=1";
    const countParams: any[] = [];

    if (name) {
      countQuery += " AND name LIKE ?";
      countParams.push(`${name}%`);
    }

    if (email) {
      countQuery += " AND email LIKE ?";
      countParams.push(`${email}%`);
    }

    const [countResult]: any = await connection.execute(
      countQuery,
      countParams
    );
    const total = countResult[0].total;

    res.json({
      data: rows,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ message: "Erro ao buscar usuários." });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    const user = Array.isArray(rows) ? rows[0] : null;

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Nome são obrigatórios." });
    return;
  }

  try {
    const connection = await connectDB();

    const [result]: any = await connection.execute(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    res.json({ id, name });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar usuário.", error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();

    const [result]: any = await connection.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    res.json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário." });
  }
};
