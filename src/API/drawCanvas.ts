import { pxToMm } from '@/lib/mmToPx';
import { computed } from 'vue';
import { useScreenSizeStore } from '@/stores/screenInch';

// FIXME: regenerate canvas when screenInch change
// TODO: 考慮加上拖曳端點的功能
export default () => {
  const screenSizeStore = useScreenSizeStore();

  const screenInch = computed({
    get() {
      return screenSizeStore.screenInch;
    },
    set(val) {
      screenSizeStore.screenInch = val;
    }
  });

  const clear = (domCanvas: HTMLElement) => {
    domCanvas.querySelector('canvas')?.remove();
  };

  const init = (domCanvas: HTMLElement) => {
    clear(domCanvas);
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute left-0 top-0 border';
    const width = domCanvas.style.width;
    const height = domCanvas.style.height;
    if (!width && !height) return;
    canvas.width = parseFloat(width);
    canvas.height = parseFloat(height);

    domCanvas.prepend(canvas);
    // 獲取canvas元素
    // const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    // 定義兩個點的變數
    const startPoint = { x: 0, y: 0 };
    const endPoint = { x: 0, y: 0 };
    let isDrawing = false;

    // 監聽mousedown事件
    canvas.addEventListener('mousedown', (e) => {
      if (!isDrawing) {
        startPoint.x = e.clientX - canvas.getBoundingClientRect().left;
        startPoint.y = e.clientY - canvas.getBoundingClientRect().top;
        isDrawing = true;
        drawCircleWithX(startPoint);
      } else {
        endPoint.x = e.clientX - canvas.getBoundingClientRect().left;
        endPoint.y = e.clientY - canvas.getBoundingClientRect().top;
        isDrawing = false;

        drawLine(startPoint, endPoint);
        drawCircleWithX(startPoint);
        drawCircleWithX(endPoint);
        drawDistance(startPoint, endPoint);
      }
    });

    function drawDistance(start: { x: number; y: number }, end: { x: number; y: number }) {
      const distance = pxToMm(screenInch.value, calculateDistance(start, end)).toFixed(0) + 'mm';
      // 在畫布上顯示距離
      context.fillStyle = 'black';
      context.strokeStyle = 'white';
      context.font = '12px Arial';
      context.lineWidth = 5;

      context.strokeText(distance, (start.x + end.x) / 2, (start.y + end.y) / 2);
      context.fillText(distance, (start.x + end.x) / 2, (start.y + end.y) / 2);

      // 計算兩點之間的距離
      function calculateDistance(
        point1: { x: number; y: number },
        point2: { x: number; y: number }
      ) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }

    // 繪製線條的函數
    function drawLine(start: { x: number; y: number }, end: { x: number; y: number }) {
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = 'black'; // X符號的顏色
      context.lineWidth = 1;
      context.stroke();
      context.closePath();
    }

    // 繪製圓形和X符號的函數
    function drawCircleWithX(point: { x: number; y: number }) {
      // 繪製圓形
      context.beginPath();
      // context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      const size = 10; // 正方形的大小
      context.rect(point.x - size / 2, point.y - size / 2, size, size);
      context.fillStyle = 'white'; // 圓形的填充顏色
      context.fill();
      context.strokeStyle = 'black'; // X符號的顏色
      context.lineWidth = 1;
      context.stroke();
      context.closePath();

      // // 繪製X符號
      // context.beginPath();
      // context.moveTo(point.x - 4, point.y - 4);
      // context.lineTo(point.x + 4, point.y + 4);
      // context.strokeStyle = 'white'; // X符號的顏色
      // context.stroke();
      // context.closePath();

      // context.beginPath();
      // context.moveTo(point.x + 4, point.y - 4);
      // context.lineTo(point.x - 4, point.y + 4);
      // context.strokeStyle = 'white'; // X符號的顏色
      // context.stroke();
      // context.closePath();
    }
  };

  return { init, clear };
};
