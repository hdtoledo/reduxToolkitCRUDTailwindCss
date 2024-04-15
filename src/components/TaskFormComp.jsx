import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/task/taskSlice";
import { v4 as uuid } from "uuid";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const TaskFormComp = () => {
  const initialTaskState = {
    title: "",
    description: "",
  };

  const [task, setTask] = useState(initialTaskState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));

    if (value.trim() !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {};

    if (task.title.trim() === "") {
      newErrors.title = "El título es obligatorio";
      hasErrors = true;
    }
    if (task.description.trim() === "") {
      newErrors.description = "La descripción es obligatoria";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    if (params.id) {
      dispatch(
        updateTask({
          id: params.id,
          ...task,
        })
      );
    } else {
      dispatch(
        addTask({
          id: uuid(),
          ...task,
        })
      );
    }

    setTask(initialTaskState);
    setErrors({});
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id))
      
      
    }
  }, [ params.id, tasks]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="flex justify-start items-center mb-4">
        <IoIosArrowBack
          title="Volver a la lista de tareas"
          size={20}
          className="text-white cursor-pointer hover:text-gray-300 mr-2"
          onClick={handleGoBack}
        />
        <h2 className="font-semibold w-full text-center p-2 mb-4 text-white mt-1">Agregar Tareas</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Título"
            className={`w-full p-2 rounded-lg text-black ${
              errors.title ? "border-red-500" : ""
            }`}
            value={task.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div className="mb-2">
          <textarea
            name="description"
            id="description"
            placeholder="Descripción"
            className={`w-full p-2 rounded-lg text-black ${
              errors.description ? "border-red-500" : ""
            }`}
            value={task.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold rounded-xl"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default TaskFormComp;
