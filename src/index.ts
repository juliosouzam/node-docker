import { randomUUID } from "crypto";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

type Todo = {
  id: string;
  title: string;
  done: boolean;
  deletedAt: Date | null;
};

const todos: Todo[] = [];

async function main() {
  app.get("/todos", async (request, response) => {
    return response.json(todos);
  });
  app.post("/todos", async (request, response) => {
    const { title } = request.body;
    const todo = {
      id: randomUUID(),
      title,
      done: false,
      deletedAt: null,
    };
    todos.push(todo);

    return response.json(todo);
  });
  app.patch("/todos/:todoId", async (request, response) => {
    const { todoId } = request.params;
    const todo = todos.find((td) => td.id === todoId);
    if (!todo) {
      return response.status(404).json({ message: "not found" });
    }
    todo.done = true;

    return response.status(200).send();
  });
  app.delete("/todos/:todoId", async (request, response) => {
    const { todoId } = request.params;
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      return response.status(404).json({ message: "not found" });
    }
    todos.splice(todoIndex, 1);

    return response.status(204).send();
  });

  try {
    app.listen({ port: 3000 }, () => console.log('running at port: ', 3000));
  } catch (err) {
    process.exit(1);
  }
}

main().catch(console.error);
