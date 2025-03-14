import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";

const StyledTextInput = styled.TextInput.attrs({
    autoApitalize: "none",
    autoCorrect: false,
})`
    border: 1px solid #757575;
    padding: 10px;
    maring: 10px 0;
    width: 200px;
    font-size: 20px;
`;

const StyledText = styled.Text`
    font-size: 24px;
    margin: 10px;
`;

const Form = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const refName = useRef(null);
    const refEmail = useRef(null);

    useEffect(() => {
        console.log(`\n=====Form Component Mount=====\n`);
        refName.current.focus();
        return () => console.log("\nCLEAN UP\n");
    }, []);

    useEffect(() => {
        console.log(`name :${name}, email:${email}\n`);
    }, [email]);

    return (
        <>
            <StyledText>Name:{name}</StyledText>
            <StyledText>Email:{email}</StyledText>
            <StyledTextInput
                value={name}
                ref={refName}
                returnKeyType="next"
                onChangeText={(text) => setName(text)}
                onSubmitEditing={() => refEmail.current.focus()}
                placeholder="name"
            />
            <StyledTextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="email"
                ref={refEmail}
                returnKeyType="done"
            />
        </>
    );
};

export default Form;
