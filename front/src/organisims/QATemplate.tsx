import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Triangle } from "./figures/Triangle";
import { Square } from "./figures/Square";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { figurePairList } from "./QuestionData";

type Props = {
    children: React.ReactNode;
    questionNumber: number;
    isCircred: boolean;
}

export const QATemplate: React.FC<Props> = ({questionNumber, isCircred, children}) =>{
    const judgeFigureWinner = (index: number) =>{
        const isLeftWin = figurePairList[questionNumber-1][0].number > figurePairList[questionNumber-1][1].number + 1
        if (index){
            return !isLeftWin
        }else{
            return isLeftWin
        }
    }
    return (
        <>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h4" >第{questionNumber}問</Typography>
                {children}
            </Box>
            <Box  sx={{display: "flex", gap: "10px", justifyContent: "center"}}>
                {figurePairList[questionNumber-1].map((figure, index)=> {
                    if (figure.figure == "Triangle"){
                        return (
                            <Triangle key={index} number={figure.number} circled={isCircred ? judgeFigureWinner(index): false}/>
                        )
                    }else{
                        return(
                            <Square key={index} number={figure.number} circled={isCircred ? judgeFigureWinner(index): false}/>
                        )
                    }
                })}
            </Box>
        </>
    )
}