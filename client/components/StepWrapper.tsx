import React from 'react';
import {Container, Stepper, Step, StepLabel, Card, Grid} from "@material-ui/core";

interface StepWrapperProps {
    activeStep: number;
}

const steps = ['Information about track', 'Upload cover', 'Upload track']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>

                {steps.map((step, index) => 
                <Step
                    key={index}
                    completed={activeStep > index}
                >
                    <StepLabel>{step}</StepLabel>
                </Step>
                     )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0', height: 270}}>
                <Card style={{width: 600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;