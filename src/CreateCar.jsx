// import { useMutation } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { createCar } from "./api/cars";

export default function CreateCar() {
  const brandRef = useRef();
  const modelRef = useRef();
  const yearRef = useRef();

  const createCarMutation = useMutation({
    mutationFn: createCar,
  });

  console.log(" createCar > ");

  function handleSubmit(e) {
    e.preventDefault();
    const newCar = {
      brand: brandRef.current.value,
      model: modelRef.current.value,
      year: yearRef.current.value,
      body: "",
      dealerId: 2,
      id: String(Date.now()),
    };
    createCarMutation.mutate(newCar);
    e.target.reset();
    console.log("new car ==", newCar);
  }

  return (
    <div>
      {createCarMutation.isError && createCarMutation.error.message}
      <h1>Создать автомобиль</h1>
      <form onSubmit={handleSubmit}>
        <div className="formField">
          <label htmlFor="brand">Brand</label>
          <input id="brand" ref={brandRef} />
        </div>
        <div className="formField">
          <label htmlFor="model">Model</label>
          <input id="model" ref={modelRef} />
        </div>
        <div className="formField">
          <label htmlFor="year">Year</label>
          <input id="year" ref={yearRef} />
        </div>
        <button className="button" disabled={createCarMutation.isPending}>
          {createCarMutation.isPending ? "загрузка..." : "Создать"}
        </button>
      </form>
    </div>
  );
}
