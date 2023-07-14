import styled from 'styled-components';

export const DivPost = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Noto Sans', sans-serif;

    @media (min-width: 580px) {
        width: 580px;
    }
    @media (max-width: 768px) {
        &::-webkit-scrollbar {
            width: 0px;
        }
    }
`;

//   <DivForm top="12px">
//       <Form encType="multipart/form-data">
//           <DivUpNews>
//               <DivOptions>
//                   <DivItems color={colorText}>
//                       <TextI />
//                   </DivItems>
//                   <DivItems>
//                       <input id="upload" type="file" name="file[]" onChange={handleUpload} multiple hidden />
//                       <Label htmlFor="upload" color={colorText}>
//                           <ImageI />
//                       </Label>
//                   </DivItems>
//                   <DivItems>
//                       <Input
//                           placeholder="What's on your mind?"
//                           // onKeyDown={(e) => keyboarHandle(e)}
//                           onChange={(e) => setInputValue(e.target.value)}
//                       />
//                   </DivItems>
//                   {/* <DivSignature>
//                                 <SignatureI />
//                             </DivSignature> */}
//               </DivOptions>
//               <DivDataFake>
//                   <Textarea
//                       color={colorText}
//                       bg={colorBg}
//                       onKeyUp={handleOnKeyup}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       placeholder="What's on your mind?"
//                   ></Textarea>
//                   {upload.length > 0 && (
//                       <Div css={cssImage}>
//                           {upload.map((e: string) => (
//                               <DivImage
//                                   key={e}
//                                   src={e}
//                                   border={upload.length > 1 ? '1px solid #fff' : 'none'}
//                               ></DivImage>
//                           ))}
//                       </Div>
//                   )}
//               </DivDataFake>
//           </DivUpNews>
//           <Bar
//               css="
//                             width: 100%;
//                             display: flex;
//                             justify-content: center;
//                             "
//               top="calc(95% - 10px);"
//               rotate="90deg"
//           />
//       </Form>
//   </DivForm>;
// export const css = {
//     home: `

// `,
//     news: `
//     `,

//     upNews: ``,

//     input: ``,

//     tools: ` `,

//     upImage: ``,

//     signature: ` `,

//     form: ' `;',
//     scroll: ` ;
//     top: -65px;`,

//     formChildren: ``,

//     move: ` `,
// };
