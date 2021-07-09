import React from 'react';

import { TabProps } from '../App';

export const MainEventButton: React.FC<TabProps> = ({ selected, setSelected }) => (
  <div>
    {selected === 'main-event' ? <div className='selected' /> : null}
    <svg
      onClick={() => setSelected('main-event')}
      xmlns='http://www.w3.org/2000/svg'
      width='72'
      height='53'
      fill='none'
      viewBox='0 0 72 53'
    >
      <path
        fill={`${selected === 'main-event' ? 'var(--primary-accent)' : 'var(--text-mid-emphasis)'}`}
        fillRule='evenodd'
        d='M43 6v1c1.953 0 3.03.926 3 2.943v13.558A3.492 3.492 0 0142.501 27H29.5A3.492 3.492 0 0126 23.501V9.943C26 8.035 27 7 29 7V6a1 1 0 112 0v1h10V6a1 1 0 012 0zm-.33 19c.752 0 1.33-.607 1.33-1.33V11.078H28V23.67c0 .723.607 1.33 1.33 1.33h13.34zm-6.214-11.984a.5.5 0 00-.912 0l-1.23 2.74a.5.5 0 01-.402.293l-2.986.323a.5.5 0 00-.282.867l2.226 2.017a.5.5 0 01.153.473l-.615 2.94a.5.5 0 00.738.535l2.605-1.493a.5.5 0 01.498 0l2.605 1.494a.5.5 0 00.738-.537l-.615-2.94a.5.5 0 01.153-.472l2.226-2.017a.5.5 0 00-.282-.867l-2.986-.323a.5.5 0 01-.402-.293l-1.23-2.74z'
        clipRule='evenodd'
      ></path>
      <path
        fill={`${selected === 'main-event' ? 'var(--primary-accent)' : 'var(--text-mid-emphasis)'}`}
        d='M8.427 39v8h.906v-6.078h.078l2.5 6.078h.875l2.5-6.078h.078V47h.906v-8h-1.156l-2.719 6.64h-.093L9.583 39H8.427zm11.427 8.14c1.046 0 1.593-.562 1.78-.953h.048V47h.922v-3.953c0-1.906-1.454-2.125-2.22-2.125-.905 0-1.937.312-2.405 1.406l.875.313c.203-.438.683-.907 1.562-.907.848 0 1.266.45 1.266 1.22v.03c0 .446-.453.407-1.547.547-1.114.145-2.328.39-2.328 1.766 0 1.172.906 1.844 2.047 1.844zm.14-.828c-.734 0-1.265-.328-1.265-.968 0-.703.64-.922 1.359-1.016.39-.047 1.437-.156 1.594-.344v.844c0 .75-.594 1.484-1.688 1.484zm4.292.688h.922v-6h-.922v6zm.469-7c.36 0 .656-.281.656-.625s-.297-.625-.656-.625c-.36 0-.656.281-.656.625s.296.625.656.625zm3.063 3.39c0-1.046.649-1.64 1.532-1.64.855 0 1.375.559 1.375 1.5V47h.921v-3.813c0-1.53-.816-2.265-2.03-2.265-.907 0-1.47.406-1.75 1.016h-.079V41h-.89v6h.921v-3.61zm11.122 3.735c1.22 0 2.11-.61 2.391-1.516l-.89-.25c-.235.625-.778.938-1.5.938-1.083 0-1.829-.7-1.872-1.984h4.356v-.391c0-2.234-1.328-3-2.578-3-1.625 0-2.703 1.281-2.703 3.125s1.062 3.078 2.796 3.078zm-1.87-3.61c.062-.933.722-1.765 1.777-1.765 1 0 1.64.75 1.64 1.766H37.07zM47.55 41h-1l-1.655 4.781h-.063L43.176 41h-1l2.218 6h.938l2.219-6zm3.518 6.125c1.22 0 2.11-.61 2.391-1.516l-.89-.25c-.235.625-.778.938-1.5.938-1.083 0-1.829-.7-1.872-1.984h4.356v-.391c0-2.234-1.328-3-2.578-3-1.625 0-2.703 1.281-2.703 3.125s1.062 3.078 2.796 3.078zm-1.87-3.61c.062-.933.722-1.765 1.777-1.765 1 0 1.64.75 1.64 1.766h-3.418zm6.679-.124c0-1.047.648-1.641 1.531-1.641.856 0 1.375.559 1.375 1.5V47h.922v-3.813c0-1.53-.816-2.265-2.031-2.265-.906 0-1.469.406-1.75 1.016h-.078V41h-.89v6h.921v-3.61zM63.999 41h-1.281v-1.438h-.922V41h-.906v.781h.906v3.75c0 1.047.844 1.547 1.625 1.547.344 0 .562-.062.687-.11l-.187-.827c-.078.015-.203.047-.406.047-.407 0-.797-.126-.797-.907v-3.5h1.281V41z'
      ></path>
    </svg>
  </div>
);
