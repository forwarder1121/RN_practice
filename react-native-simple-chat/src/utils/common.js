export const validEmail = (email) => {
    const regex =
        /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]$/;
    return regex.test(email);
};

export const removeWhitespace = (text) => {
    const regex = /\s/g;
    return text.replace(regex, "");
};
