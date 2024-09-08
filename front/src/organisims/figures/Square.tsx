import { Box } from '@mui/material';
import React, { useEffect } from 'react';



export const Square: React.FC = () => {
    useEffect(() => {
        const canvas = document.getElementById('square') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // キャンバスの中心
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                // 正方形の辺の長さ
                const sideLength = 200;

                // 正方形の左上隅の座標を計算
                const x1 = (canvasWidth - sideLength) / 2;  // 左上隅のX座標
                const y1 = (canvasHeight - sideLength) / 2; // 左上隅のY座標

                // 正方形を描画
                ctx.beginPath();
                ctx.rect(x1, y1, sideLength, sideLength);
                ctx.lineWidth = 2;
                ctx.stroke();

                // 正方形の中心を計算
                const centerX = x1 + sideLength / 2;
                const centerY = y1 + sideLength / 2;

                // テキストの幅と高さを取得
                ctx.font = "48px serif";
                const text = "2";
                const textWidth = ctx.measureText(text).width;
                const textHeight = 48; // フォントサイズに基づいておおよその高さを計算

                // 円の描画
                const radius = Math.max(textWidth, textHeight) / 2 + 10; // テキストを囲む円の半径
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // 正方形の中心に円を描画
                ctx.stroke();

                // テキストを正方形の中心に描画
                ctx.fillText(text, centerX - textWidth / 2, centerY + textHeight / 4 + 5);
            }
        }
    }, []);

    return (
        <Box sx={{scale: "50%"}}>
            <canvas id="square" width="500" height="500"></canvas>
        </Box>
    );
};
