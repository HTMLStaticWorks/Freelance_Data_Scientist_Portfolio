/**
 * Dashboard JS for Freelance Data Scientist Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    initProjectFilters();
});

function initCharts() {
    // Placeholder for Chart.js or D3.js implementation
    const ctx = document.getElementById('projectStatusChart');
    if (ctx) {
        console.log('Project Status Chart Initialized');
    }
}

function initProjectFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            // Logic to filter project list
            document.querySelectorAll('.project-item').forEach(item => {
                if (filter === 'all' || item.dataset.status === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
