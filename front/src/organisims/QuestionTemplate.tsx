import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Triangle } from "./figures/Triangle";
import { Square } from "./figures/Square";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { QATemplate } from "./QATemplate";
import { on } from "events";
import { figurePairList } from "./QuestionData";

export const QuestionTemplate: React.FC = () =>{
    const location = useLocation();
    const state = location.state as {questionNumber: number, type: "question" | "answer"} | null
    const questionNumber = state? state.questionNumber : 1
    const navigate = useNavigate()
    const onNextQuestionClick = async () => {
        await navigate('/',{state: {questionNumber: questionNumber, type: "answer"}})
    }
    return (
        questionNumber <= figurePairList.length ? <QATemplate onClick={onNextQuestionClick} questionNumber={questionNumber} isCircred={false} buttonDisplayName="解答を確認"/>:
        <Box>回答ありがとうございました</Box>
    )
}