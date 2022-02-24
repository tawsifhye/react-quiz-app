import { Box, } from '@mui/system';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import { Container, FormControlLabel, Radio, } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';


const QuizLayout = () => {
    const contextData = useContext(DataContext);
    const { dataContext, dispatch } = contextData;
    const [index, setIndex] = useState(0);
    const [showQuestion, setShowQuestion] = useState(true);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setShowQuestion(true)
    }, [index])
    useEffect(() => {
        fetch('quiz.json')
            .then(res => res.json())
            .then(data => dispatch({
                type: 'LOAD_QUIZ',
                payload: data
            }))
    }, [dataContext?.quizzes])

    const goNext = () => {
        setShowQuestion(false)
        setIsSelected(false);
        let currentIndex = index;
        currentIndex += 1;
        setIndex(currentIndex)
    }
    const goBack = () => {
        let currentIndex = index;
        currentIndex -= 1;
        setIndex(currentIndex)
    }
    const handleOnChange = (e) => {
        setIsSelected(true);
    }
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 650,
            height: '100vh'
        }}>
            {
                showQuestion &&

                <Card sx={{ minWidth: 450, p: 2, }}>
                    <Typography variant='h6'>{dataContext.quizzes[index]?.id}. {dataContext.quizzes[index]?.question}</Typography>
                    <Box>

                        <FormControl sx={{ m: 3 }} variant="standard">
                            <RadioGroup
                            >
                                {
                                    dataContext.quizzes[index]?.options.map(element => (
                                        <FormControlLabel onChange={handleOnChange} key={element.id} value={element.id} control={<Radio />} label={element.option} />
                                    ))
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Card>
            }
            <Box>
                <Button onClick={goBack} disabled={index === 0}>Prev</Button>
                {
                    index === dataContext.quizzes.length - 1 ?
                        <Button variant='contained'>Submit</Button>
                        :
                        <Button onClick={goNext} disabled={index === dataContext.quizzes.length - 1 || !isSelected}>Next</Button>

                }
            </Box>
        </Container>
    );
};

export default QuizLayout;