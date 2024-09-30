import React from "react";
import { Box, Button, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import type { SubmitHandler } from "react-hook-form";

type LoginForm = {
    user_id: string,
    name: string,
    age: string | number,
    sex: typeof sex[number]
}
const LOGIN_API = "http://localhost:8000/login"
const sex = ["男性", "女性", "その他"] as const

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const onNextClick: SubmitHandler<LoginForm> = async (data: LoginForm) =>{
        try {
            data.age = Number(data.age)
            const response = await fetch(LOGIN_API ?? "", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log(responseData)
          } catch (error) {
            console.error(error)
          }
        localStorage.setItem("user_id", data.user_id)
        await navigate('/',{state: {questionNumber: 1, type: "question", maxReachedQuestionNumber: 1}})
    }
    const {
        register,
        handleSubmit,
        formState: { errors }} = useForm<LoginForm>()
    return (
        <Box component="form" onSubmit={handleSubmit(onNextClick)} sx={{display: "flex", flexDirection: "column", backgroundColor: "white", padding: "20px"}}>
        <FormControl sx={{width: "100%", height: "100%",  gap: "16px"}} >
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <FormLabel id="user_id-form">ユーザーid</FormLabel>
                <TextField id="user_id-form"  variant="outlined" {...register("user_id", { required: { value: true, message: "氏名_誕生日でユーザーidを作成してください" } })} />
                <Typography color={red["A400"]}>{errors.user_id?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <FormLabel id="name-form">氏名</FormLabel>
                <TextField id="name-form"  variant="outlined" {...register("name", { required: { value: true, message: "氏名を入力してください" } })} />
                <Typography color={red["A400"]}>{errors.name?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <FormLabel id="age-form">年齢</FormLabel>
                <TextField id="age-form"  variant="outlined" {...register("age", { pattern: { value: /^\d\d?$/, message: "半角数字で入力してください" } })} />
                <Typography color={red["A400"]}>{errors.age?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <FormLabel id="sex-select">性別</FormLabel>
                <TextField
                    id="sex-select"
                    select
                    SelectProps={{native: true}}
                    variant="filled"
                    defaultValue={0}
                    {...register("sex", { required: { value: true, message: "性別を選択してください" } })}
                >
                    {sex.map((sexValue) => (
                        <option key={sexValue} value={sexValue}>
                        {sexValue}
                        </option>
                    ))}
                </TextField>
                <Typography color={red["A400"]}>{errors.sex?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "right"}}>
                <Button variant="contained" type="submit">次へ</Button>
            </Box>
        </FormControl> 
    </Box>
    )
}