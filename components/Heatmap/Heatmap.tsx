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

	return (
		<div>
			<p className={styles.header}>Activity</p>
			<div className={styles.main}>
				<div className={styles.GraphWrapper}>
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
