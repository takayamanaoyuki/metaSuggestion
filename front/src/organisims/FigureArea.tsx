import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Triangle } from "./figures/Triangle";
import { Square } from "./figures/Square";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type Props = {

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

export const QuestionArea: React.FC<Props> = () =>{
    const location = useLocation();
    const questionNumber = location.state? location.state.questionNumber : 1
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/',{state: {questionNumber: 1}})
    },[])

    return (
        <Box sx={{backgroundColor: "white", width: "60%"}}>
            <>
                <Typography variant="h4" >第{questionNumber}問</Typography>
                <Box  sx={{display: "flex", gap: "10px", justifyContent: "center"}}>
                    {figurePairList[questionNumber-1].map((figure, index)=> {
                        if (figure.figure == "Triangle"){
                            return (
                                <Triangle key={index} number={figure.number} circled={false}/>
                            )
                        }else{
                            return(
                                <Square key={index} number={figure.number} circled={false}/>
                            )
                        }
                    })}
                </Box>
            </>
                    

        </Box>
    )
}