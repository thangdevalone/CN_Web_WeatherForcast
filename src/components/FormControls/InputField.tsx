import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

import { Controller, useFormContext } from 'react-hook-form';

export interface InputFieldProps {
    label: string;
    name: string;
}

export function InputField(props: InputFieldProps) {
    const { name, label } = props;
    const form = useFormContext();
    const {
        control,
        formState: { errors },
    } = form;
    return (
        <FormControl error={!!errors[name]} fullWidth sx={{marginBottom:"8px"}} variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <OutlinedInput name={name} onChange={onChange} type="text" label={label} />
                )}
            />
            <FormHelperText>{String(errors[name]?.message|| '') }</FormHelperText>
        </FormControl>
    );
}
