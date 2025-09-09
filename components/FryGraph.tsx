import React from 'react';

interface FryGraphProps {
  syllables: number | null;
  sentences: number | null;
}

const GRAPH_CONFIG = {
  width: 800,
  height: 600,
  padding: { top: 20, right: 20, bottom: 60, left: 60 },
  x: { min: 108, max: 182, label: 'Syllables per 100 Words' },
  y: { min: 2.0, max: 25.0, label: 'Sentences per 100 Words' },
};

const gradePaths = [
    { grade: '1', d: 'M 148,600 C 130,300, 124,250, 122,200' },
    { grade: '2', d: 'M 180,600 C 150,350, 132,250, 125,120' },
    { grade: '3', d: 'M 225,600 C 180,380, 142,250, 128,80' },
    { grade: '4', d: 'M 280,600 C 200,400, 155,250, 132,45' },
    { grade: '5', d: 'M 350,600 C 240,420, 175,250, 139,20' },
    { grade: '6', d: 'M 430,600 C 290,440, 195,250, 145,0' },
    { grade: '7', d: 'M 525,600 C 350,460, 220,250, 152,0' },
    { grade: '8', d: 'M 600,600 C 410,480, 255,250, 156,0' },
    { grade: '9', d: 'M 670,600 C 470,500, 290,250, 161,0' },
    { grade: '10', d: 'M 740,600 C 530,520, 330,250, 167,0' },
    { grade: '11', d: 'M 800,600 C 590,540, 370,250, 172,0' },
    { grade: '12', d: 'M 850,600 C 650,560, 410,250, 179,0' },
    { grade: 'College', d: 'M 880,600 C 680,570, 430,250, 182,0' }
];

const FryGraph: React.FC<FryGraphProps> = ({ syllables, sentences }) => {
  const { width, height, padding, x, y } = GRAPH_CONFIG;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const getX = (val: number) => {
    const clampedVal = Math.max(x.min, Math.min(val, x.max));
    return padding.left + ((clampedVal - x.min) / (x.max - x.min)) * plotWidth;
  };

  const getY = (val: number) => {
    const clampedVal = Math.max(y.min, Math.min(val, y.max));
    return padding.top + ((y.max - clampedVal) / (y.max - y.min)) * plotHeight;
  };

  const pointX = syllables ? getX(syllables) : null;
  const pointY = sentences ? getY(sentences) : null;

  const renderGrid = () => {
    const gridLines = [];
    // Y-axis grid lines (sentences)
    for (let i = 2; i <= 25; i += 1) {
       if (i > 10 && i % 2 !== 0 && i !== 25) continue; // less dense lines at top
       if (i === 25 || i % 5 === 0 || i <= 10) {
           gridLines.push(<line key={`y-grid-${i}`} x1={padding.left} y1={getY(i)} x2={width - padding.right} y2={getY(i)} className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="1"/>);
           gridLines.push(<text key={`y-label-${i}`} x={padding.left - 10} y={getY(i)} dy="0.32em" textAnchor="end" className="text-xs fill-current text-gray-500 dark:text-gray-400">{i}</text>);
       }
    }
    // X-axis grid lines (syllables)
    for (let i = x.min; i <= x.max; i += 4) {
       gridLines.push(<line key={`x-grid-${i}`} x1={getX(i)} y1={padding.top} x2={getX(i)} y2={height-padding.bottom} className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="1"/>);
       gridLines.push(<text key={`x-label-${i}`} x={getX(i)} y={height - padding.bottom + 20} textAnchor="middle" className="text-xs fill-current text-gray-500 dark:text-gray-400">{i}</text>);
    }
    return gridLines;
  };


  return (
    <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto min-w-[600px]">
            {/* Grid and Labels */}
            {renderGrid()}
            
            {/* Axes */}
            <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} className="stroke-current text-gray-400 dark:text-gray-500" strokeWidth="2" />
            <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} className="stroke-current text-gray-400 dark:text-gray-500" strokeWidth="2" />
            
            {/* Axis Titles */}
            <text x={width / 2} y={height - 10} textAnchor="middle" className="text-sm font-semibold fill-current text-gray-700 dark:text-gray-300">
                {x.label}
            </text>
            <text transform={`rotate(-90)`} x={-(height / 2)} y="15" textAnchor="middle" className="text-sm font-semibold fill-current text-gray-700 dark:text-gray-300">
                {y.label}
            </text>

            {/* Grade Level Paths */}
            <g transform={`translate(${padding.left}, ${padding.top}) scale(${plotWidth / (x.max - x.min)}, ${plotHeight / (y.max - y.min)}) translate(${-x.min}, ${-y.max}) scale(1, -1)`}>
                {gradePaths.map(p => (
                    <path key={p.grade} d={p.d} stroke="rgba(168, 85, 247, 0.3)" fill="none" strokeWidth="8" strokeLinecap="round" />
                ))}
            </g>
             {/* Grade Level Labels */}
             <text x={getX(118)} y={getY(20)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">1st</text>
             <text x={getX(122)} y={getY(12)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">2nd</text>
             <text x={getX(126)} y={getY(9.5)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">3rd</text>
             <text x={getX(130)} y={getY(7.5)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">4th</text>
             <text x={getX(136)} y={getY(6.2)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">5th</text>
             <text x={getX(142)} y={getY(5.2)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">6th</text>
             <text x={getX(150)} y={getY(4.5)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">7th</text>
             <text x={getX(155)} y={getY(3.8)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">8th</text>
             <text x={getX(164)} y={getY(3.4)} className="font-bold text-lg fill-current text-purple-400/50 dark:text-purple-600/50" textAnchor="middle">College</text>

            {/* Plotted Point */}
            {pointX !== null && pointY !== null && (
                <g>
                    <circle cx={pointX} cy={pointY} r="10" className="fill-purple-500 opacity-30" />
                    <circle cx={pointX} cy={pointY} r="6" className="fill-purple-600" />
                    <circle cx={pointX} cy={pointY} r="6" className="stroke-white dark:stroke-gray-900" strokeWidth="2" fill="none" />
                </g>
            )}
        </svg>
    </div>
  );
};

export default FryGraph;