import Pokedex from "./components/Pokedex";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <div className="lg:container mx-auto p-4 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:divide-gray-700">
        <Pokedex />
      </div>
    </QueryClientProvider>
  );
}

export default App;
