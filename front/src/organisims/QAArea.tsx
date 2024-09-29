import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Triangle } from "./figures/Triangle";
import { Square } from "./figures/Square";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { figurePairList } from "./QuestionData";
import { QuestionTemplate } from "./QuestionTemplate";
import { AnswerTemplate } from "./AnswerTemplate";


export const QAArea: React.FC = () =>{
    const location = useLocation()
    const navigate = useNavigate()
    const state = location.state ? location.state as {questionNumber: number, type: "question" | "answer"} : {questionNumber: 1, type: "question"}
    useEffect(() => {
        void navigate('/',{state: {questionNumber: 1, type: "question"}})
    },[])

    return (
        <Box >
            {state?.type == "question" ? <QuestionTemplate/> : <AnswerTemplate/>}
        </Box>
    )
}