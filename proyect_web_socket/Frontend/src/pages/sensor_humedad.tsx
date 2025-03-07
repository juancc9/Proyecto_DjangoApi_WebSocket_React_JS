import { useForm } from "react-hook-form";
import { Button, Select, Input } from "@heroui/react";
import { useFetchConfigurations } from "@/hooks/useFetchConfigurations";
import DefaultLayout from "@/layouts/default";

const SensorConfigForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { data: configurations, isLoading } = useFetchConfigurations();

  const options = configurations?.map((config) => ({
    value: config.tipo_sensor,
    label: config.tipo_sensor,
  })) || [];

  const onSubmit = (formData) => {
    console.log("Datos enviados:", formData);
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Configurar Sensor</h2>
        <Select
          label="Tipo de Sensor"
          options={options}
          disabled={isLoading}
          onChange={(value) => setValue("tipo_sensor", value)}
        />
        <Input label="Valor Mínimo" type="number" {...register("valor_min")} />
        <Input label="Valor Máximo" type="number" {...register("valor_max")} />
        <Button type="submit">Guardar</Button>
      </form>
    </DefaultLayout>
  );
};

export default SensorConfigForm;
