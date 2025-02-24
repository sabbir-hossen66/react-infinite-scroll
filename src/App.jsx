import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const getUsers = async ({ pageParam = 0 }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_start=${pageParam}`)
  const data = await res.json();
 return { posts: data, prevOffset: pageParam };

}

function App() {
  const { data,fetchNextPage,hasNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    getNextPageParam: lastPage => {
      if (lastPage.prevOffset + 10 >=100) {
        return false;
      }
      return lastPage.prevOffset + 10;
    }
  });
  // console.log('data',data.pages[])
const articles = data?.pages?.reduce((acc, page) => [...acc, ...page.posts], []) || [];
  console.log('articles', articles)
  
  return (
    <div>
      <h2>hello react bhai</h2>
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<div>Loading....</div>}

      >

        <div>
           {
          articles && articles.map((article, index) => (
            <div key={index} className="element">
              {
            article.title
              }
            </div>
          ))
        }
       </div>
      </InfiniteScroll>

   </div>
  )
}

export default App
