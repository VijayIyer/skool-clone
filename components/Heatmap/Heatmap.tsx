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
	getRandomCount,
	transformCount,
	transformPixelsToNumber,
} from './utils';
import styles from './Heatmap.module.css'; // Import the CSS module

interface HeatmapProps {
	colour?: string[];
	squareNumber?: number;
	count: number[];
	squareGap?: string;
	squareSize?: string;
	fontSize?: string;
	tooltipContent?: string;
	data: { date: Date; activityCount: number }[];
	registrationDate: Date;
}

const Heatmap: React.FC<HeatmapProps> = (props: HeatmapProps) => {
	const squareNumber: number = props.squareNumber || DAYS_IN_YEAR;
	const count: number[] = props.count || getRandomCount(squareNumber);
	const level: number[] = count.map((i: number) => transformCount(i));
	const squareGap: string = props.squareGap || DEFAULT_SQUARE_GAP;
	const squareSize: string = props.squareSize || DEFAULT_SQUARE_SIZE;
	const fontSize: string = props.fontSize || '12px';
	const weekWidth: string =
		String(
			transformPixelsToNumber(squareGap) +
			transformPixelsToNumber(squareSize)
		) + 'px';

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
		const legendColors = ['#196127', '#239a3b', '#7bc96f', '#c6e48b', '#ebedf0'];

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
			case '#ebedf0':
				return 0;
			case '#c6e48b':
				return 1; // Adjust the counts as per your getTileColor logic
			case '#7bc96f':
				return 3;
			case '#239a3b':
				return 6;
			case '#196127':
				return 10;
			default:
				return 0; // Default to 0 for unknown colors
		}
	};

	// const renderTiles = () => {
	// 	const tiles = [];

	// 	for (let i = 0; i < 52; i++) {
	// 		for (let j = 0; j < 7; j++) {
	// 			const date = getDateForTile(i, j);
	// 			const registrationDate = new Date(2023, 0, 1);

	// 			if (date < registrationDate) {
	// 				tiles.push(<div className={styles.placeholderTile} />);
	// 				continue;
	// 			}

	// 			const activityData = props.data.find(
	// 				(item) =>
	// 					item.date.getFullYear() === date.getFullYear() &&
	// 					item.date.getMonth() === date.getMonth() &&
	// 					item.date.getDate() === date.getDate()
	// 			);

	// 			const isFirstDay = date.getTime() === registrationDate.getTime();
	// 			const activityCount = activityData ? activityData.activityCount : 0;
	// 			const tileColor = getTileColor(activityCount);

	// 			tiles.push(
	// 				<Tooltip title={getTileTooltip(date, activityCount, isFirstDay)}>
	// 					<div
	// 						className={styles.activityTile}
	// 						style={{ backgroundColor: tileColor }}
	// 					>
	// 						{/* Added day and month labels */}
	// 						{!isFirstDay && (
	// 							<>
	// 								<div className={styles.dayLabel}>
	// 									{WEEK_DAYS[j]}
	// 								</div>
	// 								<div className={styles.monthLabel}>
	// 									{MONTHS[date.getMonth()]}
	// 								</div>
	// 							</>
	// 						)}
	// 					</div>
	// 				</Tooltip>
	// 			);
	// 		}
	// 	}
	// 	return tiles;
	// };

	return (
		<div className={styles.Wrapper}>
			<div className={styles.header}>
				<p>Activity</p>
			</div>
			<div className={styles.Graph}>
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
				<ul className={styles.SquaresList}>
					{[...Array(squareNumber)].map((key: React.Key, i) => (
						<li
							className={`${styles.SquareListItem} ${styles.squares}`}
							data-level={level[i]}
							key={key}
							data-tooltip={
								props.tooltipContent || `${count[i]} activities`
							}
						></li>
					))}
				</ul>
			</div>

			<div className={styles.legendContainer}>
				<span className={styles.legendText}>More</span>
				{renderLegendTiles()}
				<span className={styles.legendText}>Less</span>

				<div className={styles.buttonContainer}>
					<Button onClick={handleModalOpen}>What is this?</Button>
				</div>
				<Modal
					open={modalOpen}
					onClose={handleModalClose}
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					<div>
						<div className={styles.modal}>
							<h2 id="modal-title">Daily Activity</h2>
							<p id="modal-description">
								Daily Activity refers to the number of activities performed by a
								user on a given day. It is represented by the color of the tiles
								in the graph. The darker the color, the higher the activity count.
								The graph displays the activity count for each day of the week over
								a period of 52 weeks. The legend on the right side of the graph
								provides a color scale to interpret the activity levels. You can
								hover over each tile to view the specific date and activity count.
								Enjoy tracking your daily activities!
							</p>

							<Button onClick={handleModalClose}>Close</Button>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default Heatmap;
