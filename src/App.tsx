import { useEffect, useState } from 'react'
import CourseCard from './components/CourseCard'
import './App.css'
type Task = {
  id: number
  title: string
  course: string
}

const courses = ['React', 'JavaScript', 'SQL', 'English']
function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
  const savedTasks = localStorage.getItem('tasks')

  return savedTasks
    ? JSON.parse(savedTasks)
    : [
        {
          id: 0,
          title: 'React Components çalış',
           course: 'React',
        },
        {
          id: 1,
          title: 'JavaScript tekrar yap',
          course: 'JavaScript',
        },
        {
          id: 2,
          title: '20 İngilizce kelime öğren',
          course: 'English',
        },

        {
          id: 3,
          title: 'SQL tekrar yap',
          course: 'SQL',
},
      ]
})

const [completedTasks, setCompletedTasks] = useState<number[]>(() => {
  const savedTasks = localStorage.getItem('completedTasks') //"LocalStorage'da completedTasks diye 
  // kaydettiğim veri var mı?" diye soruyor. Eğer varsa onu alıyor ve JSON.parse() ile diziyi 
  // çeviriyor. Eğer yoksa boş bir dizi döndürüyor.
return savedTasks ? JSON.parse(savedTasks) : []
})
const [newTask, setNewTask] = useState('')
const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
const [editingTitle, setEditingTitle] = useState('')
const [editingCourse, setEditingCourse] = useState('React')
const [selectedCourse, setSelectedCourse] = useState('React')
const [filterCourse, setFilterCourse] = useState('All')
useEffect(() => {
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks)) //localStorage.setItem() 
  // metodu, tarayıcıda veri depolamak kaydetmek için kullanılır. 
  // Bu metot, iki parametre alır: bir anahtar(key) ve bir değer(value). belirtilen anahtar ile 
  // ilişkili olarak belirtilen değeri tarayıcıda depolar 
}, [completedTasks]) // bu ise "completedTasks değiştiğinde bu işlemi tekrar yap." diyor. 
// Yani completedTasks değiştiğinde useEffect içindeki kod çalışacak ve LocalStorage güncellenecek.
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])


const totalTasks = tasks.length

const completedCount = completedTasks.filter((id) =>
  tasks.some((task: { id: number }) => task.id === id)
).length

const getCourseProgress = (courseName: string) => {
  const courseTasks = tasks.filter(
    (task) => task.course === courseName
  )

  const completedCourseTasks = courseTasks.filter((task) =>
    completedTasks.includes(task.id)
  )

  if (courseTasks.length === 0) {
    return 0
  }

  return Math.round(
    (completedCourseTasks.length / courseTasks.length) * 100
  )
}  

const getCourseTaskStats = (courseName: string) => {
  const courseTasks = tasks.filter(
    (task) => task.course === courseName
  )

  const completedCourseTasks = courseTasks.filter((task) =>
    completedTasks.includes(task.id)
  )

  return {
    completed: completedCourseTasks.length,
    total: courseTasks.length,
  }
}
const filteredTasks = tasks.filter(
  (task) =>
    filterCourse === 'All' ||
    task.course === filterCourse
)
  return (
<div className="app">
    <div className="header">
  <h1>StudyMate</h1>
  <p>Öğrenme sürecini tek yerden takip et.</p>
  <div className="stats">
  <div className="stat-card">
    <strong>{totalTasks}</strong>
    <span>Toplam Görev</span>
  </div>

  <div className="stat-card">
    <strong>{completedCount}</strong>
    <span>Tamamlanan</span>
  </div>

  <div className="stat-card">
    <strong>
      {totalTasks === 0
        ? 0
        : Math.round((completedCount / totalTasks) * 100)}
      %
    </strong>
    <span>Genel İlerleme</span>
  </div>
</div>
</div>

      <h2>Derslerim</h2>
<div className="courses">
  <CourseCard
  name="React"
  progress={getCourseProgress('React')}
  completedTasks={getCourseTaskStats('React').completed}
totalTasks={getCourseTaskStats('React').total}
/>

  <CourseCard
  name="JavaScript"
  progress={getCourseProgress('JavaScript')}
  completedTasks={getCourseTaskStats('JavaScript').completed}
totalTasks={getCourseTaskStats('JavaScript').total}
/>
  <CourseCard
  name="SQL"
  progress={getCourseProgress('SQL')}
  completedTasks={getCourseTaskStats('SQL').completed}
totalTasks={getCourseTaskStats('SQL').total}
/>
  <CourseCard
  name="English"
  progress={getCourseProgress('English')}
  completedTasks={getCourseTaskStats('English').completed}
totalTasks={getCourseTaskStats('English').total}
/>
</div>

      <h2>Bugünkü İlerleme</h2>

<div className="daily-progress">
  <div className="progress-info">
    <span>{completedCount} / {totalTasks} görev tamamlandı</span>
    <span>
  {totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100)}%
