import React, {useEffect} from "react";


export const Triangle: React.FC = () => {
    useEffect(() => {
        const canvas = document.getElementById('triangle') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // キャンバスの中心
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                // 正三角形の辺の長さ
                const sideLength = 200;

                // 正三角形の頂点の座標を計算
                const height = (Math.sqrt(3) / 2) * sideLength;  // 正三角形の高さ

                const x1 = canvasWidth / 2;              // 頂点1 (上)
                const y1 = (canvasHeight - height) / 2;

                const x2 = x1 - sideLength / 2;          // 頂点2 (左下)
                const y2 = y1 + height;

                const x3 = x1 + sideLength / 2;          // 頂点3 (右下)
                const y3 = y2;

                // 正三角形を描画
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x3, y3);
                ctx.closePath();
                ctx.lineWidth = 2;
                ctx.stroke();

                // 正三角形の中心を計算 (重心)
                const centerX = (x1 + x2 + x3) / 3;
                const centerY = (y1 + y2 + y3) / 3;

                // テキストの幅と高さを取得
                ctx.font = "48px serif";
                const text = "2";
                const textWidth = ctx.measureText(text).width;
                const textHeight = 48; // フォントサイズに基づいておおよその高さを計算

                // 円の描画
                const radius = Math.max(textWidth, textHeight) / 2 ; // テキストを囲む円の半径
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // 正三角形の中心に円を描画
                ctx.stroke();

                // テキストを正三角形の中心に描画
                ctx.fillText(text, centerX - textWidth / 2, centerY + textHeight / 4 + 5);
            }
        }
    }, []);

    return (
        <canvas id="triangle" width="500" height="500"></canvas>
    )
}