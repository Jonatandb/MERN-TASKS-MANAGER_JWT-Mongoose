import Task from '../models/task.model.js'

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user')
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error getting task: ' + error.message })
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate('user')

    res.json(tasks)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error getting tasks: ' + error.message })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    })
    const savedTask = await newTask.save()

    // Cargar los datos del usuario en el campo 'user' de la tarea
    await savedTask.populate('user')

    res.json(savedTask)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating task: ' + error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    return res.sendStatus(204)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting task: ' + error.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('user')
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error updating task: ' + error.message })
  }
}
