import React, { useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions"; // 더 이상 사용하지 않음
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
    align-self: center;
    margin-bottom: 30px;
`;

const StyledImage = styled.Image`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
    border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.imageBackground};
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs({
    name: "photo-camera",
    size: 22,
})`
    color: ${({ theme }) => theme.imageButtonBackground};
`;

const PhotoButton = ({ onPress }) => {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonIcon />
        </ButtonContainer>
    );
};

const Image = ({ url, imageStyle, rounded, showButton, onChangeImage }) => {
    useEffect(() => {
        (async () => {
            try {
                if (Platform.OS === "ios") {
                    // iOS에서 사진 앨범 권한 요청
                    const { status } =
                        await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== "granted") {
                        Alert.alert(
                            "Photo Permission",
                            "Please allow permissions to access photo library."
                        );
                    }
                }
            } catch (e) {
                Alert.alert("Photo Permission Error", e.message);
            }
        })();
    }, []);

    const _handleEditButton = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.cancelled) {
                onChangeImage(result.assets[0].uri);
            }
        } catch (e) {
            Alert.alert("Photo Error", e.message);
        }
    };

    return (
        <Container>
            <StyledImage
                source={{ uri: url }}
                style={imageStyle}
                rounded={rounded}
            />
            {showButton && <PhotoButton onPress={_handleEditButton} />}
        </Container>
    );
};

Image.defaultProps = {
    rounded: false,
    showButton: false,
    onChangeImage: () => {},
};

Image.propTypes = {
    url: PropTypes.string,
    imageStyle: PropTypes.object,
    rounded: PropTypes.bool,
    showButton: PropTypes.bool,
    onChangeImage: PropTypes.func,
};

export default Image;
