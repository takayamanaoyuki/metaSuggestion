import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { QATemplate } from "./QATemplate";


export const AnswerTemplate: React.FC = () =>{
    const location = useLocation();
    const state = location.state as {questionNumber: number, type: "question" | "answer"} | null
    const questionNumber = state? state.questionNumber : 1
    const navigate = useNavigate()
    const onAnswerClick = async () => {
        await navigate('/',{state: {questionNumber: questionNumber + 1, type: "question"}})
    }
    return (
        <QATemplate onClick={onAnswerClick} questionNumber={questionNumber} isCircred={true} buttonDisplayName="次の問題へ"/>
    )
}