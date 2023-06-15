import create from 'zustand';

type Task = {
  id: number;
  title: string;
  // Autres détails de la tâche
};

type TaskStore = {
  tasks: Task[]; 
  searchTasks: (keyword: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
};

const useTaskManager = create<TaskStore>((set) => ({
  /** état initial de la liste de tâches*/
  tasks: [], 
  searchTasks: (keyword) => {
    /** filtrer la tâche de part un mot clé*/
    set((state) => ({
      tasks: state.tasks.filter((task) =>
        task.title.toLowerCase().includes(keyword.toLowerCase())
      ),
    }));
  },
  addTask: (task) => {
    /** ajouter une tâche */
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  updateTask: (taskId, updatedTask) => {
    /** mettre à jour une tache existante en utilisant son ID*/
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    }));
  },
  deleteTask: (taskId) => {
    /** supprimer une tache en utilisant son ID*/
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));



export {
  useTaskManager
}