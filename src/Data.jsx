import { useState } from "react";
import TodoCard from "./components/TodoCard";
import { useInfiniteQuery } from "@tanstack/react-query";


const Data = () => {
  // const [todos, setTodos] = useState([]);

  const fetchTodos = async (pageParam) => {
   
    
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`);
  return res.json()
    
  }
  const {data,status,error,fetchNextPage} = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage;
      
    }
  })
console.log(data);

  const content = data?.pages.map((todos) => todos.map((todo) => {
    return <TodoCard todo={todo} key={todo.id}></TodoCard>
  }))

  if (status === 'pending') {
  return <div>Loading...</div>
  }
  if(status === 'error') {
    return <div>Error fetching data: { error.message}</div>
  }

  return (
    <div>
      <h1>Hello, React!</h1>
      <p>This is a simple React component.</p>
   
     <div>{ content} <button onClick={()=>fetchNextPage()}>load more</button></div>
    </div>
  );
};

export default Data;