import React from 'react';
import PageContainer from '../components/MainUI/PageContainer';
import JourneyTable from '../components/Journey/JourneyTable';

const Journey = props => {
    return (
        <PageContainer>
            <h2> Listening History </h2>
            <JourneyTable />
        </PageContainer>
    );
}

export default Journey;