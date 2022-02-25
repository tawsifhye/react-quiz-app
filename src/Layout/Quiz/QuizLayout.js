import { Box, } from '@mui/system';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import { Container, FormControlLabel, Radio, } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { Link, useNavigate } from 'react-router-dom';


const QuizLayout = () => {
    const navigate = useNavigate();
    const contextData = useContext(DataContext);
    const { dataContext, dispatch } = contextData;
    const { quizzes, finalAnswers } = dataContext;
    const [index, setIndex] = useState(0);
    const [showQuestion, setShowQuestion] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [arr, setArr] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    let userSelectedAnswers = [];

    useEffect(() => {
        setShowQuestion(true);
        selectedAnswer.forEach((element) => {
            if (element.questionId == userSelectedAnswers[userSelectedAnswers.length - 1]?.questionId) {
                userSelectedAnswers.pop();
                userSelectedAnswers.push(element);
            }
            else {

                userSelectedAnswers.push(element);
            }
            dispatch({
                type: 'SUBMIT_QUIZ',
                payload: userSelectedAnswers
            })
            // console.log('SelectedAnswer', selectedAnswer);
            // console.log('userSelecetedAnswers', userSelectedAnswers);
        })
        // console.log('Quizes', dataContext.quizzes);
        // console.log('SelectedAnswer', selectedAnswer);
    }, [index, isSubmitted, isSelected])

    // useEffect(() => {
    //     selectedAnswer.forEach((element) => {
    //         if (element.questionId == userSelectedAnswers[userSelectedAnswers.length - 1]?.questionId) {
    //             userSelectedAnswers.pop();
    //             userSelectedAnswers.push(element);
    //         }
    //         else {

    //             userSelectedAnswers.push(element);
    //         }
    //         // console.log('SelectedAnswer', selectedAnswer);
    //         // console.log('userSelecetedAnswers', userSelectedAnswers);
    //     })
    // }, [selectedAnswer]);

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
            questionId: quizzes[index].id,
            question: quizzes[index].question,
            options: quizzes[index].options,
            selectedAnswer: option,
            level: quizzes[index].level
        }
        const newArr = [...selectedAnswer, answer];
        setSelectedAnswer(newArr);
    }



    // useEffect(() => {
    //     dispatch({ type: 'SUBMIT_QUIZ', payload: userSelectedAnswers });
    //     console.log('Final Answer', finalAnswers);

    // }, [isSubmitted, index])

    const submitQuiz = () => {
        setIsSubmitted(true);
        // dispatch({
        //     type: 'SUBMIT_QUIZ',
        //     payload: userSelectedAnswers
        // })
        // if (finalAnswers.length === quizzes.length) {

        // }
        navigate('/result');


        // setArr(userSelectedAnswers);

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

                        <Button onClick={submitQuiz} disabled={!isSelected} variant='contained'>Submit</Button>

                        :
                        <Button onClick={goNext} disabled={index === quizzes.length - 1 || !isSelected}>Next</Button>

                }
            </Box>
        </Container>
    );
};

export default QuizLayout;