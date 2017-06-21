// import React, { Component } from 'react';

// import {
//     Text, 
//     View, 
//     Dimensions, 
//     ViewStyle, 
//     TextStyle, 
//     PixelRatio
// } from 'react-native';

// // export function Test5<T> (w: number, h: number): T {
// //     return new(): T {
// //         width: PixelRatio.getPixelSizeForLayoutSize(w),
// //         height: PixelRatio.getPixelSizeForLayoutSize(h)
// //     } as T;
// // }

// // let test6 = Test5<TextStyle>(10, 20);

// export class ExactPixels<T> {
//     // Test1 <T>(c: { new(): T }): T {
//     //     return new c();
//     // }

//     Test2 (w: number, h: number) {
//         return {  } as T;
//     }
// }

// let test1 = new ExactPixels<ViewStyle>();
// let test2 = new ExactPixels<TextStyle>();

// let test3 = test1.Test2(10, 20);
// let test4 = test2.Test2(25, 50);

// var image = Image.getSize("", 
//     (w, h) => {
//         let width = PixelRatio.getPixelSizeForLayoutSize(w);
//         let height = PixelRatio.getPixelSizeForLayoutSize(h);
//     }, 
//     (err) => {

//     }
// );