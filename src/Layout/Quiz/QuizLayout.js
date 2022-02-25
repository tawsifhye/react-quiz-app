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
    const { quizzes } = dataContext;
    const [index, setIndex] = useState(0);
    const [showQuestion, setShowQuestion] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    let userSelecetedAnswers = [];

    useEffect(() => {
        setShowQuestion(true);
        // console.log('Quizes', dataContext.quizzes);
        // console.log('SelectedAnswer', selectedAnswer);
    }, [index])

    useEffect(() => {
        selectedAnswer.forEach((element) => {
            // console.log(element);
            // userSelecetedAnswers.push(element);
            if (element.questionId == userSelecetedAnswers[userSelecetedAnswers.length - 1]?.questionId) {
                userSelecetedAnswers.pop();
                userSelecetedAnswers.push(element);
            }
            else {

                userSelecetedAnswers.push(element);
            }
            console.log('SelectedAnswer', selectedAnswer);
            console.log('userSelecetedAnswers', userSelecetedAnswers);
        })
    }, [selectedAnswer]);

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
    const handleOnChange = (option) => {
        setIsSelected(true);
        const answer = {
            questionId: index + 1,
            selectedAnswer: option,
            level: quizzes[index].level
        }
        const newArr = [...selectedAnswer, answer];
        setSelectedAnswer(newArr);
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
                    <Typography variant='h6'>{quizzes[index]?.id}. {quizzes[index]?.question}</Typography>
                    <Box>

                        <FormControl sx={{ m: 3 }} variant="standard">
                            <RadioGroup
                            >
                                {
                                    quizzes[index]?.options.map(element => (
                                        <FormControlLabel onChange={() => handleOnChange(element)} key={element.id} value={element.id} control={<Radio />} label={element.option} />
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
                    index === quizzes.length - 1 ?
                        <Button variant='contained'>Submit</Button>
                        :
                        <Button onClick={goNext} disabled={index === quizzes.length - 1 || !isSelected}>Next</Button>

                }
            </Box>
        </Container>
    );
};

export default QuizLayout;