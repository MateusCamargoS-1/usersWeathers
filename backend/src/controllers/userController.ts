import { Request, Response } from "express";
import db from "../database/db";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios" });
  }

  try {
    const id = uuidv4();

    await db.execute(
      "INSERT INTO users (id, name, email) VALUES (?, ?, ?)",
      [id, name, email]
    );

    return res.status(201).json({ id, name, email });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email já cadastrado." });
    }
    return res.status(500).json({ message: "Erro interno.", error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { name, email, page = "1", limit = "10" } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
    return res.status(400).json({
      message: "Parâmetros page e limit devem ser números maiores que zero.",
    });
  }

  try {
    const filters: string[] = [];
    const values: any[] = [];

    if (name) {
      filters.push("name LIKE ?");
      values.push(`${name}%`);
    }

    if (email) {
      filters.push("email LIKE ?");
      values.push(`${email}%`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";
    const offset = (pageNumber - 1) * limitNumber;

    values.push(limitNumber.toString(), offset.toString());

    const sql = `
      SELECT SQL_CALC_FOUND_ROWS id, name, email
      FROM users
      ${whereClause}
      LIMIT ? OFFSET ?
    `;

    const [rows]: [any[], any] = await db.execute(sql, values);

    const [countRows]: [any[], any] = await db.query("SELECT FOUND_ROWS() AS total");
    const total = countRows[0].total as number;

    return res.json({
      data: rows,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ message: "Erro ao buscar usuários." });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [rows]: [any[], any] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: "Erro ao buscar usuário." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nome é obrigatório." });
  }

  try {
    const [result]: any = await db.execute("UPDATE users SET name = ? WHERE id = ?", [name, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.json({ id, name });
  } catch (error: any) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ message: "Erro ao atualizar usuário.", error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result]: any = await db.execute("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({ message: "Erro ao deletar usuário." });
  }
};
