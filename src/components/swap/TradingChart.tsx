"use client";

import React from "react";
import "./TradingChart.css";

interface TradingChartProps {
    pair: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ pair: _pair }) => {
    // Static candlestick data
    const candlesticks = [
        { time: "00:00", open: 0.0324, high: 0.0328, low: 0.0322, close: 0.0326, volume: 120 },
        { time: "04:00", open: 0.0326, high: 0.0330, low: 0.0324, close: 0.0328, volume: 150 },
        { time: "08:00", open: 0.0328, high: 0.0332, low: 0.0326, close: 0.0330, volume: 180 },
        { time: "12:00", open: 0.0330, high: 0.0334, low: 0.0328, close: 0.0332, volume: 200 },
        { time: "16:00", open: 0.0332, high: 0.0336, low: 0.0330, close: 0.0334, volume: 170 },
        { time: "20:00", open: 0.0334, high: 0.0338, low: 0.0332, close: 0.0336, volume: 190 },
        { time: "24:00", open: 0.0336, high: 0.0340, low: 0.0334, close: 0.0338, volume: 210 },
    ];

    const maxPrice = Math.max(...candlesticks.map(c => c.high));
    const minPrice = Math.min(...candlesticks.map(c => c.low));
    const priceRange = maxPrice - minPrice;
    const maxVolume = Math.max(...candlesticks.map(c => c.volume));

    const getCandlestickColor = (open: number, close: number) => {
        return close >= open ? "#00d6a3" : "#ff6b6b";
    };

    const _getCandlestickHeight = (high: number, low: number) => {
        return ((high - low) / priceRange) * 100;
    };

    const getCandlestickY = (high: number) => {
        return ((maxPrice - high) / priceRange) * 100;
    };

    return (
        <div className="trading-chart-container">
            <div className="chart-header">
                <div className="chart-timeframe-selector">
                    <button className="timeframe-btn active">12 Hours</button>
                    <button className="timeframe-btn">24 Hours</button>
                    <button className="timeframe-btn">7 Days</button>
                    <button className="timeframe-btn">1M</button>
                    <button className="timeframe-btn">6M</button>
                    <button className="timeframe-btn">Order Book</button>
                    <button className="timeframe-btn">Info</button>
                </div>
            </div>
            <div className="chart-wrapper">
                <div className="chart-price-axis">
                    {[maxPrice, maxPrice - priceRange * 0.25, maxPrice - priceRange * 0.5, maxPrice - priceRange * 0.75, minPrice].map((price, idx) => (
                        <div key={idx} className="price-label">{price.toFixed(5)}</div>
                    ))}
                </div>
                <div className="chart-main">
                    <svg className="candlestick-chart" viewBox="0 0 700 300">
                        {candlesticks.map((candle, idx) => {
                            const x = (idx / (candlesticks.length - 1)) * 700;
                            const color = getCandlestickColor(candle.open, candle.close);
                            const bodyHeight = Math.abs(candle.close - candle.open) / priceRange * 100;
                            const bodyY = getCandlestickY(Math.max(candle.open, candle.close));
                            const wickTop = getCandlestickY(candle.high);
                            const wickBottom = getCandlestickY(candle.low);
                            const _bodyTop = getCandlestickY(candle.open);
                            const _bodyBottom = getCandlestickY(candle.close);

                            return (
                                <g key={idx}>
                                    {/* Wick */}
                                    <line
                                        x1={x}
                                        y1={wickTop}
                                        x2={x}
                                        y2={wickBottom}
                                        stroke={color}
                                        strokeWidth="2"
                                    />
                                    {/* Body */}
                                    <rect
                                        x={x - 15}
                                        y={bodyY}
                                        width="30"
                                        height={Math.max(bodyHeight, 2)}
                                        fill={color}
                                        opacity="0.8"
                                    />
                                </g>
                            );
                        })}
                    </svg>
                    <div className="chart-time-axis">
                        {candlesticks.map((candle, idx) => (
                            <div key={idx} className="time-label">{candle.time}</div>
                        ))}
                    </div>
                </div>
                <div className="chart-volume">
                    {candlesticks.map((candle, idx) => {
                        const volumeHeight = (candle.volume / maxVolume) * 100;
                        const color = getCandlestickColor(candle.open, candle.close);
                        return (
                            <div
                                key={idx}
                                className="volume-bar"
                                style={{
                                    height: `${volumeHeight}%`,
                                    backgroundColor: color,
                                    opacity: 0.3
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TradingChart;