</span>
  </div>

  <div className="progress-track">
    <div
      className="progress-fill"
      style={{
        width: `${totalTasks === 0 ? 0 : (completedCount / totalTasks) * 100}%`,
      }}
    ></div>
  </div>
</div>
      <h2>Bugünkü Görevler</h2>
      <div className="task-filter">
  <label>Görevleri filtrele</label>

  <select
    value={filterCourse}
    onChange={(e) => setFilterCourse(e.target.value)}
  >
  
  <option value="All">Tüm Dersler</option>
  {courses.map((course) => (
  <option key={course} value={course}>
    {course}
  </option>
))}
</select> </div>
      <div className="task-form">
  <input
    type="text"
    placeholder="Yeni görev yaz..."
    value={newTask}
    onChange={(e) => setNewTask(e.target.value)}
  />
  
  <select
  value={selectedCourse}
  onChange={(e) => setSelectedCourse(e.target.value)}
>
  {courses.map((course) => (
  <option key={course} value={course}>
    {course}
  </option>
))}
</select>

  <button
  onClick={() => {
    if (!newTask.trim()) return

    const newTaskItem = {
  id: Date.now(),
  title: newTask,
  course: selectedCourse,
}

    setTasks([...tasks, newTaskItem])
    setNewTask('')
    setSelectedCourse('React')
  }}
>
  Görev Ekle
</button>
</div>

   <ul className="tasks">
  {filteredTasks.length === 0 && (
  <li className="empty-task">
    {filterCourse === 'All'
      ? '🎯 Henüz görev eklenmemiş. İlk görevini oluştur!'
      : '🔎 Bu derse ait görev bulunamadı.'}
  </li>
)}

  {filteredTasks.map((task) => (//map() metodu “Listedeki her eleman için aynı işlemi yap.” der.
  <li
  key={task.id}
  className={completedTasks.includes(task.id) ? 'completed' : ''}
>
  
    <button
  onClick={() =>
    setCompletedTasks(
      completedTasks.includes(task.id)
        ? completedTasks.filter((id) => id !== task.id)
        : [...completedTasks, task.id]
    )
  }
>
  {completedTasks.includes(task.id)
    ? `✓ ${task.title}`
    : task.title}

  <span className="task-course">
    {task.course}
  </span>
</button>

<div className="task-actions">
    <button
  className="delete-button"
  onClick={() => {
    setTasks(tasks.filter((item) => item.id !== task.id))
    setCompletedTasks(
      completedTasks.filter((id) => id !== task.id)
    )
  }}
>
  Sil
</button>

{editingTaskId === task.id ? (
  <>
    <input
      type="text"
      className="edit-task-input"
      value={editingTitle}
      onChange={(e) => setEditingTitle(e.target.value)}
    />

    <select
      value={editingCourse}
      onChange={(e) => setEditingCourse(e.target.value)}
    >
      {courses.map((course) => (
        <option key={course} value={course}>
          {course}
        </option>
      ))}
    </select>

    <button
      onClick={() => {
        setTasks(
          tasks.map((item) =>
            item.id === task.id
              ? {
                  ...item,
                  title: editingTitle,
                  course: editingCourse,
                }
              : item
          )
        )

        setEditingTaskId(null)
      }}
    >
      Kaydet
    </button>
  </>
) : (
  <button
    onClick={() => {
      setEditingTaskId(task.id)
      setEditingTitle(task.title)
      setEditingCourse(task.course)
    }}
  >
    Düzenle
  </button>
)}   </div>
  </li>
))}
</ul>
    </div>
  )
}

export default App