import { Box, Button } from "@mui/material";
import React from "react";
import { figurePairList } from "./QuestionData";
import { useLocation, useNavigate } from "react-router-dom";
import type { PageState } from "./QuestionTemplate";

export const NavigateToProblemButton: React.FC = () =>{
    const location = useLocation()
    const state = location.state as (PageState | null )
    const maxReachedQuestionNumber = state ? state.maxReachedQuestionNumber ?? 1 : 1
    const navigate = useNavigate()
    return(
        <Box sx={{display: "flex", backgroundColor: "white", gap: "8px", flexWrap: "wrap"}}>
            {figurePairList.map((figurePair, index) => {
                const questionNumber = index + 1
                const onClick = async() =>{
                    await navigate('/',{state: {questionNumber: questionNumber, type: questionNumber == maxReachedQuestionNumber ? "question" : "answer", maxReachedQuestionNumber: questionNumber > maxReachedQuestionNumber ? questionNumber : maxReachedQuestionNumber}})
                }
                return (questionNumber > maxReachedQuestionNumber ?
                <Button key={index} variant="contained" disabled>
                    {questionNumber}
                </Button> : 
                <Button key={index} variant="contained" onClick={onClick}>
                {questionNumber}
            </Button> )
            })}
        </Box>
    )
}