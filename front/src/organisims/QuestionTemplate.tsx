import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Triangle } from "./figures/Triangle";
import { Square } from "./figures/Square";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { QATemplate } from "./QATemplate";
import { on } from "events";
import { figurePairList } from "./QuestionData";
import { Form, useForm } from "react-hook-form";
import { SelectAnswerRadioButton } from "./SelectAnswerRadioButton";
import type { QuestionForm } from "./SelectAnswerRadioButton";
import type { SubmitHandler } from "react-hook-form";

export const QuestionTemplate: React.FC = () =>{
    const location = useLocation();
    const state = location.state as {questionNumber: number, type: "question" | "answer"} | null
    const questionNumber = state? state.questionNumber : 1
    const navigate = useNavigate()
    const onNextQuestionClick: SubmitHandler<QuestionForm> = async () => {
        await navigate('/',{state: {questionNumber: questionNumber, type: "answer"}})
    }
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<QuestionForm>();
    
    return (
        questionNumber <= figurePairList.length ? 
            <Box component="form" onSubmit={handleSubmit(onNextQuestionClick)} sx={{display: "block"}}>
                <QATemplate questionNumber={questionNumber} isCircred={false} buttonDisplayName="解答を確認"/>
                <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                    <SelectAnswerRadioButton errors={errors} control={control} />
                </Box>
            </Box>
        :
        <Box>回答ありがとうございました</Box>
    )
}