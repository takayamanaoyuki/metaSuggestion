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
const QUESTIONAIRE_API = "http://localhost:8000/winnerQuestionaire"
export type PageState = {
    questionNumber: number, 
    type: "question" | "answer",
    maxReachedQuestionNumber: number
}

export const QuestionTemplate: React.FC = () =>{
    const location = useLocation();
    const state = location.state as PageState | null
    const questionNumber = state? state.questionNumber : 1
    const maxReachedQuestionNumber = state ? state.maxReachedQuestionNumber ?? 1 : 1
    const navigate = useNavigate()
    const onAnswerClick: SubmitHandler<QuestionForm> = async (data: QuestionForm) => {
        try {
            const response = await fetch(QUESTIONAIRE_API ?? "", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify({questionNumber: questionNumber, ...data})
            });
            const responseData = await response.json();
          } catch (error) {
            console.error(error)
          }
        await navigate('/',{state: {questionNumber: questionNumber, type: "answer", maxReachedQuestionNumber: questionNumber > maxReachedQuestionNumber ? questionNumber : maxReachedQuestionNumber}})
    }
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<QuestionForm>();
    
    return (
        questionNumber <= figurePairList.length ? 
            <Box component="form" onSubmit={handleSubmit(onAnswerClick)} sx={{display: "block"}}>
                <QATemplate questionNumber={questionNumber} isCircred={false} buttonDisplayName="解答を確認"/>
                <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                    <SelectAnswerRadioButton errors={errors} control={control} />
                </Box>
            </Box>
        :
        <Box>回答ありがとうございました</Box>
    )
}