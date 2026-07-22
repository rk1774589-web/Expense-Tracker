/**
 * Initialize the Chart.js instance with dark theme styling
 * @returns {Chart} Chart.js instance
 */
export function initChart() {
  const canvas = document.getElementById("spending-chart");
  if (!canvas) return null;

  const ctx = canvas.getContext("2d");

  return new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Daily Spending",
          data: [],
          borderColor: "#6366f1", // Indigo primary accent
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;

            // Gradient fill under the line
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom,
            );
            gradient.addColorStop(0, "rgba(99, 102, 241, 0.35)");
            gradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");
            return gradient;
          },
          borderWidth: 2,
          fill: true,
          tension: 0.4, // Smooth curved lines
          pointBackgroundColor: "#6366f1",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }, // Hide default legend to keep UI clean
        tooltip: {
          backgroundColor: "#1f2937",
          titleColor: "#f9fafb",
          bodyColor: "#9ca3af",
          borderColor: "#374151",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: (context) => ` Amount: $${Math.abs(context.raw).toFixed(2)}`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#9ca3af", font: { family: "Inter", size: 11 } },
        },
        y: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: {
            color: "#9ca3af",
            font: { family: "Inter", size: 11 },
            callback: (value) => `$${value}`,
          },
        },
      },
    },
  });
}

/**
 * Group transactions by date and redraw the chart
 * @param {Chart} chart - Active Chart.js instance
 * @param {Array} transactions - List of filtered transaction objects
 */
export function updateChart(chart, transactions) {
  if (!chart) return;

  // 1. Sort transactions chronologically (oldest to newest)
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // 2. Aggregate total spending per date
  const totalsByDate = sorted.reduce((acc, tx) => {
    // Focus on expenses for the spending chart (or use abs value)
    const amount = Math.abs(tx.amount);
    acc[tx.date] = (acc[tx.date] || 0) + amount;
    return acc;
  }, {});

  // 3. Extract dates (X-axis) and amounts (Y-axis)
  const labels = Object.keys(totalsByDate);
  const data = Object.values(totalsByDate);

  // 4. Update chart datasets and animate render
  chart.data.labels = labels.length ? labels : ["No Data"];
  chart.data.datasets[0].data = data.length ? data : [0];
  chart.update();
}
