import Head from "next/head";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import { useEffect, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { table, minifyRecords } from "./api/utils/Airtable";
export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContext);
  useEffect(() => {
    // We grabbed initialTodos and keep 'em in memory so there no need use refreshTodos()
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Authenticated TODO App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>Todo App</h1>
        <ul>
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();
    return { props: { initialTodos: minifyRecords(todos) } };
  } catch (err) {
    return { props: { err: "Something went wrong" } };
  }
}
