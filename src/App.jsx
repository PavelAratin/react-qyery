import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CARS = [
  { id: 1, brand: "Audi" },
  { id: 2, brand: "Toyota" },
];

function App() {
  const queryClient = useQueryClient();
  const getCarsQuery = useQuery({
    queryKey: ["cars"],
    queryFn: (obj) =>
      wait(1000).then(() => {
        console.log("obj", obj);

        return [...CARS];
      }),
    // queryFn:()=> Promise.reject('error')
  });

  const newCarMutation = useMutation({
    mutationFn: (brand) => {
      return wait(1000).then(() => {
        CARS.push({ id: Date.now(), brand });
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
  });

  if (getCarsQuery.isLoading) return <h2>Loading...</h2>;
  if (getCarsQuery.isError) return <h2>{getCarsQuery.error}</h2>;

  console.log("cars ===", CARS);

  return (
    <div>
      {getCarsQuery.data?.map((car) => {
        return <div key={car.id}>{car.brand}</div>;
      })}
      <button
        className="button"
        disabled={newCarMutation.isPending}
        onClick={() => newCarMutation.mutate("Mercedes")}>
        Add car
      </button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
