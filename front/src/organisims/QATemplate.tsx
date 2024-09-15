import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Triangle } from "./figures/Triangle";
import { Square } from "./figures/Square";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type Props = {
    onClick: () => Promise<void>;
    questionNumber: number;
    isCircred: boolean;
    buttonDisplayName: string;
}

const figureList = ["Triangle", "Square"] as const

const figurePairList: 
{
    figure: (typeof figureList)[number],
    number: number
}[][]
 = [
    [
        {
            figure: "Triangle",
            number: 7
        },
        {
            figure: "Triangle",
            number: 2
        }
    ],
    [
        {
            figure: "Square",
            number: 6
        },
        {
            figure: "Square",
            number: 8
        }
    ]
]

export const QATemplate: React.FC<Props> = ({onClick, questionNumber, isCircred, buttonDisplayName}) =>{
    return (
        <>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h4" >第{questionNumber}問</Typography>
                <Button variant="contained" onClick={onClick}>{buttonDisplayName}</Button>
            </Box>
            <Box  sx={{display: "flex", gap: "10px", justifyContent: "center"}}>
                {figurePairList[questionNumber-1].map((figure, index)=> {
                    if (figure.figure == "Triangle"){
                        return (
                            <Triangle key={index} number={figure.number} circled={isCircred}/>
                        )
                    }else{
                        return(
                            <Square key={index} number={figure.number} circled={isCircred}/>
                        )
                    }
                })}
            </Box>
        </>
    )
}