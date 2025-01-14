import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setformValidation] = useState({ 
    })
    useEffect(() => {
      createValidators()
    }, [formState])

    const isFormValid = useMemo(() => {
        for(const formValue of Object.values(formValidation)){
            if(formValidation[formValue] !== null){
                return false
            }
        }
        return true
    }, [formValidation])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {}
        for (const formField of Object.keys(formValidations)){
            const [fn, errorMessage] = formValidations[formField];
            console.log(formField)
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
            setformValidation(formCheckedValues)
        }

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
        ...formValidation,
    }
}