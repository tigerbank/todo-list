import type { NextPage } from 'next';
import Head from 'next/head';
import TodoList from '@/components/TodoList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Todo Lists</title>
        <meta name="description" content="Todo lists app using Nextjs"></meta>
      </Head>
      <TodoList />
    </>
  );
};

export default Home;
