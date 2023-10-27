import Heatmap from '@/components/Heatmap/Heatmap';

const HeatmapPage = () => {
    const registrationDate = new Date(2023, 3, 1);
    const isFirstDay = true;

    const generateHeatmapData = () => {
        const startDate = new Date(2023, 1, 1); // Start date
        const endDate = new Date(2023, 11, 31); // End date

        const heatmapData = [];
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

        const weekdays = [1, 2, 3, 4, 5]; // Monday to Friday (0 for Sunday, 1 for Monday, etc.)
        let currentDayIndex = 0;

        for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            const currentDayOfWeek = currentDate.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)

            if (currentDayOfWeek === weekdays[currentDayIndex]) {
                const activityCount = Math.floor(Math.random() * 20); // Random activity count between 0 and 19
                heatmapData.push({ date: new Date(currentDate), activityCount });

                currentDayIndex = (currentDayIndex + 1) % weekdays.length; // Move to the next weekday in a cyclic manner
            }
        }

        return heatmapData;
    };

    const heatmapData = generateHeatmapData();

    return (
        <div>
            <Heatmap
                colour={['#ebedf0', '#c6e48b', '#40c463', '#30a14e', '#216e39']}
                registrationDate={registrationDate}
                data={heatmapData} // Include the data property
                isFirstDay={isFirstDay} // Pass the isFirstDay prop
            />
        </div>
    );
};

export default HeatmapPage;
