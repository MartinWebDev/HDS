import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ImageStyle,
    PixelRatio,
    LayoutChangeEvent,
    NativeModules,
    Button // TEMP
} from 'react-native';

import ImagePicker from 'react-native-image-picker'

import { ModalDisplay } from '../GlobalComponents/ModalDisplay';

import { ICameraPhoto } from '../Services/Interfaces/ICameraPhoto';

// TEMP
import { IPingPongResponse, PingPongService } from '../Services/PingPongService';

interface IProps {
    wrapperStyle: ViewStyle;
}

interface IState {
    photos: ICameraPhoto[];
    fakeImgs: number[];
    removeImgPromptVisible: boolean;
    imgToRemove: number;
    imgExistsWarningVisible: boolean;
    filesToUpload: number; // TEMP
    pingTimeout: number; // TEMP
}

export class CameraCapture extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            photos: [],
            fakeImgs: [],
            removeImgPromptVisible: false,
            imgToRemove: null,
            imgExistsWarningVisible: false,
            filesToUpload: 0, // TEMP
            pingTimeout: null // TEMP
        };
    }

    componentDidMount() {
        //var id = setInterval(this.ping.bind(this), 1000); // TEMP
        //this.setState({ pingTimeout: id }); // TEMP
    }
    componentWillUnmount() {
        if (this.state.pingTimeout != null) { // TEMP
            clearInterval(this.state.pingTimeout); // TEMP
            this.setState({ pingTimeout: null }); // TEMP
        }
    }

    ping() {
        PingPongService.Ping()
            .then((response) => { console.log(response.message); })
            .catch((error) => { console.log(error); });
    }

    dismissRemoveImageModal() {
        this.setState({ removeImgPromptVisible: false });
    }

    dismissImageExistsModal() {
        this.setState({ imgExistsWarningVisible: false });
    }

    handleRemoveImage() {
        let curImgs = this.state.photos;
        curImgs.splice(this.state.imgToRemove, 1);

        this.setState({
            removeImgPromptVisible: false,
            photos: curImgs,
            imgToRemove: null
        });
    }

    handleImageUpload(i: number) {
        var iSaySo: boolean = true;
        debugger;
        if (iSaySo) {
            // try as file
            var formData = new FormData();
            formData.append("val1", "hello");
            formData.append("file", `file:///${this.state.photos[0].imgPath}`)
            // formData.append("file", {
            //     uri: this.state.photos[0].imgUri,
            //     name: this.state.photos[0].imgFileName,
            //     type: this.state.photos[0].imgMimeType
            // });

            var request = new XMLHttpRequest();
            request.open('POST', 'http://localhost:59402/api/Upload/PostImage');
            request.timeout = 36000;
            request.setRequestHeader("Content-Type", "multipart/form-data");
            request.onload = () => {
                console.log(request);
                debugger;
            };
            request.onerror = () => {
                console.log(request);
                debugger;
            };
            request.ontimeout = () => {
                console.log(request);
                debugger;
            }
            request.send(formData);
        }
        else {
            NativeModules
                .RNImageToBase64
                .getBase64String(this.state.photos[i].imgUri, (e: any, b: any) => {
                    // Make call to server here
                    let body = JSON.stringify({
                        base64: b,
                        fileName: this.state.photos[i].imgFileName,
                        mimeType: this.state.photos[i].imgMimeType
                    });

                    debugger;
                    // var request = new XMLHttpRequest();
                    // request.open('POST', 'http://localhost:59402/api/Upload/PostImageAsBase64');
                    // request.timeout = 36000;
                    // request.setRequestHeader("Accept", "application/json");
                    // request.setRequestHeader("Content-Type", "application/json");
                    // request.setRequestHeader("Content-Length", body.length.toString());
                    // request.onreadystatechange = () => {
                    //     console.log("-------------------------------------------------------------------------------");
                    //     console.log(request.readyState.toString());
                    //     console.log(request);
                    //     //debugger;
                    // };
                    // // request.onload = () => {
                    // //     console.log(request);
                    // //     debugger;
                    // // };
                    // // request.onerror = () => {
                    // //     console.log(request);
                    // //     debugger;
                    // // };
                    // // request.ontimeout = () => {
                    // //     console.log(request);
                    // //     debugger;
                    // // }
                    // request.send(body);

                    fetch("http://localhost:59402/api/Upload/PostImageAsBase64", {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: body
                    }).then((response) => {
                        console.log(response);
                        console.log(response.body);
                    }).catch((error) => { debugger; console.log(error); });

                    // this.setState({
                    //     filesToUpload: this.state.filesToUpload - 1
                    // });
                });
        }
    }

    render(): JSX.Element {
        let imagesJsx: JSX.Element[] = this.state.photos.map((photo: ICameraPhoto, index: number) => {
            return (
                <TouchableOpacity key={photo.imgFileName} onLongPress={
                    () => {
                        this.setState({ imgToRemove: index, removeImgPromptVisible: true })
                    }
                }>
                    <View style={Styles.photoWrapper}>
                        <Image style={Styles.photo} source={{ uri: photo.imgUri }} />
                    </View>
                </TouchableOpacity>
            );
        });

        let fakesJsx: JSX.Element[] = this.state.fakeImgs.map((f) => {
            return (
                <View key={`fakeImg${f.toString()}`} style={Styles.fakeWrapper}></View>
            );
        });

        let imagePickerOptions = {
            title: 'Choose image',
            noData: true, // Speeds things up by not including base64 data on initial image capture
            storageOptions: {
                skipBackup: true,
                path: 'HDS'
            },
            mediaType: "photo" as "photo" | "video" | "mixed",
            quality: 0
        };

        let btnWrapperStyle = StyleSheet.create({ s: { padding: 4, alignItems: "center" } as ViewStyle });
        let btnTextStyle = StyleSheet.create({ s: { fontSize: PixelRatio.getPixelSizeForLayoutSize(8) } as TextStyle });

        let removeModalButtons = [
            <TouchableOpacity style={btnWrapperStyle.s} key="btnRemoveImage" onPress={this.handleRemoveImage.bind(this)}>
                <Text style={btnTextStyle.s}>Remove</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={btnWrapperStyle.s} key="btnCancelRemove" onPress={this.dismissRemoveImageModal.bind(this)}>
                <Text style={btnTextStyle.s}>Cancel</Text>
            </TouchableOpacity>
        ];

        let imageExistsButtons = [
            <TouchableOpacity key="btnDismissDuplicateWarning" onPress={this.dismissImageExistsModal.bind(this)}><Text>Ok</Text></TouchableOpacity>
        ];

        return (
            <View style={this.props.wrapperStyle}>
                {/* First, define the modals for this page. Remove image, and image exists */}
                <ModalDisplay
                    name="RemoveImageModal"
                    buttons={removeModalButtons}
                    message="Would you like to remove this image?"
                    visible={this.state.removeImgPromptVisible}
                />

                <ModalDisplay
                    name="DuplicateImageWarning"
                    buttons={imageExistsButtons}
                    message="This image already exists"
                    visible={this.state.imgExistsWarningVisible}
                />

                {/* Second, list out the images already selected */}
                <View key="PhotoAreaWrapper" style={Styles.photoAreaWrapper}>
                    <View key="PhotoArea" style={Styles.photoArea} onLayout={
                        (e: LayoutChangeEvent) => {
                            // Calculate how many we can hold
                            let viewWidth = e.nativeEvent.layout.width;
                            let itemWidth = StyleProperties.photo.width + (StyleProperties.photo.padding * 2);

                            let numItems = Math.floor(viewWidth / itemWidth);
                            let fakes = numItems - 1;

                            // Assign to array in state to generate fakes on render
                            let fakesArray = [];
                            for (var i = 0; i < fakes; i++) {
                                fakesArray.push(i);
                            }
                            this.setState({ fakeImgs: fakesArray });
                        }
                    }>
                        {imagesJsx}

                        <TouchableOpacity activeOpacity={0.5} onPress={
                            () => {
                                ImagePicker.showImagePicker(imagePickerOptions, (response) => {
                                    if (response.didCancel) { console.log("ImagePicker dismissed") }
                                    else if (response.error) { console.error(JSON.stringify(response.error)); }
                                    else {
                                        let imgs = this.state.photos;

                                        // Check if image alerady exists in array and show warning if it does
                                        for (var i = 0; i < imgs.length; i++) {
                                            if (imgs[i].imgFileName == response.fileName) {
                                                this.setState({ imgExistsWarningVisible: true });
                                                return;
                                            }
                                        }

                                        // If this image does not already exist, then add it here. 
                                        imgs.push({
                                            imgFileName: response.fileName,
                                            imgPath: response.path,
                                            imgUri: response.uri,
                                            imgMimeType: response.type
                                        } as ICameraPhoto);

                                        this.setState({
                                            photos: imgs,
                                            filesToUpload: this.state.filesToUpload + 1
                                        });
                                    }
                                });
                            }
                        }>
                            <View key="AddPhoto" style={Styles.photoWrapper}>
                                <Image style={Styles.photo} source={require("../../Assets/Icons/AddTab/PhotoPicker/AddPicture.png")} />
                            </View>
                        </TouchableOpacity>

                        {fakesJsx}
                    </View>
                </View>

                <Text style={{ fontSize: 18 }}>
                    Photos to upload: {this.state.filesToUpload}
                </Text>

                <Button title="Upload test" onPress={
                    () => {
                        for (var i = 0; i < this.state.photos.length; i++) {
                            this.handleImageUpload(i);
                        }
                    }
                } />
            </View>
        );
    }
}

const StyleProperties = {
    photo: {
        width: PixelRatio.getPixelSizeForLayoutSize(30),
        height: PixelRatio.getPixelSizeForLayoutSize(30),
        padding: PixelRatio.getPixelSizeForLayoutSize(2)
    }
};

const Styles = StyleSheet.create({
    container: { flex: 1 } as ViewStyle,
    photoAreaWrapper: {
        padding: 12
    } as ViewStyle,
    photoArea: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    } as ViewStyle,
    photoWrapper: {
        padding: StyleProperties.photo.padding,
        width: StyleProperties.photo.width + (StyleProperties.photo.padding * 2),
        height: StyleProperties.photo.height + (StyleProperties.photo.padding * 2)
    } as ViewStyle,
    fakeWrapper: {
        width: StyleProperties.photo.width + (StyleProperties.photo.padding * 2),
        height: 1, //   By giving this a height of 1 we can always render the maximum number of 
        //              fakes needed and it will not affect the appearance. This saves on computation later. 
    } as ViewStyle,
    photo: {
        width: StyleProperties.photo.width,
        height: StyleProperties.photo.height
    } as ImageStyle
});

