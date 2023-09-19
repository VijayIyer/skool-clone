import React from 'react';
import UserActivityGraph from '@/components/ActivityGraph/UserActivityGraph';

const UserActivityPage: React.FC = () => {
    // Mock data for testing
    const data = [
        { date: new Date('2022-09-15'), activityCount: 1 },
        { date: new Date('2022-09-17'), activityCount: 8 },
        { date: new Date('2022-09-18'), activityCount: 3 },
        { date: new Date('2022-09-19'), activityCount: 3 },
        { date: new Date('2023-08-01'), activityCount: 2 },
        { date: new Date('2023-08-02'), activityCount: 5 },
        { date: new Date('2023-08-03'), activityCount: 8 },
        { date: new Date('2023-08-01'), activityCount: 1 },
        { date: new Date('2023-08-05'), activityCount: 3 },
        { date: new Date('2023-08-07'), activityCount: 2 },
        { date: new Date('2023-08-10'), activityCount: 5 },
        { date: new Date('2023-08-15'), activityCount: 4 },
        { date: new Date('2023-08-22'), activityCount: 6 },
        // Add more data here...

    ];

    const registrationDate = new Date('2022-09-16');

    return (
        <div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', padding: '20px' }}>Activity</h1>
            <UserActivityGraph data={data} registrationDate={registrationDate} />
        </div>
    );
};

export default UserActivityPage;
