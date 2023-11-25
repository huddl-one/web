"use client";

import { AlarmClock, TimerReset } from "lucide-react";
import React, { useEffect, useState } from "react";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
	const [showTimer, setShowTimer] = useState<boolean>(false);
	const [time, setTime] = useState<number>(0);

	const formatTime = (time: number): string => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;

		return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${
			seconds < 10 ? "0" + seconds : seconds
		}`;
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (showTimer) {
			intervalId = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [showTimer]);

	return (
		<div>
			{showTimer ? (
				<div className='flex items-center p-1 cursor-pointer rounded relative'>
					<div className="absolute -left-16">{formatTime(time)}</div>
					<TimerReset className='h-5 w-5'
						onClick={() => {
							setShowTimer(false);
							setTime(0);
						}}
					/>
				</div>
			) : (
				<div
					className='flex items-center p-1 h-8 rounded cursor-pointer'
					onClick={() => setShowTimer(true)}
				>
					<AlarmClock className='h-5 w-5' />
				</div>
			)}
		</div>
	);
};
export default Timer;