//@ts-nocheck
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const cal: CalHeatmap = new CalHeatmap();
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;  
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (file) {
      const text = await file.text();
      const conversations = JSON.parse(text);
      cal.paint({
        itemSelector: '#cal',
        range: new Date().getFullYear() - 2023 + 1,
        domain: { type: 'year' },
        subDomain: { type: 'day' },
        date: { start: new Date(2023, 1, 1) },
        verticalOrientation: true,
        animationDuration: 0,
        theme: 'dark',
        data: {
          source: conversations,
          type: 'json',
          x: d => d['create_time'] * 1000,
          y: () => 1,
        },
        scale: {
          color: {
            domain: [0, 10],
          }
        }
      }, [[Tooltip, {
        text: (timestamp: number, value: number, dayjsDate: dayjs.Dayjs) => value ? `${value} (${dayjsDate.format('LL')})` : "",
      }]]);
    }
  });

  const fileButton = document.getElementById('fileButton')!;
  fileButton.addEventListener('click', () => fileInput.click());
});
