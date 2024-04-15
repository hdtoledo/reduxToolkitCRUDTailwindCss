import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { deleteTask } from "../features/task/taskSlice";
import { useNavigate } from "react-router-dom";

const TaskListComp = () => {
  const taskstate = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCreateTask = () => {
    navigate("/create-task");
  };

  return (
    <div className="mx-auto w-full">
      <h2 className="text-white font-semibold text-center p-2 mb-4">
        Tareas Pendientes por realizar: {taskstate.length}
      </h2>
      
      {/* Botón para crear una nueva tarea */}
      <div className="flex justify-center mb-4">
        <button onClick={handleCreateTask} className="p-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold rounded-xl">
          Crear tarea
        </button>
      </div>

      {/* Mostrar mensaje si no hay tareas */}
      {taskstate.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-gray-500 p-8">
            No hay tareas agregadas por el momento.
          </p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          
          {taskstate.map((task) => (
            <div
              key={task.id}
              className="w-full sm:w-64 p-4 rounded bg-bg-card-hd border-s-0 hover:bg-gray-700"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{task.title}</h3>
                <div className="flex space-x-2">
                  <FiEdit
                    className="text-blue-500 cursor-pointer hover:text-white"
                    title="Editar"
                    onClick={() => navigate(`/edit-task/${task.id}`)}
                  />
                  <IoClose
                    className="text-red-500 cursor-pointer hover:text-white"
                    title="Eliminar"
                    onClick={() => handleDelete(task.id)}
                  />
                </div>
              </div>
              <p className="font-thin mt-2">{task.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskListComp;
