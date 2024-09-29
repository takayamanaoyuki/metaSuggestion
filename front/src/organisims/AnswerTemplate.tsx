import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { QATemplate } from "./QATemplate";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import type { QuestionForm } from "./SelectAnswerRadioButton";
import { FormControl, FormLabel, Box, Typography, TextField } from "@mui/material";
import { red } from "@mui/material/colors";

type AnswerForm = {
    expectedRule: string,
    confidenceLevelOfRule: number
}

const confidenceLevelRange = [...Array(11)].map((v, index)=> index)

export const AnswerTemplate: React.FC = () =>{
    const location = useLocation();
    const state = location.state as {questionNumber: number, type: "question" | "answer"} | null
    const questionNumber = state? state.questionNumber : 1
    const navigate = useNavigate()
    const onAnswerClick: SubmitHandler<AnswerForm> = async () => {
        await navigate('/',{state: {questionNumber: questionNumber + 1, type: "question"}})
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<AnswerForm>();
    return (
    <>
        <Box component="form" onSubmit={handleSubmit(onAnswerClick)} sx={{display: "flex", flexDirection: "column"}}>
            <QATemplate  questionNumber={questionNumber} isCircred={true} buttonDisplayName="次の問題へ"/>
            <FormControl sx={{width: "100%", gap: "16px"}} >
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <FormLabel id="expected-rule-form">推測される勝敗判定のルール</FormLabel>
                    <TextField id="expected-rule-form"  variant="outlined" {...register("expectedRule", { required: { value: true, message: "あなたが予想する図形の勝敗を決めるルールを入力してください" } })} />
                    <Typography color={red["A400"]}>{errors.expectedRule?.message}</Typography>
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