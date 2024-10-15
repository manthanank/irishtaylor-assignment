import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() items: Item[] = []; // Array to hold items fetched from the service
  lineChart: Chart | undefined; // Line chart instance
  barChart: Chart | undefined; // Bar chart instance

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    // Fetch items from the service and update the chart
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.updateChart();
    });

    // Register the necessary chart types
    Chart.register(...registerables);

    // Initialize line chart
    const lineCtx = document.getElementById('lineChart') as HTMLCanvasElement;
    this.lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: [], // Initialize with empty labels
        datasets: [
          {
            label: 'Item Data',
            data: [], // Initialize with empty data
            backgroundColor: [], // Initialize with empty background colors
            borderColor: [], // Initialize with empty border colors
            borderWidth: 1,
          },
        ],
      },
    });

    // Initialize bar chart
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: [], // Initialize with empty labels
        datasets: [
          {
            label: 'Item Data',
            data: [], // Initialize with empty data
            backgroundColor: [], // Initialize with empty background colors
            borderColor: [], // Initialize with empty border colors
            borderWidth: 1,
          },
        ],
      },
    });
  }

  // Method to update the charts with new data
  updateChart(): void {
    const labels = this.items.map((item) => item.name); // Use 'name' as labels
    const data = this.items.map((item) => item.id); // Use 'id' as data
    const backgroundColor = this.items.map(() => 'rgba(75, 192, 192, 0.2)'); // Static color for simplicity
    const borderColor = this.items.map(() => 'rgba(75, 192, 192, 1)'); // Static color for simplicity

    // Update line chart data and re-render
    if (this.lineChart) {
      this.lineChart.data.labels = labels;
      this.lineChart.data.datasets[0].data = data;
      this.lineChart.data.datasets[0].backgroundColor = backgroundColor;
      this.lineChart.data.datasets[0].borderColor = borderColor;
      this.lineChart.update();
    }

    // Update bar chart data and re-render
    if (this.barChart) {
      this.barChart.data.labels = labels;
      this.barChart.data.datasets[0].data = data;
      this.barChart.data.datasets[0].backgroundColor = backgroundColor;
      this.barChart.data.datasets[0].borderColor = borderColor;
      this.barChart.update();
    }
  }

  // Detect changes when new items are passed from the parent
  ngOnChanges(): void {
    this.updateChart();
  }
}
