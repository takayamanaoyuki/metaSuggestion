import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Triangle } from "./figures/Triangle";
import { Square } from "./figures/Square";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { figurePairList } from "./QuestionData";

type Props = {
    onClick?: () => Promise<void>;
    questionNumber: number;
    isCircred: boolean;
    buttonDisplayName: string;
}

export const QATemplate: React.FC<Props> = ({onClick, questionNumber, isCircred, buttonDisplayName}) =>{
    return (
        <>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h4" >第{questionNumber}問</Typography>
                <Button variant="contained" onClick={onClick} type="submit">{buttonDisplayName}</Button>
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