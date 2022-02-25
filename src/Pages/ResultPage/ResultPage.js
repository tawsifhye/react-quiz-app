import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Context/DataProvider';

const ResultPage = () => {
    const contextData = useContext(DataContext);
    const [correct, setCorrect] = useState(0);
    const { dataContext, dispatch } = contextData;
    const { quizzes, finalAnswers } = dataContext;
    console.log('Final Answer', finalAnswers);
    let correctAns = 0;
    useEffect(() => {
        finalAnswers.forEach(element => {
            if (element.selectedAnswer.isCorrect == true) {
                correctAns += 1;
                setCorrect(correctAns);

            }
        });
    })
    return (
        <Box>
            <Typography sx={{ textAlign: 'center' }} variant='h4'>Result</Typography>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4'> {correct}/{quizzes.length}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Box>
                    {
                        finalAnswers.map((answer, index) => (
                            <Box key={answer.questionId}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    {answer.questionId}. {answer.question}
                                </Typography>
                                {answer.options.map(element => (
                                    <Box key={element.id}>
                                        <Typography
                                            sx={{
                                                color: (element.isCorrect && 'green') || (finalAnswers[index].selectedAnswer.id === element.id && 'red'),
                                                fontWeight: ((finalAnswers[index].selectedAnswer.isCorrect) && (finalAnswers[index].selectedAnswer.id === element.id) && 'bold') || (finalAnswers[index].selectedAnswer.id === element.id && 'bold')

                                            }}
                                        >
                                            {element.id}.{element.option}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))
                    }
                </Box>
                <Link style={{ textDecoration: 'none' }} to='/quiz'> <Button>Go Back</Button> </Link>
            </Box>
        </Box>
    );
};

export default ResultPage;