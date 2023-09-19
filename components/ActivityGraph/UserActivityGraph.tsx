import React, { useState } from 'react';
import { Tooltip, Modal, Button } from '@mui/material';
import { format } from 'date-fns';
import classes from './UserActivityGraph.module.css';

interface UserActivityGraphProps {
    data: { date: Date; activityCount: number }[];
    registrationDate: Date;
}

const UserActivityGraph: React.FC<UserActivityGraphProps> = ({
    data,
    registrationDate,
}) => {
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

    // Labels
    const days = ['Mon', 'Wed', 'Fri', 'Sun'];
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];


    // Helper to get date for a tile 
    const getDateForTile = (weekIndex: number, dayIndex: number) => {

        const currentDate = new Date();

        // Registeration day details
        const registrationDay = registrationDate.getDay();
        // const registrationMonth = registrationDate.getMonth();

        return new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() -
            (52 - weekIndex) * 7 +
            dayIndex -
            registrationDay
        );

    }

    const getTileColor = (activityCount: number): string => {
        if (activityCount === 0) {
            return '#ebedf0';
        } else if (activityCount >= 1 && activityCount <= 3) {
            return '#c6e48b';
        } else if (activityCount >= 4 && activityCount <= 6) {
            return '#7bc96f';
        } else if (activityCount >= 7 && activityCount <= 9) {
            return '#239a3b';
        } else {
            return '#196127';
        }
    };

    const getTileTooltip = (
        date: Date,
        activityCount: number,
        isFirstDay: boolean
    ): string => {
        const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
        if (isFirstDay) {
            return `First Day, \n${formattedDate}`;
        } else {
            return `${formattedDate}\n${activityCount} activities`;
        }
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
                        className={classes.legendTile}
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


    const renderTiles = () => {
        const tiles = [];

        for (let i = 0; i < 52; i++) {
            for (let j = 0; j < 7; j++) {
                const date = getDateForTile(i, j);

                // Get day and month labels
                const dayLabel = days[j];
                const monthLabel = months[date.getMonth()];


                const activityData = data.find(
                    (item) =>
                        item.date.getFullYear() === date.getFullYear() &&
                        item.date.getMonth() === date.getMonth() &&
                        item.date.getDate() === date.getDate()
                );
                const activityCount = activityData ? activityData.activityCount : 0;
                const isFirstDay =
                    date.getFullYear() === registrationDate.getFullYear() &&
                    date.getMonth() === registrationDate.getMonth() &&
                    date.getDate() === registrationDate.getDate();

                const tileColor = getTileColor(activityCount);

                const tileTooltip = getTileTooltip(date, activityCount, isFirstDay);

                const tileClass = isFirstDay
                    ? classes.firstDayTile
                    : activityCount === 0
                        ? classes.tile
                        : `${classes.tile} ${classes.activityTile}`;

                tiles.push(
                    <Tooltip key={`${i}-${j}`} title={tileTooltip} arrow>
                        <div className={tileClass} style={{ backgroundColor: tileColor }}>
                            {!isFirstDay && (
                                <>
                                    <div className={classes.dayLabel}>{dayLabel}</div>
                                    <div className={classes.monthLabel}>{monthLabel}</div>
                                </>
                            )}
                        </div>
                    </Tooltip>
                );


            }
        }

        return tiles;
    };

    return (
        <div className={classes.main}>
            <div className={classes.graphContainer}>{renderTiles()}</div>
            <div className={classes.legendContainer}>
                <span className={classes.legendText}>More</span>
                {renderLegendTiles()}
                <span className={classes.legendText}>Less</span>
                <div className={classes.buttonContainer}>
                    <Button onClick={handleModalOpen}>What is this?</Button>
                </div>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <div className={classes.modal}>
                        <h2 id="modal-title">Daily Activity</h2>
                        <p id="modal-description">
                            Daily Activity refers to the number of activities performed by a user on a given day. It is represented by the color of the tiles in the graph. The darker the color, the higher the activity count. The graph displays the activity count for each day of the week over a period of 52 weeks. The legend on the right side of the graph provides a color scale to interpret the activity levels. You can hover over each tile to view the specific date and activity count. Enjoy tracking your daily activities!
                        </p>
                        <Button onClick={handleModalClose}>Close</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default UserActivityGraph;
