import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from 'node:fs/promises'


const app = new Hono();

let projects: Array<{ id: number; name: string; description: string }> = [];
try {
  const data = fs.readFileSync('src/projects.json', 'utf8');
  projects = JSON.parse(data);
} catch (error) {
  console.error('Kunne ikke lese projects.json:', error);
}

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

const habits = [
  {
    id: crypto.randomUUID(),
    title: "Game",
    createdAt: new Date("2024-01-01"),
  },
];

app.get('/projects', (c) => {
  return c.json(projects);
});

app.post('/projects', async (c) => {
  const body = await c.req.json();
  const newProject = {
    id: projects.length + 1,
    name: body.name,
    description: body.description,
  };
  projects.push(newProject);
  return c.json(newProject);
});


// Definerer porten serveren skal lytte på
const port = 3999;

console.log(`Server is running on port ${port}`);

// Starter serveren
serve({
  fetch: app.fetch,
  port,
});