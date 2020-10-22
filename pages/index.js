import Head from "next/head";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import { useEffect, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { table, minifyRecords } from "./api/utils/Airtable";
import auth0 from "./api/utils/auth0";
import TodoForm from "../components/TodoForm";

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);
  useEffect(() => {
    // We grabbed initialTodos and keep 'em in memory so there no need use refreshTodos()
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Authenticated TODO App</title>
      </Head>
      <Navbar user={user} />
      <main>
        {user ? (
          <>
            <h1>{`${
              user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1)
            } Todos`}</h1>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => <Todo todo={todo} key={todo.id} />)}
            </ul>
          </>
        ) : (
          <p className="text-center mt-4">Please login to save todos!</p>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  let todos = [];
  try {
    if (session?.user) {
      todos = await table
        .select({ filterByFormula: `userId = '${session.user.sub}'` })
        .firstPage();
    }
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null, // if session?.user becomes false >> return null
      },
    };
  } catch (err) {
    return { props: { err: "Something went wrong" } };
  }
}
