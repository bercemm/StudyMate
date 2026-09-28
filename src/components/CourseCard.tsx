type CourseCardProps = {
  name: string
  progress: number
  completedTasks: number
  totalTasks: number
}

function CourseCard({
  name,
  progress,
  completedTasks,
  totalTasks,
}: CourseCardProps) {
  return (
    <div
  className={`course-card ${
    totalTasks > 0 && completedTasks === totalTasks
      ? 'course-card-completed'
      : ''
  }`}
>
      <h3>{name}</h3>

      <div className="course-progress">
  <div
  className="course-progress-fill"
  style={{ width: `${progress}%` }}
></div>
</div>

      <p>
  İlerleme: %{progress} · {completedTasks} / {totalTasks} görev
</p>
<p>
  {totalTasks > 0 && completedTasks === totalTasks
    ? '🎉 Tamamlandı'
    : '📚 Devam ediyor'}
</p>
    </div>
  )
}

export default CourseCard