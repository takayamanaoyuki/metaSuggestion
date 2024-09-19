import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { Controller, Control } from "react-hook-form";
import { red } from "@mui/material/colors";
export interface QuestionForm {
    winner: number;
  }


type Props = {
    errors: FieldErrors<QuestionForm>
    control: Control<QuestionForm, any>
}

// {...register("winner", { required: { value: false, message: "勝者だと思う方の図形を選択してください" } })}
export const SelectAnswerRadioButton: React.FC<Props> = ({ errors, control}) => {
    return(
        <Controller
            name="winner"
            control={control}
            rules={{ required: { value: true, message: "勝者だと思う方の図形を選択してください" } }}
            render={({ field }) => (
                    <FormControl {...field}>
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <FormLabel id="radio">勝敗の予測</FormLabel>
                            <Typography variant="body1">勝者だと思う方の図形を選択してください</Typography>
                            <RadioGroup
                            aria-labelledby="radio"
                            row
                            >
                                <FormControlLabel value={0} control={<Radio/> }label="左" />
                                <FormControlLabel value={1} control={<Radio />} label="右" />
                            </RadioGroup>
                            <Typography color={red["A400"]}>{errors.winner?.message}</Typography>
                        </Box>
                    </FormControl>
            )}/>
    )
}