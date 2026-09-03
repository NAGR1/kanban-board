import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)

function Dashboard({ tasks }) {
  const today = new Date().toISOString().split('T')[0]

  const todoCount = tasks.filter(
    (task) => task.status === 'TO DO',
  ).length

  const doingCount = tasks.filter(
    (task) => task.status === 'DOING',
  ).length

  const doneTasks = tasks.filter(
    (task) => task.status === 'DONE',
  )

  const overdueCount = tasks.filter(
    (task) =>
      task.status !== 'DONE' &&
      task.dueDate &&
      task.dueDate < today,
  ).length

  const categoryNames = [
    ...new Set(
      tasks
        .map((task) => task.category)
        .filter(Boolean),
    ),
  ]

  const categoryCounts = categoryNames.map(
    (category) =>
      tasks.filter((task) => task.category === category).length,
  )

  const earlyCount = doneTasks.filter(
    (task) =>
      task.completeDate &&
      task.dueDate &&
      task.completeDate < task.dueDate,
  ).length

  const onTimeCount = doneTasks.filter(
    (task) =>
      task.completeDate &&
      task.dueDate &&
      task.completeDate === task.dueDate,
  ).length

  const lateCount = doneTasks.filter(
    (task) =>
      task.completeDate &&
      task.dueDate &&
      task.completeDate > task.dueDate,
  ).length

  const statusChartData = {
    labels: ['TO DO', 'DOING', 'DONE'],
    datasets: [
      {
        data: [
          todoCount,
          doingCount,
          doneTasks.length,
        ],
        backgroundColor: [
          '#64748b',
          '#f59e0b',
          '#22c55e',
        ],
        borderWidth: 0,
      },
    ],
  }

  const categoryChartData = {
    labels: categoryNames.length
      ? categoryNames
      : ['No categories'],
    datasets: [
      {
        label: 'Number of tasks',
        data: categoryNames.length
          ? categoryCounts
          : [0],
        backgroundColor: '#4f46e5',
        borderRadius: 6,
        maxBarThickness: 90,
      },
    ],
  }

  const performanceChartData = {
    labels: ['Early', 'On Time', 'Late'],
    datasets: [
      {
        label: 'Completed tasks',
        data: [
          earlyCount,
          onTimeCount,
          lateCount,
        ],
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#ef4444',
        ],
        borderRadius: 6,
        maxBarThickness: 90,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top',
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '58%',

    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>

          <p>
            Summary and performance of all Kanban tasks.
          </p>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card total-card">
          <p>Total Tasks</p>
          <strong>{tasks.length}</strong>
        </div>

        <div className="summary-card todo-card">
          <p>TO DO</p>
          <strong>{todoCount}</strong>
        </div>

        <div className="summary-card doing-card">
          <p>DOING</p>
          <strong>{doingCount}</strong>
        </div>

        <div className="summary-card done-card">
          <p>DONE</p>
          <strong>{doneTasks.length}</strong>
        </div>

        <div className="summary-card overdue-card">
          <p>Overdue</p>
          <strong>{overdueCount}</strong>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card status-chart">
          <h2>Tasks by Status</h2>

          <div className="chart-container">
            <Doughnut
              data={statusChartData}
              options={doughnutOptions}
            />
          </div>
        </div>

        <div className="chart-card">
          <h2>Tasks by Category</h2>

          <div className="chart-container">
            <Bar
              data={categoryChartData}
              options={barOptions}
            />
          </div>
        </div>

        <div className="chart-card full-chart">
          <h2>Completion Performance</h2>

          <div className="chart-container">
            <Bar
              data={performanceChartData}
              options={barOptions}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard