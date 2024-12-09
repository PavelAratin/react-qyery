import { useQuery } from "@tanstack/react-query";
import { getCar } from "./api/cars";
import { getDealer } from "./api/dealers";

export default function Car({ id }) {
  const carQuery = useQuery({
    queryKey: ["cars", id],
    queryFn: () => {
      console.log("car id ==", id);
      return getCar(id);
    },
  });

  const dealerQuery = useQuery({
    queryKey: ["dealers", carQuery?.data?.dealerId],
    enabled: !!carQuery.data?.dealerId,
    queryFn: () => {
      console.log("car id ==", id);
      return getDealer(id);
    },
  });

  if (carQuery.status === "loading") return <h1>Loading...</h1>;
  if (carQuery.status === "error") {
    return <h1>{carQuery.error.message}</h1>;
  }

  console.log(" dealerQuery > ", dealerQuery.data);

  return (
    <div>
      <div className="autoCard">
        <h1>
          {carQuery.data?.model}
          {carQuery.data?.year}
        </h1>
        <h2> {carQuery.data?.brand}</h2>
        <div className="autoCardDealer">
          <div>
            <strong>Дилер</strong>: {dealerQuery.data?.name}
          </div>
          <div>
            <strong>Город</strong>: {dealerQuery.data?.city}
          </div>
          <div>
            <strong>Телефон</strong>: {dealerQuery.data?.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
