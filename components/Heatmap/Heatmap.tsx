import React, { useState } from 'react';
import { Tooltip, Modal, Button } from '@mui/material';
import { format } from 'date-fns';

import {
	MONTHS,
	WEEK_DAYS,
	DAYS_IN_YEAR,
	DEFAULT_SQUARE_GAP,
	DEFAULT_SQUARE_SIZE,
} from './constants';
import {
	transformCount,
	transformPixelsToNumber,
} from './utils';
import styles from './Heatmap.module.css';

interface HeatmapProps {
	colour?: string[];
	fontSize?: string;
	data: { date: Date; activityCount: number }[];
	registrationDate: Date;
	isFirstDay: boolean;
}

const Heatmap: React.FC<HeatmapProps> = (props: HeatmapProps) => {
	const squareGap: string = DEFAULT_SQUARE_GAP;
	const squareSize: string = DEFAULT_SQUARE_SIZE;
	const weekWidth: string =
		String(
			transformPixelsToNumber(squareGap) +
			transformPixelsToNumber(squareSize)
		) + 'px';

	const registrationDate: Date = props.registrationDate;
	const [modalOpen, setModalOpen] = useState(false);
	const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleLegendTileHover = (color: string) => {
		setHoveredLegend(color);
	};

	const renderLegendTiles = () => {
		const legendColors = ['rgba(0,143,83,1)', 'rgba(0,143,83,0.7)', 'rgba(0,143,83,0.5)', 'rgba(0,143,83,0.3)', '#E4E4E4'];

		return legendColors.map((color) => {
			const activityCount = getActivityCountForColor(color);
			const tooltipContent =
				hoveredLegend === color
					? activityCount === 0
						? 'No Activities'
						: `${activityCount}+ activities`
					: '';

			return (
				<Tooltip key={color} title={tooltipContent} arrow>
					<div
						className={styles.legendTile}
						style={{ backgroundColor: color }}
						onMouseEnter={() => handleLegendTileHover(color)}
						onMouseLeave={() => handleLegendTileHover('null')}
					/>
				</Tooltip>
			);
		});
	};

	const getActivityCountForColor = (color: string): number => {
		// Map legend colors to activity count using your getTileColor function
		switch (color) {
			case '#E4E4E4':
				return 0;
			case 'rgba(0,143,83,0.3)':
				return 1; // Adjust the counts as per your getTileColor logic
			case 'rgba(0,143,83,0.5)':
				return 3;
			case 'rgba(0,143,83,0.7)':
				return 6;
			case 'rgba(0,143,83,1)':
				return 10;
			default:
				return 0; // Default to 0 for unknown colors
		}
	};

	const renderCalendarLabels = () => {
		return (
			<>
				<ul className={styles.Months}>
					{MONTHS.map((month, i) => (
						<li key={i}>{month}</li>
					))}
				</ul>
				<ul className={styles.Days}>
					{WEEK_DAYS.map((day, i) => (
						<li key={i}>{day}</li>
					))}
				</ul>
			</>
		)
	}

	// Helper to get date for a tile 
	const getDateForTile = (weekIndex: number, dayIndex: number) => {
		const currentDate = new Date();
		const registrationDay = registrationDate.getDay();

		return new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate() -
			(52 - weekIndex) * 7 +
			dayIndex -
			registrationDay
		);
	}

	const renderSquaresList = () => {
		const sortedTiles = [...Array(DAYS_IN_YEAR)].map((_, i) => {
			const dateForSquare: Date = getDateForTile(i, i % 7);
			const dayIndex = Math.floor(
				(dateForSquare.getTime() - registrationDate.getTime()) / (24 * 60 * 60 * 1000)
			);
			const weekIndex = Math.floor(dayIndex / 7);
			const monthIndex = dateForSquare.getMonth();
			const sortIndex = monthIndex * WEEK_DAYS.length * 7 + weekIndex * 7 + dateForSquare.getDay();

			return {
				squareIndex: i,
				sortIndex,
			};
		});

		sortedTiles.sort((a, b) => a.sortIndex - b.sortIndex);

		return (
			<ul className={styles.SquaresList}>
				{sortedTiles.map(({ squareIndex }) => {
					const activityCount = props.data[squareIndex]?.activityCount || 0;
					const dateForSquare: Date = getDateForTile(squareIndex, squareIndex % 7);
					const isFirstDay =
						dateForSquare.getDay() === registrationDate.getDay();
					const formattedDate = format(dateForSquare, 'EEEE, MMMM d, yyyy');
					const tileTooltip = isFirstDay
						? `First Day, ${formattedDate}`
						: `${formattedDate}\n${activityCount} activities`;

					return (
						<Tooltip key={squareIndex} title={tileTooltip} arrow>
							<li
								className={`${styles.SquareListItem} ${styles.squares}`}
								data-level={transformCount(activityCount)}
							></li>
						</Tooltip>
					);
				})}
			</ul>
		);
	};

	return (
		<div>
			<p className={styles.header}>Activity</p>
			<div className={styles.main}>
				<div className={styles.GraphWrapper}>
					<div className={styles.Graph}>
						{renderCalendarLabels()}
						{renderSquaresList()}
					</div>
				</div>
				<div className={styles.legendContainer}>
					<span className={styles.legendText}>More</span>
					{renderLegendTiles()}
					<span className={styles.legendText}>Less</span>
				</div>
				<div className={styles.modalContainer}>
					<div className={styles.buttonContainer}>
						<Button className={styles.btn} onClick={handleModalOpen}>What is this?</Button>
					</div>
					<Modal
						open={modalOpen}
						onClose={handleModalClose}
						aria-labelledby="modal-title"
						aria-describedby="modal-description"
					>
						<div>
							<div className={styles.modal}>
								<h2 id="modal-title">Daily activity</h2>
								<p id="modal-description">
									<br />
									The daily activity chart is a visual display of your activity on Skool over the past year. Activities that contribute towards this chart include liking posts, writing posts, commenting on posts and voting on polls.
									<br /><br />
									Activities are timestamped according to Coordinated Universal Time (UTC) rather than your local time zone.
								</p>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default Heatmap;
