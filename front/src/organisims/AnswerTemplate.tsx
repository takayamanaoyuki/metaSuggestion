import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { QATemplate } from "./QATemplate";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import type { QuestionForm } from "./SelectAnswerRadioButton";
import { FormControl, FormLabel, Box, Typography, TextField, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { PageState } from "./QuestionTemplate";
import { USER_ID } from "../pages";

type AnswerForm = {
    expectedWinnerRule: string,
    confidenceLevelOfRule: number
}

const QUESTIONAIRE_API = "http://localhost:8000/ruleQuestionaire"
const confidenceLevelRange = [...Array(11)].map((v, index)=> index)

export const AnswerTemplate: React.FC = () =>{
    const location = useLocation();
    const state = location.state as PageState | null
    const questionNumber = state? state.questionNumber : 1
    const maxReachedQuestionNumber = state ? state.maxReachedQuestionNumber ?? 1 : 1
    const navigate = useNavigate()
    const onNextQuestionClick: SubmitHandler<AnswerForm> = async (data: AnswerForm) => {
        try {
            const response = await fetch(QUESTIONAIRE_API ?? "", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify({user_id: USER_ID, questionNumber: questionNumber, ...data})
            });
            const responseData = await response.json();
          } catch (error) {
            console.error(error)
          }
        await navigate('/',{state: {questionNumber: questionNumber + 1, type: "question", maxReachedQuestionNumber: questionNumber + 1 > maxReachedQuestionNumber ? questionNumber + 1 : maxReachedQuestionNumber}})
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<AnswerForm>();
    return (
    <>
        <Box component="form" onSubmit={handleSubmit(onNextQuestionClick)} sx={{display: "flex", flexDirection: "column"}}>
            <QATemplate  questionNumber={questionNumber} isCircred={true}>
                {maxReachedQuestionNumber > questionNumber ? <Button variant="contained" type="submit" disabled>{"次の問題へ"}</Button>:
                <Button variant="contained" type="submit">{"次の問題へ"}</Button>}
                
            </QATemplate>
            <FormControl sx={{width: "100%", gap: "16px"}} >
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <FormLabel id="expected-rule-form">推測される勝敗判定のルール</FormLabel>
                    <TextField id="expected-rule-form"  variant="outlined" {...register("expectedWinnerRule", { required: { value: true, message: "あなたが予想する図形の勝敗を決めるルールを入力してください" } })} />
                    <Typography color={red["A400"]}>{errors.expectedWinnerRule?.message}</Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <FormLabel id="confidence-level-select">上記ルールを最終的なルールとして適用する際の確信度</FormLabel>
                    <TextField
                        id="confidence-level-select"
                        select
                        SelectProps={{native: true}}
                        variant="filled"
                        defaultValue={0}
                        {...register("confidenceLevelOfRule", { required: { value: true, message: "上記のルールを最終的なルールとして適用する際の確信度を入力してください" } })}
                    >
                        {confidenceLevelRange.map((confidenceLevelElement) => (
                            <option key={confidenceLevelElement} value={confidenceLevelElement}>
                            {confidenceLevelElement}
                            </option>
                        ))}
                    </TextField>
                    <Typography color={red["A400"]}>{errors.confidenceLevelOfRule?.message}</Typography>
                </Box>
            </FormControl> 
        </Box>
    </>
    )
}